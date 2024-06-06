import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CalendarHeatmap from '@hackclub/react-calendar-heatmap';
import '@hackclub/react-calendar-heatmap/dist/styles.css';


export default function HomeTab() {
  return (
    <ScrollView style={styles.container}> {/* Ändere styles zu style */}
      <CalendarHeatmap
        endDate={new Date()}
        values={[
          { date: '2024-01-01', count: 12 },
          { date: '2024-01-22', count: 122 },
          { date: '2024-01-30', count: 38 },
          // ...and so on
        ]}
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
