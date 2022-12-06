import { SafeAreaView, Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function SummaryEnrolment({ navigation }) {

  const backgroundImage = require('../assets/Volleyball50.png');

  return (
    <ImageBackground source={backgroundImage} imageStyle={{height: '100%', width: 800}}>
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <View style={style.iconsEllipse}><Icon.X style={[style.icons]}/></View>
          </Pressable>
        </View>

        <View style={style.summaryContainer}>
          <Text style={style.summaryHeading}>Kiitos ilmoittautumisestasi!</Text>
          <Text style={style.summaryTitle}>ViikkoBiitsi</Text>

          <View style={style.summaryDetails}>
            <Icon.MapPin style={style.summaryIcons}/>
            <Text style={style.text}>Kokkola Camping biitsikenttä</Text>
          </View>
          <View style={style.summaryDetails}>
            <Icon.Clock style={style.summaryIcons}/>
            <Text style={style.text}>Torstai ViikkoBiitsi miehet</Text>
          </View>
          <View style={style.summaryDetails}>
            <Icon.Users style={style.summaryIcons}/>
            <Text style={style.text}>Pekka Pohjola, Pekka Ojala</Text>
          </View>

        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SummaryEnrolment