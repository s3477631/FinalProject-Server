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

function getBreaks(shiftLength) {
    let shiftLengthArray = shiftLength.split(' ')

    let hours = Number(shiftLengthArray[0])
    let minutes = Number(shiftLengthArray[1])

    let timeInMinutes = (minutes + hours * 60)
    let breaks = []

    if (timeInMinutes >= 240 && timeInMinutes <= 300) {
        breaks.push('15')
    } else if (timeInMinutes > 300 && timeInMinutes <= 420) {
        breaks.push('15', '30')
    } else if (timeInMinutes > 420 && timeInMinutes <= 540) {
        breaks.push('15', '30', '15')
    } else if (timeInMinutes > 540) {
        // breaks.push('15', '30', '15', '30')
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

    console.log(getFloaters(employeeObjectArray))
    
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

    // sort first fifteens
    // iterate through break schedule
    // ignore 30 min breaks
    // push 15 min breaks back according to availability

    // move 30's 

    // move 15's

    //console.log("ascending order", breakSchedule)
    // if you have too many 15 min breaks at the start
    // and you account for overlap right at the end
    // the halves will get pushed back past 12 pm
    // so maybe account for overlaps twice
    // once at the start
    // and once at the end

    // step 2: account for overlaps given floater availability
    breakSchedule = accountForOverlaps(breakSchedule)

    // step 3: move 30 min breaks to start at 12 pm
    breakSchedule = sortBigBreaks(breakSchedule)

    // step 4: move 15 min breaks to start after the final 30 min break
    breakSchedule = sortSecondFifteens(breakSchedule)

    // step 5: finally, sort again in ascending order
    breakSchedule = sortInAscendingOrder(breakSchedule)
    
    //console.log(displayAsDecimal(breakSchedule))
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

// account for overlaps
// iterate through Array
// if start time of previous element matches this element,
// increase the start time if this element by the buffer + the duration of the previous element

// need to know all the floaters and their shift times

function accountForOverlaps(unsortedBreakSchedule, numFloaters) {
    let buffer = 0
    let sameCount = 0
    unsortedBreakSchedule = unsortedBreakSchedule.map((thisBreak, index) => {
        const previousBreak = unsortedBreakSchedule[index-1]
        // only increase start time if same count >= num floaters *at this point in time*
        // this indicates we're over capacity
        // i.e. 3 breaks need to be done at the same time
        // but we only have 2 floaters
        if (previousBreak && previousBreak.startTime == thisBreak.startTime) {
            // console.log(`Last break matches this one`)
            thisBreak.startTime = thisBreak.startTime + buffer + previousBreak.duration
            thisBreak.endTime = thisBreak.endTime + buffer + previousBreak.duration
            buffer += previousBreak.duration
        }
        // console.log(thisBreak)
        return thisBreak
    })
    return unsortedBreakSchedule
}

// new account for overlaps function
function sortFirstFifteens(breakSchedule, floaters) {
    // iterate through break schedule
    // if this break has an available floater, assign this break to a floater
    // otherwise
    let buffer = 0
    let sameCount = 0
    breakSchedule = breakSchedule.map((thisBreak, index) => {
        const previousBreak = breakSchedule[index-1]
        // only increase start time if same count >= num floaters *at this point in time*
        // this indicates we're over capacity
        // i.e. 3 breaks need to be done at the same time
        // but we only have 2 floaters
        if (previousBreak && previousBreak.startTime == thisBreak.startTime) {
            // console.log(`Last break matches this one`)
            thisBreak.startTime = thisBreak.startTime + buffer + previousBreak.duration
            thisBreak.endTime = thisBreak.endTime + buffer + previousBreak.duration
            buffer += previousBreak.duration
        }
        // console.log(thisBreak)
        return thisBreak
    })
    return breakSchedule
}

function floaterIsAvailabile(time, floaters) {
    // given a time, find whether there is a floater free to do this break
    // need to know what breaks the floater is currently on
    // iterate through floaters, return true if floater is free
    // free meaning the passed time is between the floater's start and end time
    // and they have finished their previous break
    // store when they'll be next free
}

let last30EndTime = 0 // this line should reset or it may break on multiple uploads

function sortBigBreaks(unsortedBreakSchedule) {
    let count = 0
    unsortedBreakSchedule = unsortedBreakSchedule.map((breakData) => {
        if (breakData.duration === 30) {
            breakData.startTime = 720 + (30 * count)
            count = count + 1
            breakData.endTime = breakData.startTime + 30
            last30EndTime = breakData.endTime
        }
        return breakData
    })
    // unsortedBreakSchedule = unsortedBreakSchedule.sort((a, b) => a.startTime - b.startTime)
    // console.log(unsortedBreakSchedule)
    return unsortedBreakSchedule
}

function sortSecondFifteens(unsortedBreakSchedule) {
    let count = 0
    unsortedBreakSchedule = unsortedBreakSchedule.map((breakData) => {
        // if break is after 12 and is 15 mins long
        if (breakData.startTime >= 720 && breakData.duration === 15) {
            breakData.startTime = last30EndTime + (15 * count)
            count = count + 1
            breakData.endTime = breakData.startTime + 15
        }
        return breakData
    })
    // console.log(unsortedBreakSchedule)
    return unsortedBreakSchedule
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

                floaters.push(floaterObject)
            }
        }
    })

    return floaters
}



module.exports = {
    getShiftLength,
    getBreaks,
    getBreakSchedule, 
    getFloaters
}