import { Platform, Text, View, Pressable } from "react-native";
import { style } from "./styles"; // Tämä rivi on Lauran testailuja - älä poista vielä
import SplashScreen from "./components/SplashScreen";

export default function App() {
  return (
    <View style={style.StyleSheet}>
      <View>
        <SplashScreen></SplashScreen>
      </View>
        <Text h1 style={style.h1Style}>
          Heading 1
        </Text>
        <Text style={style.buttonText}>Button</Text>
    </View>
  );
}
