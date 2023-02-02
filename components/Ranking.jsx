import { SafeAreaView, Text, View, Pressable, Button, ImageBackground } from 'react-native'
import React, { useState, useEffect } from "react";
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import DataTable from './ranking/DataTable';

import { database, placement_ref, PLAYER_REF, EVENT_REF } from "../firebase/Config";
import { onValue, ref, update, child, push, query, orderByValue, equalTo, orderByChild } from "firebase/database";

const backgroundImage = require('../assets/Volleyball100.png');

function Ranking({navigation}) {
  const [placement, setPlacement] = useState([]);
  const [player, setPlayer] = useState([])

  // Collects placement information from firebase database
  useEffect(() => {
    const placement = ref(database, placement_ref);
    onValue(placement, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const placementItems = { ...data };
      const parse = JSON.parse(JSON.stringify(placementItems));
      console.log("placements: ", parse[50]);
      let parseKeys = Object.values(parse)
      setPlacement(parseKeys);
      console.log("placements: ", parseKeys);
    });
  }, [])

  // Collects player information from firebase database
  useEffect(() => {
    const players = ref(database, PLAYER_REF);
    onValue(players, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const playerItems = { ...data };
      const parse = JSON.parse(JSON.stringify(playerItems));
      const keys = Object.keys(parse)
      let parseKeys = Object.values(parse)
      parseKeys.forEach((element, i) => {
        (!Number.isInteger(element.id)) ? element.id = keys[i] : null;
      });
      setPlayer(parseKeys);
      console.log("players: ", parseKeys);
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <SafeAreaView style={{flex:1}}>

      <View style={style.header}>
        <Pressable style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.iconsEllipse]} onPress={() => navigation.navigate('Home')}><View><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
        <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
      </View>

      <View style={style.viewContainer}>
        <View style={style.contentOnLightBG}>
          <Text style={style.h4Style}>Ranking-listat</Text>
        </View>
      </View>

      <DataTable />

     {/*  <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 30,backgroundColor: '#fff' }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Pelaaja</DataTable.Title>
            <DataTable.Title numeric>Sijoituspisteet</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={{backgroundColor: 'lightyellow'}}>
            <DataTable.Cell>Makkara Mies</DataTable.Cell>
            <DataTable.Cell numeric>29.99</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View> */}

      </SafeAreaView>
    </ImageBackground>
  )
}

export default Ranking