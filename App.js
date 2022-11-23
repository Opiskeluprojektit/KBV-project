import { Platform, Text, View, Pressable } from "react-native";
import { style } from "./styles/styles.js"; 
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import Points from "./components/Points.jsx";

export default function App() {
  return (
    <View style={style.StyleSheet}>
      {/* <Points /> */}
      <View>
        <SplashScreen/>
      </View>
        <Text h1 style={style.h2Style}>
          Heading 1
        </Text>
        <Text style={style.buttonText}>Button</Text>
    </View>
  );
}
