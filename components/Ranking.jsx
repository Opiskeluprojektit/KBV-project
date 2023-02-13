import { SafeAreaView, Text, View, Pressable, FlatList, ImageBackground, ScrollView } from 'react-native'
import React, { useState, useEffect } from "react";
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { DataTable, List } from 'react-native-paper'

import { database, placement_ref, PLAYER_REF, EVENT_REF } from "../firebase/Config";
import { onValue, ref, update, child, push, query, orderByValue, equalTo, orderByChild } from "firebase/database";

const backgroundImage = require('../assets/Volleyball100.png');

function Ranking({navigation}) {
  const [placement, setPlacement] = useState([]);
  const [player, setPlayer] = useState([])
  const [playersToShow, setPlayersToShow] = useState([])
  const [division, setDivision] = useState("Miehet");
  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([year]);
  const [miehet, setMiehet] = useState([])
  const [tytöt, setTytöt] = useState([])
  const [pojat, setPojat] = useState([])
  const [naiset, setNaiset] = useState([])
  const [divisionsExpanded, setDivisionsExpanded] = useState(false);
  const [yearExpanded, setYearExpanded] = useState(false);



  // Collects placement information from firebase database
  useEffect(() => {
    const placement = ref(database, placement_ref);
    onValue(placement, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const placementItems = { ...data };
      const parse = JSON.parse(JSON.stringify(placementItems));
      let keys = Object.keys(parse)
      keys = keys.sort((a, b) => b - a)
      setYears(keys)
      let parseKeys = Object.values(parse)
      setPlacement(parseKeys);
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
      parseKeys = parseKeys.map((e) => {
        e.ranking = {2023: e.ranking}
        return e;
      })
      setPlayer(parseKeys);
    });
  }, []);

  useEffect(() => {
    updatePlayersToShow(division, [])
  }, [player, year])

  const updatePlayersToShow = (selection, selectedList) => {
    setDivision(selection)
    if (selectedList.length > 0 ) setPlayersToShow(selectedList) 
    else {
      let newList = player.filter(e => (e.division === selection && e.ranking[year]))
      newList = newList.sort((a, b) => b.ranking[year] - a.ranking[year])
        .map((e, i) => {
          e.rankingNumber = i + 1
          return e})
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
        <DataTable.Cell numeric style={{flex: 2, justifyContent: 'center'}}>{item.ranking[year]}</DataTable.Cell>
      </DataTable.Row>
    )
  }

  let yearList = years.map(e => {
    return (
      <List.Item
        title={e}
        onPress={() => selectYear(e)}
      />
    )
  })

  const selectYear = (e) => {
    setYear(e)
    setYearExpanded(false);
  }

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <SafeAreaView style={{flex:1}}>

      <View style={style.header}>
        <Pressable style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.iconsEllipse]} onPress={() => navigation.navigate('Home')}><View><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
        <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
      </View>

      <View style={[style.viewContainer, {flex:1}]}>
        <View style={[style.contentOnLightBG, {flex:1}]}>
          <Text style={style.h4Style}>Ranking-listat</Text>
          <List.Section style={{flexDirection: 'column'}}>
            {/* Division selection */}
            <List.Accordion
              title={division ? division : "Sarjavalikko"}
              style={[style.search]}
              theme={{
                colors: { background: "#F9F9F9", primary: "#005C70" },
              }}
              expanded={divisionsExpanded}
              onPress={() => setDivisionsExpanded(!divisionsExpanded)}
            >
              <List.Item
                title="Miehet"
                onPress={() => updatePlayersToShow("Miehet", miehet)}
              />
              <List.Item
                title="Naiset"
                onPress={() => updatePlayersToShow("Naiset", naiset)}
              />
              <List.Item
                title="Tytöt"
                onPress={() => updatePlayersToShow("Tytöt", tytöt)}
              />
              <List.Item
                title="Pojat"
                onPress={() => updatePlayersToShow("Pojat", pojat)}
              />
            </List.Accordion>
            {/* Game selection */}
            <List.Accordion
              title={year ? year : "Kaudet"}
              style={[style.search]}
              theme={{
                colors: { background: "#F9F9F9", primary: "#005C70" },
              }}
              expanded={yearExpanded}
              onPress={() => setYearExpanded(!yearExpanded)}
            >
              <ScrollView style={{ maxHeight: "75%" }}>{yearList}</ScrollView>
            </List.Accordion>
          </List.Section>
          <DataTable style={{flex:1}}>
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