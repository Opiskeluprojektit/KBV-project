import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function SummaryEnrolment({ navigation: { goBack } }) {
  return (
    <View>
        <Pressable onPress={() => goBack()}><View style={style.iconsEllipse}><Icon.X style={[style.icons]}/></View></Pressable>
      <Text>Kiitos ilmoittautumisestasi!</Text>
    </View>
  )
}

export default SummaryEnrolment