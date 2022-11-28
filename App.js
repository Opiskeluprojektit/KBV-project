import Home from "./components/Home.jsx";
import Code from "./components/Code.jsx"
import Menu from "./components/Menu.jsx"
import Points from "./components/Points.jsx";
import Enrolment from "./components/Enrolment.jsx"
import Ranking from "./components/Ranking.jsx";
import CustomMenu from "./components/CustomMenu.jsx";
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function Root() {
  return (
    <Drawer.Navigator drawerContent={props => <Menu {...props} options={{ headerShown: false }}/>} >
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Enrolment" component={Enrolment} options={{ headerShown: false }}/>
      <Drawer.Screen name="Points" component={Points} options={{ headerShown: false }}/>
      <Drawer.Screen name="Ranking" component={Ranking} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}

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
      <Stack.Screen name="CustomMenu" component={CustomMenu} options={{ headerShown: false }}/>
      <Stack.Screen name="Enrolment" component={Enrolment} options={{ headerShown: false }}/>
      <Stack.Screen name="Points" component={Points} options={{ headerShown: false }}/>
      <Stack.Screen name="Ranking" component={Ranking} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;