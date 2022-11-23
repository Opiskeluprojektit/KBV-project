import { Platform, Text, View, Pressable } from "react-native";
import { style } from "./styles/styles.js"; 
import SplashScreen from "./components/SplashScreen.jsx";
import Home from "./components/Home.jsx";
import Points from "./components/Points.jsx";

export default function App() {
  return (
    <View style={style.StyleSheet}>
      {/* <Points /> */}
      <View>
        {/* <SplashScreen/> */}
      </View>
        <Text h2 style={style.h2Style}>
          Heading 1
        </Text>
        <Pressable style={style.button}>
          <Text style={style.buttonText}>Button</Text>
        </Pressable>
        
    </View>
  );
}
