import React from 'react';
import { Image, Text, View, SafeAreaView, Pressable, Linking, ImageBackground } from 'react-native';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

export default function Home({navigation}) {

  const backgroundImage = require('../assets/Volleyball50.png');
  const logo = require('../assets/Logo2.png');

  return (
    <ImageBackground source={backgroundImage} imageStyle={{height: '100%', width: 800}}>
      <SafeAreaView style={style.container}>

          <View style={style.header}>
          <Image source={logo} style={style.HomeScreenLogo}></Image>
            <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
          </View>
          
          {/* Heading*/}
          <View style={style.heading}>
            <Text style={style.h2Style}>Kokkola{'\n'}Beach{'\n'}Volley</Text>
          </View>

          {/* Navigation to different screens: Enrolment, Points, Ranking and to rules in KBV website*/}
          <View style={style.homeButtonsContainer}>
            <Pressable onPress={() => navigation.navigate('Enrolment')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.UserPlus style={style.icons}/></View>
              <Text style={style.bigButtonText}>Ilmoittaudu</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Points')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Edit style={style.icons}/></View>
              <Text style={style.bigButtonText}>Pisteiden syöttö</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Ranking')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Award style={style.icons}/></View>
              <Text style={style.bigButtonText}>Ranking-listat</Text>
            </Pressable>
            <Pressable  onPress={() => {Linking.openURL('https://sites.google.com/view/kokkolabeachvolley/etusivu/viikkobiitsi/viikkobiitsi-s%C3%A4%C3%A4nn%C3%B6t');}} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <Text style={style.bigButtonText}>ViikkoBiitsi-säännöt</Text>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.BookOpen style={style.icons}/></View>
            </Pressable>
            <Pressable  onPress={() => navigation.navigate('AdminNav')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <Text style={style.bigButtonText}>Admin Paneeli</Text>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Settings style={style.icons}/></View>
            </Pressable>
          </View>
          
      </SafeAreaView>
    </ImageBackground>
  );
}


