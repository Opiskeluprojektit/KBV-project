import { SafeAreaView, Text, View, Pressable, Button, ImageBackground, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List, TextInput } from 'react-native-paper'
import NumericInput from 'react-native-numeric-input'

import * as db from "../assets/testidata.json"
import { MyDate, formatDMYtoYMD } from '../scripts/myDate';

import {database} from '../firebase/Config'
import {onValue, ref, set} from 'firebase/database'

const backgroundImage = require('../assets/Volleyball100.png');

//Make deep copies of players, enrolments and games from the database.
const dbPlayers = JSON.parse(JSON.stringify(db.player));
const dbEnrolments = JSON.parse(JSON.stringify(db.enrolment));
const sortedDbGames = JSON.parse(JSON.stringify(db.game))
  .map((i) => {
    i.date = new MyDate(formatDMYtoYMD(i.date));
    return i;
  })
  .filter((i) => i.date >= new Date ())
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


  // Hakee pelien tiedot firebase tietokannasta
  useEffect(() => {
    const games = ref(database,"game/");
    onValue(games, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const gameItems = {...data};
      setGamestest(gameItems);
    });
  },[]);

// Firebase tietokannan testaamiseen liittyvää
const [gamestest, setGamestest] = useState();
const [playertest, setPlayertest] = useState();

// Hakee pelaajien tiedot firebase tietokannasta
  useEffect(() => {
    const players = ref(database,"player/");
    onValue(players, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const playerItems = {...data};
      setPlayertest(playerItems);
    });
  },[]);



  useEffect(() => {
    gameList = mapGames();
  }, [gamesToShow])

  useEffect(() => {
    filterGames();
  }, [division])
  
  useEffect(() => {
    filterEnrolments()
  }, [chosenGame])

  useEffect(() => {
    groupPlayers()
  }, [enrolledPlayers])
  

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
    return i.division + " " + (i.date.getDate()) + "." + (i.date.getMonth() + 1) + "." + i.date.getFullYear();
  }

  const mapGames = () => {
    return gamesToShow.map(i => <List.Item key={i.id} title={getGameTitle(i)} onPress={() => selectGame(i)} />);
  }
  
  let gameList = mapGames();

  const filterEnrolments = () => {
    let enrolmentsToChosenGame;
    //console.log("chosenGame: ", chosenGame);
    chosenGame ? enrolmentsToChosenGame = dbEnrolments.concat().filter(i => i.game_id == chosenGame.id) : null
    let newEnrolledPlayers;
    enrolmentsToChosenGame ? newEnrolledPlayers = dbPlayers.concat().filter(i => enrolmentsToChosenGame.find(j => j.player_id === i.id)).sort((a,b) => b.ranking - a.ranking) : null
    //newEnrolledPlayers ? console.log("newEnrolledPlayers:", newEnrolledPlayers) : null
    newEnrolledPlayers ? setEnrolledPlayers(newEnrolledPlayers) : null;
    //newEnrolledPlayers ? console.log("newEnrolledPlayers: ", newEnrolledPlayers) : null;
  }

  //Flatlist components and functions
  
  const GroupSeparator = () => {
    <View style={style.groupSeparator}></View>
  }

  const Group = ({item}) => {
    console.log(item);
    return (<View>
      <Text>Lohko {item[0].group + 1}</Text>
      <FlatList
        data={item}
        ItemSeparatorComponent={PlayerSeparator}
        renderItem={Player}
      />

    </View>)
  }

  const Player = ({item}) => {
    console.log("item.scores: ", item.scores);
    return (<View>
      <Text>{item.name}</Text>
      {(item.orderNumber % 4) == 0 ?
        <View style={style.playerScoresContainer}>
          <TextInput 
            value={item.scores[0] || 0}
            keyboardType={"number-pad"}
            label={"Erä 1"}
          />
          <TextInput 
            value={item.scores[0] || 0}
            keyboardType={"number-pad"}
            label={"Erä 1"}
          />
          <TextInput 
            value={item.scores[0] || 0}
            keyboardType={"number-pad"}
            label={"Erä 1"}
          />
        </View> : 
        <View style={style.playerScoresContainer}>
          <Text>3</Text>
          <Text>1</Text>
          <Text>-2</Text>
        </View> }
    </View>)
  }

  const PlayerSeparator = () => {
    <View style={style.playerSeparator}></View>
  }

  //divides the players in to groups of 4. Uncomment the commented console logs to see what this does.
  const groupPlayers = () => {
    //console.log(enrolledPlayers);
    const newGroups = enrolledPlayers ? enrolledPlayers.reduce((groups, player, i) => {
      let j = Math.floor(i / 4)
      groups[j] = groups[j] || []
      player = addScoringVariablesToPlayer(player, i, j);
      groups[j].push(player);
      return groups
    }, []) : null
    console.log("newGroups: ", newGroups);

    setGroups(newGroups);
  }

  const addScoringVariablesToPlayer = (player, i, j) => {
    //Gives the player objects, scores, sum and ranking keys, for calculating and submitting competition results.
    player.scores = [];
    player.sum = null;
    player.ranking = null;
    //These last two are given to make the nested FlatList management easier.
    player.orderNumber = i;
    player.group = j;

    return player;
  }

  //FlatList search
  /* const executeSearch = (search) => {
    //console.log(search);
    setSearchPlayer(search);
    const newPlayersToShow =
      search.length > 0
        ? dbPlayers.filter(
            (i) =>as
              i.name.toLowerCase().includes(search.toLowerCase()) &&
              chosenGame.division === item.division
          )
        : [];
    setPlayersToShow(newPlayersToShow);
  }; */


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
              <List.Accordion 
                title={division ? division : "Sarjavalikko"} 
                style={style.search}
                theme={{colors: {background: '#F9F9F9'}}} 
                expanded={divisionsExpanded} 
                onPress={() => setDivisionsExpanded(!divisionsExpanded)}>
                <List.Item title="Naiset" onPress={() => selectDivision("Naiset")} />
                <List.Item title="Miehet" onPress={() => selectDivision("Miehet")} />
                <List.Item title="Tytöt" onPress={() => selectDivision("Tytöt")} />
                <List.Item title="Pojat" onPress={() => selectDivision("Pojat")} />
              </List.Accordion>
              <List.Accordion 
                title={chosenGame ? getGameTitle(chosenGame) : "Pelit"} 
                style={style.search} 
                theme={{colors: {background: '#F9F9F9'}}} 
                expanded={gamesExpanded} onPress={() => setGamesExpanded(!gamesExpanded)}>
                {gameList}
              </List.Accordion>
              {/* <TextInput
                label="Pelaajahaku"
                value={searchPlayer}
                style={style.search}
                underlineColor={'#1B1B1B'}
                activeUnderlineColor={'#005C70'}
                onChangeText={executeSearch}
                returnKeyType="search"
                onSubmitEditing={executeSearch}
              /> */}
            </ List.Section>

            {/* LOHKOT JA PISTEIDEN SYÖTTÖ*/}
            {groups ? <View>
              <FlatList
                data={groups}
                ItemSeparatorComponent={GroupSeparator}
                renderItem={Group}
                scrollEnabled={true}
              />
              
            </View> : null}
            
          </View>
        </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

/* const tulokset = {
  player1: {
    scores: [3, -1, 2],
    summa: 4,
    rankingScore: 27,92
  }
} */

export default Points
