import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

export default function HomeTab() {

  return (
    <ScrollView style={styles.container}>
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
