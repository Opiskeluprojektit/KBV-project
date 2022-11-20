import { Platform, Text, View, Pressable } from 'react-native';
import { android, ios } from './styles'; // Tämä rivi on Lauran testailuja - älä poista vielä
import SplashScreen from './components/SplashScreen';

export default function App() {
  return (

    <View>
      <SplashScreen></SplashScreen>
    </View>

      // Nämä alla olevat on Lauran testailuja tyylejä varten
      // Älkää poistako vielä
/*     <View style={android.StyleSheet}>
      <Text h1 
        style={android.h1Style}>Heading 1</Text>
      <Pressable
        style={android.button}>
        <Text
          style={android.buttonText}>Button</Text>
      </Pressable>
    </View> */
  );
};
