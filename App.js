import React from 'react';
import Home from "./components/Home";
import Points from "./components/Points.jsx";
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen name="Points" component={Points} />
  </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
  );
}

export default App;