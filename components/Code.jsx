import React from 'react';
import { Image, Text, StyleSheet, View, SafeAreaView, Pressable, Linking, ImageBackground } from 'react-native';
import { style } from '../styles/styles';



function Code({navigation}) {

    const backgroundImage = require('../assets/Volleyball1.jpg');

    return(
        <ImageBackground source={backgroundImage} imageStyle={{opacity:0.5}}>
        <SafeAreaView style={style.container}>
  
            <View style={style.header}>
              <View style={style.HomeScreenLogo}></View>
            </View>
            
            <View style={style.heading}>
              <Text style={style.h2Style}>Kokkola{'\n'}Beach{'\n'}Volley</Text>
            </View>
  
            <View style={style.homeButtonsContainer}>
              <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={style.buttonText}>Kirjaudu sisään</Text>
              </Pressable>
              </View>
        </SafeAreaView>
        </ImageBackground>

    );
}

export default Code;
