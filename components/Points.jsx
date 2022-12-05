import { SafeAreaView, Text, View, Pressable, Button, ImageBackground, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List, TextInput } from 'react-native-paper'

import * as db from "../assets/testidata.json"
import { MyDate, formatDMYtoYMD } from '../scripts/myDate';

const backgroundImage = require('../assets/Volleyball100.png');

//Make deep copies of players, enrolments and games from the database.
const dbPlayers = JSON.parse(JSON.stringify(db.player));
const dbEnrolments = JSON.parse(JSON.stringify(db.enrolment));
const sortedDbGames = JSON.parse(JSON.stringify(db.game))
  .map((i) => {
    i.date = new MyDate(formatDMYtoYMD(i.date));
    return i;
  })
  .filter((i) => i.date >= new Date())
  .sort((a, b) => a.date - b.date);

function Points({navigation}) {
  const [division, setDivision] = useState();
  const [divisionsExpanded, setDivisionsExpanded] = useState(false);
  const [gamesToShow, setGamesToShow] = useState(sortedDbGames);
  const [chosenGame, setChosenGame] = useState();
  const [gamesExpanded, setGamesExpanded] = useState(false);
  const [enrolledPlayers, setEnrolledPlayers] = useState();
  const [groups, setGroups] = useState();
  const [searchPlayer, setSearchPlayer] = useState('')

  useEffect(() => {
    gameList = mapGames();
  }, [gamesToShow])

  useEffect(() => {
    filterGames();
  }, [division])
  
  useEffect(() => {
    filterEnrolments()
  }, [chosenGame])
  

  const selectDivision = (div) => {
    setDivisionsExpanded(!divisionsExpanded);
    setDivision(div);
  }
  
  const filterGames = () => {
    const newGamesToShow = sortedDbGames.filter((i) => i.division === division);
    setGamesToShow(newGamesToShow);
  }

  const selectGame = (game) => {
    setGamesExpanded(!gamesExpanded)
    setChosenGame(game)
  }

  const getGameTitle = (i) => {
    return i.division + " " + (i.date.getDate() + 1) + "." + (i.date.getMonth() + 1) + "." + i.date.getFullYear();
  }

  const mapGames = () => {
    return gamesToShow.map(i => <List.Item key={i.id} title={getGameTitle(i)} onPress={() => selectGame(i)} />);
  }

  const filterEnrolments = () => {
    let enrolmentsToChosenGame;
    //console.log("chosenGame: ", chosenGame);
    chosenGame ? enrolmentsToChosenGame = dbEnrolments.concat().filter(i => i.game_id == chosenGame.id) : null
    let newEnrolledPlayers;
    enrolmentsToChosenGame ? newEnrolledPlayers = dbPlayers.concat().filter(i => enrolmentsToChosenGame.find(j => j.player_id === i.id)).sort((a,b) => b.ranking - a.ranking) : null
    newEnrolledPlayers ? console.log("newEnrolledPlayers:", newEnrolledPlayers) : null
    newEnrolledPlayers ? setEnrolledPlayers(newEnrolledPlayers) : null;
  }

  //FlatList search
  const executeSearch = (search) => {
    setSearch(search);
    const newPlayersToShow =
      search.length > 0
        ? dbPlayers.filter(
            (i) =>
              i.name.toLowerCase().includes(search.toLowerCase()) &&
              chosenGame.division === item.division
          )
        : [];
    setPlayersToShow(newPlayersToShow);
  };

  let gameList = mapGames();

  return (
    <ImageBackground source={backgroundImage}>
      <SafeAreaView>

        <View style={style.header}>
          <Pressable onPress={() => navigation.navigate('Home')}><View style={[style.iconsEllipse]}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
          <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
        </View>

        <View style={style.viewContainer}>
          <View style={style.contentOnLightBG}>
            <Text style={style.h4Style}>Pisteiden syöttö</Text>
            <List.Section>
              <List.Accordion title={division ? division : "Sarja valikko"} expanded={divisionsExpanded} onPress={() => setDivisionsExpanded(!divisionsExpanded)}>
                <List.Item title="Naiset" onPress={() => selectDivision("Naiset")} />
                <List.Item title="Miehet" onPress={() => selectDivision("Miehet")} />
                <List.Item title="Tytöt" onPress={() => selectDivision("Tytöt")} />
                <List.Item title="Pojat" onPress={() => selectDivision("Pojat")} />
              </List.Accordion>
              <List.Accordion title={chosenGame ? getGameTitle(chosenGame) : "Pelit"} expanded={gamesExpanded} onPress={() => setGamesExpanded(!gamesExpanded)}>
                {gameList}
              </List.Accordion>
              <TextInput
                  label="Haku"
                  value={searchPlayer}
                  style={style.search}
                  onChangeText={executeSearch}
                  returnKeyType="search"
                  onSubmitEditing={executeSearch}
                  placeholder="Haku" 
                />
            </ List.Section>

            {/* LOHKOT JA PISTEIDEN SYÖTTÖ*/}
            {/* <FlatList 
            data={enrolledPlayers}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            key={i => i.id}
            /> */}
              
          </View>
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

export default Points
