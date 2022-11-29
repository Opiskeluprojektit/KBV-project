import { SafeAreaView, Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function SummaryEnrolment({ navigation }) {

  const backgroundImage = require('../assets/Volleyball1.jpg');

  return (
    <ImageBackground source={backgroundImage} imageStyle={{opacity:0.5}}>
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.navigate('Home')}><View style={style.iconsEllipse}><Icon.X style={[style.icons]}/></View></Pressable>
        </View>

        <View>
          <Text style={style.h4Style}>Kiitos ilmoittautumisestasi!</Text>
          <Text>ViikkoBiitsi miehet</Text>
          <Text>Kokkola Camping biitsikenttä</Text>
          <Text>
          {/* <View><Icon.Vector/></View> */}
            Torstai ViikkoBiitsi miehet
          </Text>
          <Text>
            {/* <Icon.Users style={style.menuClose}/> */}
            Pekka Pohjola, Pekka Ojala
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SummaryEnrolment