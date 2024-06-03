import { eachDayOfInterval, formatISO, getDay, getMonth, parseISO, startOfYear, endOfYear, subWeeks, nextDay, differenceInCalendarDays } from 'date-fns';

const DEFAULT_MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function groupByWeeks(activities, weekStart = 0) {
  if (activities.length === 0) {
    return [];
  }

  const normalizedActivities = fillHoles(activities);
  const firstDate = parseISO(normalizedActivities[0].date);
  const firstCalendarDate = getDay(firstDate) === weekStart ? firstDate : subWeeks(nextDay(firstDate, weekStart), 1);
  const paddedActivities = [
    ...Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(undefined),
    ...normalizedActivities,
  ];

  const numberOfWeeks = Math.ceil(paddedActivities.length / 7);
  return Array(numberOfWeeks)
    .fill(undefined)
    .map((_, weekIndex) => paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7));
}

function fillHoles(activities) {
  const dateMap = {};
  for (const activity of activities) {
    dateMap[activity.date] = activity;
  }

  return eachDayOfInterval({
    start: parseISO(activities[0].date),
    end: parseISO(activities[activities.length - 1].date),
  }).map(day => {
    const date = formatISO(day, { representation: 'date' });

    if (dateMap[date]) {
      return dateMap[date];
    }

    return {
      date,
      count: 0,
      level: 0,
    };
  });
}

export function getMonthLabels(weeks, monthNames = DEFAULT_MONTH_LABELS) {
  return weeks
    .reduce((labels, week, weekIndex) => {
      const firstActivity = week.find(activity => activity !== undefined);

      if (!firstActivity) {
        throw new Error(`Unexpected error: Week ${weekIndex + 1} is empty: [${week}].`);
      }

      const month = monthNames[getMonth(parseISO(firstActivity.date))];
      const prevLabel = labels[labels.length - 1];

      if (weekIndex === 0 || prevLabel.label !== month) {
        return [...labels, { weekIndex, label: month }];
      }

      return labels;
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      const minWeeks = 3;

      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks;
      }

      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks;
      }

      return true;
    });
}

export function generateEmptyData() {
  const year = new Date().getFullYear();
  const days = eachDayOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
  });

  return days.map(date => ({
    date: formatISO(date, { representation: 'date' }),
    count: 0,
    level: 0,
  }));
}

export function maxWeekdayLabelLength(firstWeek, weekStart, labels, fontSize) {
  return firstWeek.reduce((maxLength, _, index) => {
    if (index % 2 !== 0) {
      const dayIndex = (index + weekStart) % 7;
      const curLength = labels[dayIndex].length * fontSize * 0.6;
      return Math.max(maxLength, curLength);
    }

    return maxLength;
  }, 0);
}
