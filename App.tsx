import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Editor } from './src/components/editor';
import { Home } from './src/components/home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ presentation: 'modal', }}
        >
          <Stack.Screen name="Notes" component={Home} />
          <Stack.Screen name="Details" component={Editor} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
