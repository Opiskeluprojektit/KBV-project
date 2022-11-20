import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { android, ios } from './styles';

export default function App() {
  return (
    <View style={android.StyleSheet}>
      <Text style={android.headings}>Heading 1</Text>
      <Pressable
        style={android.button}>
        <Text
          style={android.buttonText}>Button</Text>
      </Pressable>
    </View>
  );
};
