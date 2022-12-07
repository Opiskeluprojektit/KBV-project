import Home from "./components/Home.jsx";
import Code from "./components/Code.jsx"
import Points from "./components/Points.jsx";
import Enrolment from "./components/Enrolment.jsx"
import Ranking from "./components/Ranking.jsx";
import Menu from "./components/Menu.jsx";
import SummaryEnrolment from "./components/SummaryEnrolment.jsx"
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

function App() {

  return (
  <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Code">
      <Stack.Screen name="Code" component={Code} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Enrolment" component={Enrolment} options={{ headerShown: false }}/>
      <Stack.Screen name="Points" component={Points} options={{ headerShown: false }}/>
      <Stack.Screen name="Ranking" component={Ranking} options={{ headerShown: false }}/>
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false, presentation: 'modal' }}/>
      <Stack.Screen name="SummaryEnrolment" component={SummaryEnrolment} options={{ headerShown: false, presentation: 'modal' }}/>
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;