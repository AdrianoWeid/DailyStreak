import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function AddHabitButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/addHabit')}
      style={{ marginRight: 20 }}
    >
      <FontAwesome name="plus" size={24} color="#c9d1d9" />
    </TouchableOpacity>
  );
}