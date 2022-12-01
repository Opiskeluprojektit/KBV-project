import { SafeAreaView, Text, View, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List } from 'react-native-paper'

import * as db from "../assets/testidata.json"
import { MyDate, formatDMYtoYMD } from '../scripts/myDate';

const division = ["Naiset", "Miehet", "Tytöt", "Pojat"];

temp = formatDMYtoYMD("25.11.2022")
pvm = new MyDate(temp)

function Points({ navigation: { goBack } }) {
  const [division, setDivision] = useState("Naiset")
  const [divisionsExpanded, setDivisionsExpanded] = useState(false)

  const selectDivision = (div) => {
    //tähän vois laittaa pienen viiveen ja jonkun huomauttimen: "Sarja x valittu".
    setDivisionsExpanded(!divisionsExpanded)
    setDivision(div)
    //console.log(pvm.getWeek(), "Viikkonumero");
  }

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Pressable onPress={() => goBack()}><View style={[style.iconsEllipse]}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
        <Text style={style.h4Style}>Pisteiden syöttö</Text>
        <List.Section title="Sarja">
          <List.Accordion title="Sarja valikko" expanded={divisionsExpanded} onPress={() => setDivisionsExpanded(!divisionsExpanded)}>
            <List.Item title="Naiset" onPress={() => selectDivision("Naiset")} />
            <List.Item title="Miehet" onPress={() => selectDivision("Miehet")} />
            <List.Item title="Tytöt" onPress={() => selectDivision("Tytöt")} />
            <List.Item title="Pojat" onPress={() => selectDivision("Pojat")} />
          </List.Accordion>
        </ List.Section>
      </View>
    </SafeAreaView>
  )
}

export default Points
