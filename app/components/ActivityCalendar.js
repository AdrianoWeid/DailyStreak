import { getYear, parseISO } from 'date-fns';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { generateEmptyData, getMonthLabels, groupByWeeks, maxWeekdayLabelLength } from '../utils/calendar';
import { createTheme } from '../utils/theme';

const DEFAULT_LABELS = {
  totalCount: '{{count}} activities in {{year}}',
  legend: {
    less: 'Less',
    more: 'More',
  },
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const ActivityCalendar = ({
  title,
  data,
  blockMargin = 4,
  blockRadius = 2,
  blockSize = 12,
  fontSize = 14,
  hideColorLegend = false,
  hideMonthLabels = false,
  hideTotalCount = false,
  labels: labelsProp = undefined,
  maxLevel = 4,
  loading = false,
  showWeekdayLabels = false,
  style: styleProp = {},
  theme: themeProp = undefined,
  totalCount: totalCountProp = undefined,
  weekStart = 0,
}) => {
  console.log("ActivityCalendar component rendered");
  console.log("Data:", data);

  maxLevel = Math.max(1, maxLevel);
  const theme = createTheme(themeProp, maxLevel + 1);
  const colorScale = theme['light'];

  if (loading) {
    data = generateEmptyData();
  }

  if (data.length === 0) {
    return <Text style={{ color: 'white' }}>No Data</Text>;
  }

  const year = getYear(parseISO(data[0]?.date));
  const weeks = groupByWeeks(data, weekStart);

  if (!weeks || weeks.length === 0) {
    return <Text style={{ color: 'white' }}>No Weeks</Text>;
  }

  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  const labelHeight = hideMonthLabels ? 0 : fontSize + 10;

  const weekdayLabelOffset = showWeekdayLabels
    ? maxWeekdayLabelLength(weeks[0], weekStart, labels.weekdays, fontSize) + 10
    : undefined;

  const getDimensions = () => {
    return {
      width: weeks.length * (blockSize + blockMargin) - blockMargin,
      height: labelHeight + (blockSize + blockMargin) * 7 - blockMargin,
    };
  };

  const renderDay = (day) => {
    return (
      <View
        key={day.date}
        style={[
          styles.cell,
          {
            width: blockSize,
            height: blockSize,
            borderRadius: blockRadius,
            margin: blockMargin / 2,
            backgroundColor: colorScale[day.level],
          },
        ]}
      />
    );
  };

  const renderWeek = (week, weekIndex) => (
    <View key={weekIndex} style={styles.weekRow}>
      {week.map((day, dayIndex) => day && renderDay(day))}
    </View>
  );

  const renderMonthLabels = () => {
    const monthLabels = getMonthLabels(weeks, labels.months).map(({ label, weekIndex }) => (
      <Text
        key={weekIndex}
        style={[
          styles.monthText,
          {
            left: (blockSize + blockMargin) * weekIndex,
            fontSize,
            height: fontSize + 10,
          },
        ]}
      >
        {label}
      </Text>
    ));
    return <View style={styles.monthRow}>{monthLabels}</View>;
  };

  const renderLabels = () => {
    if (!showWeekdayLabels && hideMonthLabels) {
      return null;
    }

    return (
      <>
        {showWeekdayLabels && (
          <View style={styles.weekdayLabels}>
            {weeks[0].map((_, index) => {
              if (index % 2 === 0) {
                return null;
              }

              const dayIndex = (index + weekStart) % 7;

              return (
                <Text
                  key={index}
                  style={[
                    styles.weekdayLabel,
                    {
                      top: labelHeight + (blockSize + blockMargin) * index + blockSize / 2,
                      fontSize,
                    },
                  ]}
                >
                  {labels.weekdays[dayIndex]}
                </Text>
              );
            })}
          </View>
        )}
        {!hideMonthLabels && renderMonthLabels()}
      </>
    );
  };

  const { width, height } = getDimensions();

  return (
    <View style={[styles.container, styleProp]}>
      <Text style={[styles.title, { fontSize }]}>{title}</Text>
      <ScrollView horizontal>
        <View style={[styles.calendar, { width, height, marginLeft: weekdayLabelOffset }]}>
          {!loading && renderLabels()}
          <View style={styles.grid}>{weeks.map((week, weekIndex) => renderWeek(week, weekIndex))}</View>
        </View>
      </ScrollView>
      {!loading && !hideTotalCount && (
        <Text style={[styles.totalCount, { fontSize }]}>
          {labels.totalCount
            ? labels.totalCount.replace('{{count}}', String(totalCountProp ?? data.reduce((sum, activity) => sum + activity.count, 0)))
              .replace('{{year}}', String(year))
            : `${totalCountProp ?? data.reduce((sum, activity) => sum + activity.count, 0)} activities in ${year}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d1117',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
  },
  weekRow: {
    flexDirection: 'column',
  },
  dayCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    margin: 1,
  },
  filledCell: {
    backgroundColor: 'green',
  },
  emptyCell: {
    backgroundColor: '#333',
  },
  monthRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  monthText: {
    position: 'absolute',
    color: 'white',
    textAlign: 'center',
  },
  weekdayLabels: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  weekdayLabel: {
    position: 'absolute',
    color: 'white',
    textAlign: 'right',
  },
  totalCount: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ActivityCalendar;
