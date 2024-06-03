import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { AddHabitButton } from '../components/addHabitButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ navigation, route }) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161b22',
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
        },
        headerStyle: {
          backgroundColor: '#0d1117',
          borderBottomColor: 'rgba(255, 255, 255, 0.2)'
        },
        headerTintColor: 'white',
        headerRight: route.name == 'index' ? () => <AddHabitButton navigation={navigation} /> : undefined,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Habits',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <FontAwesome name="cog" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

