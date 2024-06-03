import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityCalendar from '../components/ActivityCalendar';
import { eachDayOfInterval, formatISO, startOfYear, endOfYear } from 'date-fns';

const generateFullYearData = (year) => {
  const days = eachDayOfInterval({
    start: startOfYear(new Date(year, 0, 1)),
    end: endOfYear(new Date(year, 11, 31)),
  });

  return days.map(date => ({
    date: formatISO(date, { representation: 'date' }),
    count: Math.floor(Math.random() * 20), // Sample count data
    level: Math.floor(Math.random() * 5),  // Sample level data
  }));
};

export default function HomeTab() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('habitData');
      if (savedData) {
        setData(JSON.parse(savedData));
      } else {
        const newData = generateFullYearData(2024);
        setData(newData);
        await AsyncStorage.setItem('habitData', JSON.stringify(newData));
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ActivityCalendar
        title="Meditation Activity"
        data={data}
        blockMargin={4}
        blockRadius={2}
        blockSize={12}
        fontSize={14}
        maxLevel={4}
        weekStart={0}
        showWeekdayLabels={true}
        hideMonthLabels={false}
        hideTotalCount={false}
        hideColorLegend={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  title: {
    color: 'white',
    fontSize: 18,
    margin: 10,
  },
});
