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
          <Pressable style={style.homeButtons}>
            <Text style={[style.buttonText, style.buttonText]}>Ilmoittaudu viikkokisaan</Text>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
          </Pressable>
          <Pressable style={style.homeButtons}>
            <Text style={[style.buttonText, style.buttonText]}>Pisteiden syöttö</Text>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
          </Pressable>
          <Pressable style={style.homeButtons}>
            <Text style={[style.buttonText, style.buttonText]}>ViikkoBiitsi säännöt</Text>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
          </Pressable>
          <Pressable style={style.homeButtons}>
            <Text style={[style.buttonText, style.buttonText]}>Ranking listat</Text>
            <View style={[style.iconsEllipse, style.homeEllipse]}></View>
          </Pressable>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
}


