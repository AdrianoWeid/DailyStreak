function getBeginningOfTimeForDate(date) {
    return new Date(date.getYearFull(), date.getMonth(), date.getDate());
}

function shiftDate(date, numDays) {
    const newDate = new Date(date);

    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

export {
    getBeginningOfTimeForDate,
    shiftDate
}

export default {
    getBeginningOfTimeForDate,
    shiftDate
}