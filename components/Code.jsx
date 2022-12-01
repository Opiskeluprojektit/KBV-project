import React, {useState, useRef} from 'react';
import { Image, Text, Alert, StyleSheet, View, SafeAreaView, Pressable, Linking, ImageBackground, TextInput } from 'react-native';
import { style } from '../styles/styles';
import CodeInput from 'react-native-code-textinput';






function Code({navigation}) {

    const backgroundImage = require('../assets/Volleyball1.jpg');

    const [code, setCode] = useState('');
    
    const password = 1234;

    function checkCode() {
      if (code === password) {
        console.log(code)
        navigation.navigate('Home')
      }else {
        Alert.alert (
          "Koodi väärin, syötä uusi koodi."
        )
      }
    }

      return (
        <ImageBackground source={backgroundImage} imageStyle={{opacity:0.5, height: '100%', width: 800}}>
        <SafeAreaView style={style.container}>
          <View style={style.header}>
            <View style={style.HomeScreenLogo}></View>
          </View>
            
          <View style={style.heading}>
            <Text style={style.h2Style}>Kokkola{'\n'}Beach{'\n'}Volley</Text>
          </View>
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
            <Pressable onPress={() => checkCode()}style={[style.codeButtons, style.button]}>
              <Text style={style.buttonText}>Kirjaudu sisään</Text>
            </Pressable>
            </View>     
        </SafeAreaView>
        </ImageBackground>
      );
    
  }
export default Code;
