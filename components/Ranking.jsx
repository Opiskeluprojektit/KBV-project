import { SafeAreaView, Text, View, Pressable, FlatList, ImageBackground } from 'react-native'
import React, { useState, useEffect } from "react";
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { DataTable } from 'react-native-paper'

import { database, placement_ref, PLAYER_REF, EVENT_REF } from "../firebase/Config";
import { onValue, ref, update, child, push, query, orderByValue, equalTo, orderByChild } from "firebase/database";
import { log } from 'react-native-reanimated';

const backgroundImage = require('../assets/Volleyball100.png');

function Ranking({navigation}) {
  const [placement, setPlacement] = useState([]);
  const [player, setPlayer] = useState([])
  const [playersToShow, setPlayersToShow] = useState([])
  const [filter, setFilter] = useState("Miehet");
  const [miehet, setMiehet] = useState([])
  const [tytöt, setTytöt] = useState([])
  const [pojat, setPojat] = useState([])
  const [naiset, setNaiset] = useState([])


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

  useEffect(() => {
    updatePlayersToShow(filter, [])
  }, [player])

  const updatePlayersToShow = (selection, selectedList) => {
    console.log("selectedList", selectedList)
    setFilter(selection)
    if (selectedList.length > 0 ) setPlayersToShow(selectedList) 
    else {
      let newList = player.filter(e => e.division === selection)
      console.log("newList: ", newList);
      newList = newList.sort((a, b) => b.ranking - a.ranking)
        .map((e, i) => {
          e.rankingNumber = i + 1
          return e})
      console.log("newList: ", newList);
      updateSelection(selection, newList);
      setPlayersToShow(newList)
    }
  }

  const updateSelection = (selection, value) => {
    if (selection == "Miehet") setMiehet(value) 
      else if (selection == "Naiset") setNaiset(value)
      else if (selection == "Tytöt") setTytöt(value)
      else setPojat(value)
  }

  const PlayerRow = ({item}) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{item.rankingNumber}</DataTable.Cell>
        <DataTable.Cell style={{flex: 4}}>{item.name}</DataTable.Cell>
        <DataTable.Cell numeric style={{flex: 2, justifyContent: 'center'}}>{item.ranking}</DataTable.Cell>
      </DataTable.Row>
    )
  }

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
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>#</DataTable.Title>
              <DataTable.Title style={{flex: 4}}>Pelaaja</DataTable.Title>
              <DataTable.Title numeric style={{flex: 2, justifyContent: 'center'}}>Sijoituspisteet</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={playersToShow}
              renderItem={PlayerRow}
            />
          </DataTable>
        </View>
      </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

export default Ranking