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

    if (timeInMinutes >= 240 && timeInMinutes <= 300) {
        breaks.push('15')
    } else if (employeeObject.startTime < 11*60) {
        // they started before 11am, their fifteen should go first
        if (timeInMinutes > 300 && timeInMinutes <= 420) {
            breaks.push('15', '30')
        } else if (timeInMinutes > 420) {
            breaks.push('15', '30', '15')
        }
    } else if (employeeObject.startTime >= 11*60) {
        // they started after 11am, their thirty should go first
        if (timeInMinutes > 300 && timeInMinutes <= 420) {
            breaks.push('30', '15')
        } else if (timeInMinutes > 420) {
            breaks.push('30', '15', '15')
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
            employeeObject.breaks.map((breakDuration, index) => {
                let breakObject = {}
                // refactor to take into account break duration and 
                // build upon last
                if (index == 0) {
                    breakObject = {
                        name: employeeObject.name,
                        startTime: getDateInMinutesSinceMidnight(employeeObject.startTime) + 60,
                        endTime: getDateInMinutesSinceMidnight(employeeObject.startTime) + 60 + Number(breakDuration),
                        duration: Number(breakDuration),
                        breakNum: 1
                    } 
                } else if (index == 1) {
                    breakObject = {
                        name: employeeObject.name,
                        startTime: getDateInMinutesSinceMidnight(employeeObject.startTime) + 135,
                        endTime: getDateInMinutesSinceMidnight(employeeObject.startTime) + 135 + Number(breakDuration),
                        duration: Number(breakDuration),
                        breakNum: 1
                    }
                } else if (index == 2) {
                    breakObject = {
                        name: employeeObject.name,
                        startTime: getDateInMinutesSinceMidnight(employeeObject.startTime) + 225,
                        endTime: getDateInMinutesSinceMidnight(employeeObject.startTime) + 225 + Number(breakDuration),
                        duration: Number(breakDuration),
                        breakNum: 2
                    }
                }
                breakSchedule.push(breakObject)
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
    
    console.log(displayAsDecimal(breakSchedule))
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
                floaterObject.startTime = getDateInMinutesSinceMidnight(floaterObject.startTime)
                floaterObject.endTime = getDateInMinutesSinceMidnight(floaterObject.endTime)
                floaterObject.nextAvailableTime = floaterObject.startTime
                floaterObject.floaterNum = floaters.length + 1
                floaters.push(floaterObject)
            }
        }
    })

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

module.exports = {
    getShiftLength,
    getBreaks,
    getBreakSchedule, 
    getFloaters,
    convertStartEndTimesToMinutes
}