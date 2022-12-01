import { SafeAreaView, Text, View, Pressable, Button } from 'react-native'
import React from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function Ranking({ navigation: { goBack } }) {
  return (
    <SafeAreaView>
    <View style={style.container}>
      <Pressable onPress={() => goBack()}><View style={[style.iconsEllipse]}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
      <Text style={style.h4Style}>Ranking-listat</Text>
    </View>
    </SafeAreaView>
  )
}

export default Ranking