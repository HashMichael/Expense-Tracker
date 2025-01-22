import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  return (
    <>
    <StatusBar />
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false
      }}>
        
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="register" options={{}} />
      <Stack.Screen name="(tabs)" options={{}} />
    </Stack>
    </>
  );
}
