import { shiftDate, getBeginningOfTimeForDate, convertToDate } from "./helpers";
import {
    SQUARE_SIZE,
    MONTH_LABELS,
    MONTH_LABEL_GUTTER_SIZE,
    DAYS_IN_WEEK
} from "./constants"


function getMonthLabelSize() {
  return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE);
}

function getWeekWidth(gutterSize) {
  return DAYS_IN_WEEK * getSquareSizeWithGutter(gutterSize);
}

function getWeekCount(numDays, endDate) {
    const numDaysRoundedToWeek =
      numDays +
      getNumEmptyDaysAtStart(numDays, endDate) +
      getNumEmptyDaysAtEnd(endDate);
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
}

function getStartDateWithEmptyDays(numDays, endDate) {
  return shiftDate(
    getStartDate(numDays, endDate),
    -getNumEmptyDaysAtStart(numDays, endDate)
  );
}

function getEndDate(endDate) {
  return getBeginningOfTimeForDate(convertToDate(endDate));
}

function getStartDate(numDays, endDate) {
  return shiftDate(getEndDate(endDate), -numDate + 1);
}

function getSquareSizeWithGutter(gutterSize) {
    return SQUARE_SIZE + gutterSize;
}

function getMonthLabelCoordinates(weekIndex, horizontal, gutterSize) {
  return [weekIndex * getSquareSizeWithGutter(gutterSize), 0]
}

function getNumEmptyDaysAtEnd(endDate) {
  return DAYS_IN_WEEK - 1 - getEndDate(endDate).getDay();
}

function getNumEmptyDaysAtStart(numDays, endDate) {
  return getStartDate(numDays, endDate).getDay();
}

function getWeekCount(numDays, endDate) {
  const numDaysRoundedToWeek = 
    numDays + 
    getNumEmptyDaysAtStart(numDays, endDate) + 
    getNumEmptyDaysAtEnd(endDate);
  
  return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
}