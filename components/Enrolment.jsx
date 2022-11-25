import { SafeAreaView, Text, View, Pressable, Button } from 'react-native'
import React from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function Enrolment({ navigation: { goBack } }) {
  return (
    <SafeAreaView style={style.appContainer}>
        <View style={style.container}>
        <Pressable onPress={() => goBack()}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
        <Text>Ilmoittaudu</Text>
        </View>

        <View>
            {/* Dropdown pelipäivän valinnalle */}
            

            {/* FlatList pelaajan valinnalle */}
            
            
            {/* Päivitetään alla olevaan uusi tyyli iconille? */}
            <Pressable onPress={() => goBack()}><View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Plus style={[style.icons]}/></View> 
            <Text>Lisää pelaaja</Text></Pressable>

          <Pressable onPress={() => goBack()} style={[style.enrolButton]}>
            <Text style={style.buttonText}>Ilmoittaudu</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  )
} 

export default Enrolment