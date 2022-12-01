import { SafeAreaView, Text, View, Pressable, Linking} from 'react-native'
import React from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function CustomMenu({navigation, navigation: { goBack } }) {
  return (
    <SafeAreaView style={style.menuContainer}>
      <View style={style.container}>
        <Pressable onPress={() => goBack()}>
          <Icon.X style={style.menuClose} width={32} height={32}/>
        </Pressable>
<<<<<<< HEAD
        <Text style={[style.h4Style, style.menuContent]} onPress={() => { navigation.goBack(); navigation.navigate('Enrolment')}}>Ilmoittaudu viikkokisaan</Text>
        <Text style={[style.h4Style, style.menuContent]} onPress={() => { navigation.goBack(); navigation.navigate('Points')}}>Pisteiden syöttö</Text>
        <Text style={[style.h4Style, style.menuContent]} onPress={() => { navigation.goBack(); navigation.navigate('Ranking')}}>Ranking listat</Text>
        <Text style={[style.h4Style, style.menuContent]} onPress={() => {Linking.openURL('https://sites.google.com/view/kokkolabeachvolley/etusivu/viikkobiitsi/viikkobiitsi-s%C3%A4%C3%A4nn%C3%B6t');}}>ViikkoBiitsi säännöt 
          <Icon.ArrowUpRight style={style.menuIcons} width={32} height={32}/>
        </Text>
        <Text style={[style.h4Style, style.menuContent]} onPress={() => {Linking.openURL('https://sites.google.com/view/kokkolabeachvolley/etusivu/yhteystiedot');}}>Yhteytiedot 
          <Icon.ArrowUpRight style={style.menuIcons} width={32} height={32}/>
        </Text>
        <Text> 
          <Icon.Instagram style={style.menuIcons} width={32} height={32} onPress={() => {Linking.openURL('https://www.instagram.com/kokkolabeachvolley/');}}/> 
          <Icon.Facebook style={style.menuIcons} width={32} height={32} onPress={() => {Linking.openURL('https://m.facebook.com/kokkolabeachvolley');}}/>
=======
        <Text style={style.menuContent}>Ilmoittaudu viikkokisaan</Text>
        <Text style={style.menuContent}>Pisteiden syöttö</Text>
        <Text style={style.menuContent}>Ranking listat</Text>
        <Text style={style.menuContent}>ViikkoBiitsi säännöt 
          <Icon.ArrowUpRight style={style.menuIcons} width={32} height={32}/>
        </Text>
        <Text style={style.menuContent}>Yhteytiedot 
          <Icon.ArrowUpRight style={style.menuIcons} width={32} height={32}/>
        </Text>
        <Text style={style.menuContent}> 
          <Icon.Instagram style={style.someIcons} width={32} height={32}/> 
          <Icon.Facebook style={style.someIcons} width={32} height={32}/>
>>>>>>> 93a5dfa6eddc17fdedc8bc31a96d6143a600efc5
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default CustomMenu