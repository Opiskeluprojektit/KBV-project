import React, {useState, useRef} from 'react';
import { Text, StyleSheet, View, SafeAreaView, Pressable, Linking, ImageBackground, TextInput } from 'react-native';
import { style } from '../styles/styles';
import CodeInput from 'react-native-code-textinput';






function Code({navigation}) {

    const backgroundImage = require('../assets/Volleyball50.png');

    const [code, setCode] = useState('');
    
    const password = 1234;
      return (
        <ImageBackground source={backgroundImage} imageStyle={{height: '100%', width: 800}}>
        <SafeAreaView style={style.container}>
          
          <View style={style.bigLogo}></View>
          
          <View style={style.codeInputField}>
            <CodeInput 
              codeSize={4} 
              value={code}
              onValueChange={setCode}
              inputStyle={style.codeInputBox} 
             >
            </CodeInput>
          </View>
          <View style={style.homeButtonsContainer}>
            <Pressable onPress={() => navigation.navigate('Home')}style={[style.codeButtons, style.button]}>
              <Text style={style.buttonText}>Kirjaudu sisään</Text>
            </Pressable>
          </View>     
        </SafeAreaView>
        </ImageBackground>
      );
    
  }
export default Code;
