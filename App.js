import { Platform, Text, View, Pressable } from "react-native";
import { style } from "./styles/styles.js"; 
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home.jsx";
import Points from "./components/Points.jsx";
import { Provider as PaperProvider } from 'react-native-paper';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';


function App() {
  return (
    <View>
      <Home></Home>
      {/* <Points /> */}
      <View>
        {/* <SplashScreen/> */}
      </View>
        {/* <Text h2 style={style.h2Style}>
          Heading 1
        </Text>
        <Pressable style={style.button}>
          <Text style={style.buttonText}>Button</Text>
        </Pressable> */}
        
    </View>
  );
}

export default App;