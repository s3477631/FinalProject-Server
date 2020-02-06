function getShiftLength(object) {
    let startTime = object.startTime
    let endTime = object.endTime

    let startHour = startTime.getHours()
    let startMinute = startTime.getMinutes()

    let endHour = endTime.getHours()
    let endMinute = endTime.getMinutes()

    let minDiff = endMinute - startMinute
    let hourDiff = endHour - startHour
    let shiftLength = null

    if (minDiff >= 0) {
        shiftLength = `${hourDiff} ${minDiff}`
    } else {
        shiftLength = `${hourDiff - 1} ${60 + minDiff}`
    }

    return shiftLength
}

function getBreaks(employeeObject) {

    let shiftLength = employeeObject.duration
    let shiftLengthArray = shiftLength.split(' ')

    let hours = Number(shiftLengthArray[0])
    let minutes = Number(shiftLengthArray[1])

    let timeInMinutes = (minutes + hours * 60)
    let breaks = []

    // break format: [duration, breakNum]
    if (timeInMinutes >= 240 && timeInMinutes <= 300) {
        breaks.push([15, 1])
    } else if (employeeObject.startTime < 11*60) {
        // they started before 11am, their fifteen should go first
        if (timeInMinutes > 300 && timeInMinutes <= 420) {
            breaks.push([15, 1], [30, 1])
        } else if (timeInMinutes > 420) {
            breaks.push([15, 1], [30, 1], [15, 2])
        }
    } else if (employeeObject.startTime >= 11*60) {
        // they started after 11am, their thirty should go first
        if (timeInMinutes > 300 && timeInMinutes <= 420) {
            breaks.push([30, 1], [15, 1])
        } else if (timeInMinutes > 420) {
            breaks.push([30, 1], [15, 1], [15, 2])
        }
    } else {
        console.log('something went wrong when calculating shift length')
    }

    return breaks
}

function getDateInMinutesSinceMidnight(date) {
    return date.getHours() * 60 + date.getMinutes()
}

function getBreakSchedule(employeeObjectArray) {

    let breakSchedule = []
    let floaters = getFloaters(employeeObjectArray)

    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            let previousBreak = null
            employeeObject.breaks.forEach(([breakDuration, breakNum]) => {
                
                let breakObject = {
                    name: employeeObject.name,
                    duration: breakDuration,
                    breakNum: breakNum,
                } 
                // determine start time
                if (!previousBreak) {
                    // this is the first break, can start an hour after shift commenced
                    breakObject.startTime =  employeeObject.startTime + 60

                } else {
                    // start this break relative to the last
                    breakObject.startTime = previousBreak.endTime + 60
                }
                
                breakObject.endTime = breakObject.startTime + breakDuration

                previousBreak = breakObject
                breakSchedule.push(breakObject)

            })
        }
    })
    
    breakSchedule.forEach(breakData => {
        // if it's a first 30, subtract 10 hrs so it gets prioritised
        if (breakData.duration == 30) {
            employeeObjectArray.forEach((employee, index) => {
                if (index > 0 && employee && employee.breaks[0] && employee.breaks[0][0] == 30 && breakData.name == employee.name) {
                    breakData.startTime -= 600
                    breakData.endTime -=600
                }
            })
        }
    })

    // step 1: sort in ascending order of start time
    breakSchedule = sortInAscendingOrder(breakSchedule)

    // step 2: account for overlaps given floater availability
    breakSchedule = sortFirstFifteens(breakSchedule, floaters)

    // step 3: move 30 min breaks to start at 12 pm
    breakSchedule = sortThirties(breakSchedule, floaters)

    // step 4: move 15 min breaks to start after the final 30 min break
    breakSchedule = sortSecondFifteens(breakSchedule, floaters)

    // step 5: finally, sort again in ascending order
    breakSchedule = sortInAscendingOrder(breakSchedule)
    
    return breakSchedule
}

function displayAsDecimal(breakSchedule) {
    return breakSchedule.map(breakData => {
        breakData.startTime /= 60
        breakData.endTime /= 60
        return breakData
    })
}
 
function sortInAscendingOrder(breakSchedule) {
    return breakSchedule.sort((a, b) => a.startTime - b.startTime)
}

// new account for overlaps function
function sortFirstFifteens(breakSchedule, floaters) {
    
    return breakSchedule.map((thisBreak) => {

        // skip 30's, they're out of order
        if (thisBreak.duration === 30) {
            return thisBreak
        }

        // sort floaters by ascending nextAvailableTime
        floaters.sort((a, b) => a.nextAvailableTime - b.nextAvailableTime)

        // find the next available floater
        let nextAvailableFloater = floaters[0]
        let nextAvailableTime = nextAvailableFloater.nextAvailableTime

        // adjust the start/end time of this break relative to nextAvailableTime
        thisBreak.floaterNum = nextAvailableFloater.floaterNum
        thisBreak.startTime = Math.max(thisBreak.startTime, nextAvailableTime)
        thisBreak.endTime = thisBreak.startTime + thisBreak.duration

        // since we have assigned this floater this break,
        // their next available time will be when this break ends
        nextAvailableFloater.nextAvailableTime = thisBreak.endTime

        return thisBreak

    })

}

function sortThirties(breakSchedule, floaters) {
    
    floaters.forEach(floater => {
        floater.nextAvailableTime = 720
    })

    return breakSchedule.map((thisBreak) => {

        // now ignore 15's
        if (thisBreak.duration === 15) {
            return thisBreak
        }

        // sort floaters by ascending nextAvailableTime
        floaters.sort((a, b) => a.nextAvailableTime - b.nextAvailableTime)

        // find the next available floater
        let nextAvailableFloater = floaters[0]
        let nextAvailableTime = nextAvailableFloater.nextAvailableTime

        // adjust the start/end time of this break relative to nextAvailableTime
        thisBreak.floaterNum = nextAvailableFloater.floaterNum
        thisBreak.startTime = nextAvailableTime
        thisBreak.endTime = nextAvailableTime + thisBreak.duration

        // since we have assigned this floater this break,
        // their next available time will be when this break ends
        nextAvailableFloater.nextAvailableTime = thisBreak.endTime

        return thisBreak
        
    })

}

// new account for overlaps function
function sortSecondFifteens(breakSchedule, floaters) {
    
    return breakSchedule.map((thisBreak) => {

        if (thisBreak.startTime >= 720 && thisBreak.duration === 15) {

            // sort floaters by ascending nextAvailableTime
            floaters.sort((a, b) => a.nextAvailableTime - b.nextAvailableTime)

            // find the next available floater
            let nextAvailableFloater = floaters[0]
            let nextAvailableTime = nextAvailableFloater.nextAvailableTime

            // adjust the start/end time of this break relative to nextAvailableTime
            thisBreak.floaterNum = nextAvailableFloater.floaterNum
            thisBreak.startTime = Math.max(thisBreak.startTime, nextAvailableTime)
            thisBreak.endTime = thisBreak.startTime + thisBreak.duration

            // since we have assigned this floater this break,
            // their next available time will be when this break ends
            nextAvailableFloater.nextAvailableTime = thisBreak.endTime

        }

        return thisBreak

    })

}

function getFloaters(employeeObjectArray) {

    let floaters = []

    // push each floater into floaters array
    employeeObjectArray.forEach((employeeObject, index) => {
        if (index > 0) {
            let isFloater = employeeObject.job && employeeObject.job.includes('F')
            if (isFloater) {

                // make a copy and convert start/end times to minutes
                let floaterObject = {...employeeObject}
                //floaterObject.startTime = getDateInMinutesSinceMidnight(floaterObject.startTime)
                //floaterObject.endTime = getDateInMinutesSinceMidnight(floaterObject.endTime)
                floaterObject.nextAvailableTime = floaterObject.startTime
                floaterObject.floaterNum = floaters.length + 1
                floaters.push(floaterObject)
            }
        }
    })

    return floaters
}

function getFloaterNumber(employeeObjectArray) {

    let floaters = 0

    // push each floater into floaters array
    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            if (employeeObject.job.includes('f') || employeeObject.job.includes('F')) {
                floaters = floaters + 1
            }
        }
    })
    console.log(floaters)
    return floaters
}

function convertStartEndTimesToMinutes(employeeObjectArray) {
    return employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.startTime = getDateInMinutesSinceMidnight(employeeObject.startTime)
            employeeObject.endTime = getDateInMinutesSinceMidnight(employeeObject.endTime)
            return employeeObject
        }
    })
}

function getFifteens(employeeObjectArray) {
    let totalFifteens = 0
    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.breaks.map((employeeBreak) => {
                if (employeeBreak[0] == 15) {
                    totalFifteens = totalFifteens + (1 * employeeBreak[1])
                }
            })
        }
    })
    return totalFifteens
}

function getThirties(employeeObjectArray) {
    let totalThirties = 0
    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.breaks.map((employeeBreak) => {
                if (employeeBreak[0] == 30) {
                    totalThirties = totalThirties + 1
                }
            })
        }
    })
    return totalThirties
}

function getTotalBreakTime(employeeObjectArray) {
    let totalBreakTime = 0
    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.breaks.map((employeeBreak) => {
                totalBreakTime = totalBreakTime + employeeBreak[0]
            })
        }
    })
    return totalBreakTime
}



module.exports = {
    getShiftLength,
    getBreaks,
    getBreakSchedule, 
    getFloaters,
    getFifteens,
    getThirties,
    convertStartEndTimesToMinutes,
    getTotalBreakTime,
    getFloaterNumber,
}