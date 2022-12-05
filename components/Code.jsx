import React, {useState, useRef, useEffect} from 'react';
import { Image, Text, Alert, StyleSheet, View, SafeAreaView, Pressable, Linking, ImageBackground, TextInput } from 'react-native';
import { style } from '../styles/styles';
import CodeInput from 'react-native-code-textinput';

const password = 1234;

function Code({navigation}) {

    const backgroundImage = require('../assets/Volleyball50.png');
    const logo = require('../assets/Logo2.png');

    const [code, setCode] = useState(password);

    function checkCode() {
      if (code == password) {
        navigation.navigate('Home')
      }else {
        Alert.alert (
          "Koodi väärin, syötä uusi koodi."
        )
      }
    }

      return (
        <ImageBackground source={backgroundImage} imageStyle={{height: '100%', width: 800}}>
          <SafeAreaView>
            
            <Image source={logo} style={style.bigLogo}></Image>
            
            <View style={style.codeInputField}>
              <CodeInput 
                codeSize={4} 
                value={1234}
                onValueChange={setCode}
                inputStyle={style.codeInputBox}>
              </CodeInput>
            </View>
            <View style={style.codeContainer}>
              <Pressable onPress={() => checkCode()}>
                <Text style={style.titles}>Kirjaudu sisään</Text>
              </Pressable>
            </View>     
            
          </SafeAreaView>
        </ImageBackground>
      );
    
  }
export default Code;
