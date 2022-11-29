import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function SummaryEnrolment({navigation}) {
  return (
    <SafeAreaView>
    <View style={style.container}>
        <Pressable onPress={() => navigation.navigate('Home')}><View style={style.iconsEllipse}><Icon.X style={[style.icons]}/></View></Pressable>
      <Text>Kiitos ilmoittautumisestasi!</Text>
      </View>
    </SafeAreaView>
  )
}

export default SummaryEnrolment