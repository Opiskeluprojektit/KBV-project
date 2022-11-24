import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Pressable } from 'react-native';
import { style } from '../styles/styles';

export default function Home() {

  return (
    <SafeAreaView style={style.appContainer}>
      <View style={style.container}>

        <View style={style.header}>
          <Text>Tänne logo ja hamppari</Text>
        </View>
        
        <View style={style.heading}>
          <Text style={style.h2Style}>Kokkola{'\n'}Beach{'\n'}Volley</Text>
        </View>

        <View style={style.homeButtonsContainer}>
          <Pressable style={[style.homeButtons, style.signUpButton]}>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
            <Text style={[style.buttonText, style.bigButtonText]}>Ilmoittaudu viikkokisaan</Text>
          </Pressable>
          <Pressable style={[style.homeButtons, style.pointsButton]}>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
            <Text style={[style.buttonText, style.smallButtonText]}>Pisteiden{'\n'}syöttö</Text>
          </Pressable>
          <Pressable style={[style.homeButtons, style.rulesButton]}>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
            <Text style={[style.buttonText, style.smallButtonText]}>ViikkoBiitsi säännöt</Text>
          </Pressable>
          <Pressable style={[style.homeButtons, style.rankingButton]}>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
            <Text style={[style.buttonText, style.bigButtonText]}>Ranking{'\n'}listat</Text>
          </Pressable>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
}


