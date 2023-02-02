import Home from "./components/Home.jsx";
import Code from "./components/Code.jsx"
import Points from "./components/Points.jsx";
import Enrolment from "./components/Enrolment.jsx"
import Ranking from "./components/Ranking.jsx";
import Menu from "./components/Menu.jsx";
import AdminEvents from "./components/adminFiles/AdminEvents.jsx";
import AdminNav from "./components/adminFiles/AdminNav.jsx";
import AdminCodes from "./components/adminFiles/AdminCodes";
import AdminPlayers from "./components/adminFiles/AdminPlayers";
import AdminEditPlayers from "./components/adminFiles/AdminEditPlayers.jsx";
import AdminEditEvents from "./components/adminFiles/AdminEditEvents.jsx";
import { Provider as PaperProvider, useTheme, MD2DarkTheme, MD2LightTheme, } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import merge from 'deepmerge';


const Stack = createNativeStackNavigator()

function App() {

  const theme = useTheme();
  console.log("Theme:", theme);
  console.log("Theme MD2Light:", MD2LightTheme);
  console.log("Theme NavigationDefaultTheme:", NavigationDefaultTheme);

  const CombinedDefaultTheme = merge(theme, NavigationDefaultTheme);
  console.log("Theme CombinedDefaultTheme:", CombinedDefaultTheme);


  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Stack.Navigator initialRouteName="Code">
          <Stack.Screen name="Code" component={Code} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Enrolment" component={Enrolment} options={{ headerShown: false }}/>
          <Stack.Screen name="Points" component={Points} options={{ headerShown: false }}/>
          <Stack.Screen name="Ranking" component={Ranking} options={{ headerShown: false }}/>
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false, presentation: 'modal' }}/>
          <Stack.Screen name="AdminNav" component={AdminNav} options={{ headerShown: false }}/>
          <Stack.Screen name="AdminEvents" component={AdminEvents} options={{ headerShown: false }}/>
          <Stack.Screen name="AdminEditEvents" component={AdminEditEvents} options={{ headerShown: false }}/>
          <Stack.Screen name="AdminPlayers" component={AdminPlayers} options={{ headerShown: false }}/>
          <Stack.Screen name="AdminEditPlayers" component={AdminEditPlayers} options={{ headerShown: false }}/>
          <Stack.Screen name="AdminCodes" component={AdminCodes} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;