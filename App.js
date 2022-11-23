import { Platform, Text, View, Pressable } from "react-native";
import { style } from "./styles"; 
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";

export default function App() {
  return (
    <View style={style.StyleSheet}>
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
