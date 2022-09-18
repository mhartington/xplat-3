import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Editor } from './src/components/editor';
import { Home } from './src/components/home';

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(isDarkMode)
  return (
    <>

      <StatusBar style="auto" />
      <NavigationContainer  theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen name="Notes" component={Home} />
          <Stack.Screen name="Details" component={Editor} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
