import { Text, View, StyleSheet, Linking } from "react-native";
import { Button } from "react-native-paper";
import { style } from "../styles/styles";

export default function Home() {
  return (
    <View style={style.StyleSheet}>
      <Button>Ilmoittaudu</Button>
      <Button>Pisteiden syöttö</Button>
      <Button>Raking lista</Button>
      <Button
        onPress={() => {
          Linking.openURL(
            "https://sites.google.com/view/kokkolabeachvolley/etusivu/viikkobiitsi/viikkobiitsi-s%C3%A4%C3%A4nn%C3%B6t"
          );
        }}
      >
        ViikkoBiitsi säännöt
      </Button>
    </View>
  );
}
