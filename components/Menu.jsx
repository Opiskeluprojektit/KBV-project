import { SafeAreaView, Text, View, Pressable, Button } from 'react-native'
import React from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function CustomMenu({ navigation: { goBack } }) {
  return (
    <SafeAreaView>
    <View style={style.container}>
        <Pressable onPress={() => goBack()}><Icon.X style={style.menuButton} /></Pressable>
        <Text style={style.h4Style}>Ilmoittaudu viikkokisaan</Text>
        <Text style={style.h4Style}>Pisteiden syöttö</Text>
        <Text style={style.h4Style}>Ranking listat</Text>
        <Text style={style.h4Style}>ViikkoBiitsi säännöt <Icon.ArrowUpRight style={style.icons} width={30} height={30}/></Text>
        <Text style={style.h4Style}>Yhteytiedot <Icon.ArrowUpRight style={style.icons} width={30} height={30}/></Text>
        
    </View>
    </SafeAreaView>
  )
}

export default CustomMenu