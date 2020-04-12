let createEmployeeRecord = function(arr) {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return record
}

let createEmployeeRecords = function(arrOfArr) {
    let recordsArr = [];
    arrOfArr.forEach((arr)=>{ recordsArr.push(createEmployeeRecord(arr))})
    return recordsArr;
}

let createTimeInEvent = function(dateStamp) {
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let timeInObj = this.timeInEvents.find( obj => (obj.date === date) )
    let timeOutObj = this.timeOutEvents.find( obj => (obj.date === date))
    return (timeOutObj.hour - timeInObj.hour)/100
}

let wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
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

let findEmployeeByFirstName = function(arr, fName) {
    let record = arr.find(record => (record.firstName === fName))
    return record
}

let calculatePayroll = function(arr) {
    return arr.reduce((function(payroll, record) {
        return payroll + allWagesFor.call(record)
    }), 0)
}