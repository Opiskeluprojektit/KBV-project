import { Platform, Text, View, Pressable } from "react-native";
import { style } from "./styles/styles"; 
//import SplashScreen from "./components/SplashScreen";
//import Home from "./components/Home";

export default function App() {
  return (
    <View style={style.container}>
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
