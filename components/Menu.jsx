import { SafeAreaView, Text, View, Pressable} from 'react-native'
import React from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function CustomMenu({ navigation: { goBack } }) {
  return (
    <SafeAreaView style={style.menuContainer}>
      <View style={style.container}>
        <Pressable onPress={() => goBack()}>
          <Icon.X style={style.menuClose} width={32} height={32}/>
        </Pressable>
        <Text style={style.menuContent}>Ilmoittaudu viikkokisaan</Text>
        <Text style={style.menuContent}>Pisteiden syöttö</Text>
        <Text style={style.menuContent}>Ranking listat</Text>
        <Text style={style.menuContent}>ViikkoBiitsi säännöt 
          <Icon.ArrowUpRight style={style.menuIcons} width={32} height={32}/>
        </Text>
        <Text style={style.menuContent}>Yhteytiedot 
          <Icon.ArrowUpRight style={style.menuIcons} width={32} height={32}/>
        </Text>
        <Text> 
          <Icon.Instagram style={style.someIcons} width={32} height={32}/> 
          <Icon.Facebook style={style.someIcons} width={32} height={32}/>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default CustomMenu