import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <Ionicons size={28} name= {focused ? 'home' : 'home-outline'} color={'red'} />,
        }}
      />
      <Tabs.Screen
        name="Transaction"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <Ionicons size={28} name={focused ? 'cash' : 'cash-outline'} color={'red'} />,
          tabBarItemStyle: {
            display: 'none'
          }
        }}
      />
      <Tabs.Screen
        name="Trans/[Details]"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <Ionicons size={28} name={focused ? 'cash' : 'cash-outline'} color={'red'} />,
        }}
      />
    </Tabs>
  );
}
