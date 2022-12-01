import { SafeAreaView, Text, View, Pressable, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List } from 'react-native-paper'

import * as db from "../assets/testidata.json"
import { MyDate, formatDMYtoYMD } from '../scripts/myDate';

const dbPlayers = db.player;
const dbGames = db.game;

function Points({navigation}) {
  const [division, setDivision] = useState();
  const [divisionsExpanded, setDivisionsExpanded] = useState(false);
  const [gamesToShow, setGamesToShow] = useState(dbGames);
  const [chosenGame, setChosenGame] = useState();
  const [gamesExpanded, setGamesExpanded] = useState(false);

  useEffect(() => {
    gameList = mapGames();
  }, gamesToShow)
  
  const filterGames = () => {
    const newGamesToShow = dbGames.filter((i) => i.division !== division);
    setGamesToShow(newGamesToShow);
  }

  const selectDivision = (div) => {
    setDivisionsExpanded(!divisionsExpanded);
    setDivision(div);
    filterGames();
  }

  const selectGame = (game) => {
    setGamesExpanded(!gamesExpanded)
    setChosenGame(game)
  }

  const mapGames = () => {
    return gamesToShow.map(i => <List.Item key={i.id} title={i.division + " " + i.date} onPress={() => selectGame(i)} />);
  }

  let gameList = mapGames();

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Pressable onPress={() => navigation.navigate('Home')}><View style={[style.iconsEllipse]}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
        <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
        <Text style={style.h4Style}>Pisteiden syöttö</Text>
        <List.Section>
          <List.Accordion title={division ? division : "Sarja valikko"} expanded={divisionsExpanded} onPress={() => setDivisionsExpanded(!divisionsExpanded)}>
            <List.Item title="Naiset" onPress={() => selectDivision("Naiset")} />
            <List.Item title="Miehet" onPress={() => selectDivision("Miehet")} />
            <List.Item title="Tytöt" onPress={() => selectDivision("Tytöt")} />
            <List.Item title="Pojat" onPress={() => selectDivision("Pojat")} />
          </List.Accordion>
          <List.Accordion title={chosenGame ? chosenGame.division + " " + chosenGame.date : "Pelit"} expanded={gamesExpanded} onPress={() => setGamesExpanded(!gamesExpanded)}>
            {gameList}
          </List.Accordion>
        </ List.Section>
      </View>
    </SafeAreaView>
  )
}

export default Points
