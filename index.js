/* Your Code Here */

let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrOfArr) {
    return arrOfArr.map(arr => {
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(date) {
    let [day, time] = date.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: day
    })
    return this
}

let createTimeOutEvent = function(date) {
    let [day, time] = date.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: day
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let inTime = this.timeInEvents.find(ev => {
        return ev.date === date
    })

    let outTime = this.timeOutEvents.find(ev => {
        return ev.date === date
    })

    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour)
}

let findEmployeeByFirstName = function(arrOfRecs, name) {
    return arrOfRecs.find(rec => {
        return rec.firstName === name
    })
}

function calculatePayroll(arrOfRec) {
    return arrOfRec.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}