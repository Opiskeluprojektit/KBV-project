import { SafeAreaView, Text, View, Pressable, Button } from 'react-native'
import React from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function Ranking({navigation}) {
  return (
    <SafeAreaView>
    <View style={style.container}>
      <Pressable onPress={() => navigation.navigate('Home')}><View style={[style.iconsEllipse]}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
      <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
      <Text>Ranking</Text>
    </View>
    </SafeAreaView>
  )
}

export default Ranking