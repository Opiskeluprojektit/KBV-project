import React from 'react';
import { Image, Text, StyleSheet, View, SafeAreaView, Pressable, Linking, ImageBackground } from 'react-native';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

export default function Home({navigation}) {

  const backgroundImage = require('../assets/Volleyball1.jpg');

  return (
    <ImageBackground source={backgroundImage} imageStyle={{opacity:0.5}}>
      <SafeAreaView style={style.container}>

          <View style={style.header}>
            <View style={style.HomeScreenLogo}></View>
            {/* <Pressable onPress={() => navigation.navigate('CustomMenu')}><View><Icon.Menu style={style.menuButton} /></View></Pressable> */}
            <Pressable onPress={() => navigation.openDrawer()}><View><Icon.Menu style={style.menuButton} /></View></Pressable>
          </View>
          
          <View style={style.heading}>
            <Text style={style.h2Style}>Kokkola{'\n'}Beach{'\n'}Volley</Text>
          </View>

          <View style={style.homeButtonsContainer}>
            <Pressable onPress={() => navigation.navigate('Enrolment')} style={style.homeButtons}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.UserPlus style={[style.icons]}/></View>
              <Text style={style.buttonText}>Ilmoittaudu viikkokisaan</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Points')} style={style.homeButtons}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Edit style={[style.icons]}/></View>
              <Text style={style.buttonText}>Pisteiden syöttö</Text>
            </Pressable>
            <Pressable  onPress={() => {Linking.openURL('https://sites.google.com/view/kokkolabeachvolley/etusivu/viikkobiitsi/viikkobiitsi-s%C3%A4%C3%A4nn%C3%B6t');}} style={[style.homeButtons, style.rulesButton]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Award style={[style.icons]}/></View>
              <Text style={style.buttonText}>ViikkoBiitsi-säännöt</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Ranking')} style={style.homeButtons}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.BookOpen style={[style.icons]}/></View>
              <Text style={style.buttonText}>Ranking-listat</Text>
            </Pressable>
          </View>
          
      </SafeAreaView>
    </ImageBackground>
  );
}


