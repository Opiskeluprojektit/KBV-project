import { SafeAreaView, Text, View, Pressable, Button, ImageBackground } from 'react-native'
import React from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { DataTable } from 'react-native-paper';

const backgroundImage = require('../assets/Volleyball100.png');

function Ranking({navigation}) {
  return (
    <ImageBackground source={backgroundImage}>
      <SafeAreaView>

      <View style={style.header}>
        <Pressable style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.iconsEllipse]} onPress={() => navigation.navigate('Home')}><View><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
        <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
      </View>

      <View style={style.viewContainer}>
        <View style={style.contentOnLightBG}>
          <Text style={style.h4Style}>Ranking-listat</Text>
        </View>
      </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

export default Ranking