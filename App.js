import { Platform, Text, View, Pressable} from "react-native";
import { style } from "./styles/styles.js"; 
import SplashScreen from "./components/SplashScreen";
import Code from "./components/Code.jsx";
import Home from "./components/Home.jsx";
import Points from "./components/Points.jsx";
import Enrolment from "./components/Enrolment.jsx"
import Ranking from "./components/Ranking.jsx";
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Code" component={Code} options={{ headerShown: false }}/>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Enrolment" component={Enrolment} options={{ headerShown: false }}/>
      <Stack.Screen name="Points" component={Points} options={{ headerShown: false }}/>
      <Stack.Screen name="Ranking" component={Ranking} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;