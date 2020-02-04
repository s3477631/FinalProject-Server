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

function getBreakSchedule(employeeObjectArray) {
    let unsortedBreakSchedule = []
    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.breaks.map((breakDuration, index) => {
                let breakObject = {}
                if (index == 0) {
                    breakObject = {
                        name: employeeObject.name,
                        startTime: ((employeeObject.startTime.getHours() * 60) + employeeObject.startTime.getMinutes()) + 60,
                        endTime: (((employeeObject.startTime.getHours() * 60) + employeeObject.startTime.getMinutes()) + 60) + Number(breakDuration),
                        duration: Number(breakDuration),
                        breakNum: 1
                    } 
                } else if (index == 1) {
                    breakObject = {
                        name: employeeObject.name,
                        startTime: ((employeeObject.startTime.getHours() * 60) + employeeObject.startTime.getMinutes()) + 135,
                        endTime: (((employeeObject.startTime.getHours() * 60) + employeeObject.startTime.getMinutes()) + 135) + Number(breakDuration),
                        duration: Number(breakDuration),
                        breakNum: 1
                    }
                } else if (index == 2) {
                    breakObject = {
                        name: employeeObject.name,
                        startTime: ((employeeObject.startTime.getHours() * 60) + employeeObject.startTime.getMinutes()) + 225,
                        endTime: (((employeeObject.startTime.getHours() * 60) + employeeObject.startTime.getMinutes()) + 225) + Number(breakDuration),
                        duration: Number(breakDuration),
                        breakNum: 2
                    }
                }
                unsortedBreakSchedule.push(breakObject)
            })
        }
    })
    // breakSchedule = breakSchedule.sort((a, b) => a.startTime - b.startTime)
    unsortedBreakSchedule = sortSecondFifteens(sortBigBreaks(accountForOverlaps(unsortedBreakSchedule.sort((a, b) => a.startTime - b.startTime)))).sort((a, b) => a.startTime - b.startTime)
    console.log(unsortedBreakSchedule)
}

let last30EndTime = 0

// account for overlaps
// iterate through Array
// if start time of previous element matches this element,
// increase the start time if this element by the buffer + the duration of the previous element

function accountForOverlaps(unsortedBreakSchedule) {
    let buffer = 0
    unsortedBreakSchedule = unsortedBreakSchedule.map((thisBreak, index) => {
        const previousBreak = unsortedBreakSchedule[index-1]
        if (previousBreak && previousBreak.startTime == thisBreak.startTime) {
            console.log(`Last break matches this one`)
            thisBreak.startTime = thisBreak.startTime + buffer + previousBreak.duration
            thisBreak.endTime = thisBreak.endTime + buffer + previousBreak.duration
            buffer += previousBreak.duration
        }
        console.log(thisBreak)
        return thisBreak
    })
    return unsortedBreakSchedule
}

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

function getFloaterCount(employeeObjectArray) {
    let floaterCount = 0
    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            if (!employeeObject.job.search('F')) {
                floaterCount = floaterCount + 1
            }
        }
    })
    
    return floaterCount
}

module.exports = {
    getShiftLength,
    getBreaks,
    getBreakSchedule, 
    getFloaterCount
}