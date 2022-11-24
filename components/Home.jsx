import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Pressable } from 'react-native';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

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
            <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.UserPlus style={[style.icons]}/></View>
            <Text style={style.buttonText}>Ilmoittaudu viikkokisaan</Text>
          </Pressable>
          <Pressable style={style.homeButtons}>
            <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Edit style={[style.icons]}/></View>
            <Text style={style.buttonText}>Pisteiden syöttö</Text>
          </Pressable>
          <Pressable style={style.homeButtons}>
            <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Award style={[style.icons]}/></View>
            <Text style={style.buttonText}>ViikkoBiitsi säännöt</Text>
          </Pressable>
          <Pressable style={style.homeButtons}>
            <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.BookOpen style={[style.icons]}/></View>
            <Text style={style.buttonText}>Ranking listat</Text>
          </Pressable>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
}


