import { SafeAreaView, Text, View, Pressable, Button, ImageBackground, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List, TextInput } from 'react-native-paper'

import * as db from "../assets/testidata.json"
import { MyDate, formatDMYtoYMD } from '../scripts/myDate';

import {database} from '../firebase/Config'
import {onValue, ref, set} from 'firebase/database'
import { color } from 'react-native-reanimated';

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
  const [gamesToShow, setGamesToShow] = useState([]);
  const [chosenGame, setChosenGame] = useState();
  const [gamesExpanded, setGamesExpanded] = useState(false);
  const [enrolledPlayers, setEnrolledPlayers] = useState();
  const [groups, setGroups] = useState();
  //const [searchPlayer, setSearchPlayer] = useState('')

  // Firebase tietokannan testaamiseen liittyvää
  const [player, setPlayer] = useState([]);
  const [enrolment, setEnrolment] = useState([]);

  // Collects game information from firebase database
  useEffect(() => {
    const games = ref(database,"game/");
    onValue(games, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const gameItems = {...data};
      const parse = JSON.parse(JSON.stringify(gameItems))
      const parseKeys = Object.values(parse)
      setGamesToShow(parseKeys);
    });
  },[]);
  
  // Collects player information from firebase database
  useEffect(() => {
    const players = ref(database,"player/");
    onValue(players, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const playerItems = {...data};
      const parse = JSON.parse(JSON.stringify(playerItems))
      let parseKeys = Object.values(parse)
      setPlayer(parseKeys);
    });
  },[]);

// Collects enrolment information from firebase database
  useEffect(() => {
    const enrolment = ref(database,"enrolment/");
    onValue(enrolment, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const enrolmentItems = {...data};
      const parse = JSON.parse(JSON.stringify(enrolmentItems))
      const parseKeys = Object.values(parse)
      setEnrolment(parseKeys);
    });
  },[]);

  let newDbEnrolments = enrolment.concat();


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
    return i.division + " " + i.date.getDate() + "." + i.date.getMonth() + 1 + "." + i.date.getFullYear();
  }

  const mapGames = () => {
    return gamesToShow.map(i => <List.Item key={i.id} title={getGameTitle(i)} onPress={() => selectGame(i)} />);
  }
  
  let gameList = mapGames();

  const filterEnrolments = () => {
    let enrolmentsToChosenGame;
    //console.log("chosenGame: ", chosenGame);
    chosenGame ? enrolmentsToChosenGame = enrolment.concat().filter(i => i.game_id == chosenGame.id) : null
    let newEnrolledPlayers;
    enrolmentsToChosenGame ? newEnrolledPlayers = player.concat().filter(i => enrolmentsToChosenGame.find(j => j.player_id === i.id)).sort((a,b) => b.ranking - a.ranking) : null
    //newEnrolledPlayers ? console.log("newEnrolledPlayers:", newEnrolledPlayers) : null
    newEnrolledPlayers ? setEnrolledPlayers(newEnrolledPlayers) : null;
    //newEnrolledPlayers ? console.log("newEnrolledPlayers: ", newEnrolledPlayers) : null;
  }

  //Flatlist components and functions
  
  const GroupSeparator = () => {
    <View style={style.groupSeparator}></View>
  }

  const Group = ({item}) => {
    //console.log(item);
    return (
      <View>
        <Text style={style.pointTitles}>Lohko {item[0].group + 1}</Text>
        <FlatList
          data={item}
          ItemSeparatorComponent={PlayerSeparator}
          renderItem={Player}/>
      </View>
    )
  }

  const handleScoreChange = (points, round, group) => {
    console.log("points, round, group:", points, round, group);
    //update points to groups.
    let newGroups = groups.concat();
    newGroups[group] = newGroups[group].reduce((newGroup, player, playerNumber) => {
      player.scores[round] = playerNumber == 0 || (round == 0 && playerNumber == 3) || (round == 1 && playerNumber == 1) || (round == 2 && playerNumber == 2) ? points : -points;
      newGroup.push(player)
      return newGroup
    }, [])
    console.log("newGrouops:", newGroups);
    //newGroups[group][0].scores[round] = points;
    setGroups(newGroups)
    //finally make an useEffect that reacts to groups to calculate ranking scores.
  }

  const Player = ({item}) => {
    return (<View>
      <View style={style.playerContainer}><Text style={style.pointTexts}>{item.name}</Text></View>
      {(item.orderNumber % 4) == 0 ?
        <View style={style.playerScoresContainer}>
          <TextInput
            style={style.numInput}
            underlineColor={'#1B1B1B'}
            activeUnderlineColor={'#005C70'} 
            value={item.scores[0]}
            keyboardType={"number-pad"}
            onChangeText={value => handleScoreChange(value, 0, item.group)}
            label={"Erä 1"}
          />
          <TextInput
            style={style.numInput}
            underlineColor={'#1B1B1B'}
            activeUnderlineColor={'#005C70'}   
            value={item.scores[1]}
            keyboardType={"number-pad"}
            onChangeText={value => handleScoreChange(value, 1, item.group)}
            label={"Erä 2"}
          />
          <TextInput
            style={style.numInput}
            underlineColor={'#1B1B1B'}
            activeUnderlineColor={'#005C70'}   
            value={item.scores[2]}
            keyboardType={"number-pad"}
            onChangeText={value => handleScoreChange(value, 2, item.group)}
            label={"Erä 3"}
          />
        </View> : 
        <View style={style.playerScoresContainer}>
          <Text>{item.scores[0]}</Text>
          <Text>{item.scores[1]}</Text>
          <Text>{item.scores[2]}</Text>
        </View> }
    </View>
    )
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
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <View style={[style.container, {flexDirection: "column"}]}>
        <View style={{ flex: 1}}>
          <View style={style.pointsHeader}>
            <Pressable onPress={() => navigation.navigate('Home')}><View style={[style.iconsEllipse]}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
            <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
          </View>
        </View>
        <View style={style.pointsContainer}>
          <View style={{flex: 1, marginHorizontal: 24}}>
            <Text style={style.h4Style}>Pisteiden syöttö</Text>
            <List.Section>
              <List.Accordion 
                  title={division ? division : "Sarjavalikko"} 
                  style={style.search}
                  theme={{colors: {background: '#F9F9F9', primary: '#005C70'} }} 
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
                  theme={{colors: {background: '#F9F9F9', primary: '#005C70'}}} 
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
            {groups ? <View style={{flex: 1}}>
              <FlatList
                data={groups}
                ItemSeparatorComponent={GroupSeparator}
                renderItem={Group}
                scrollEnabled={true}
              />
                
            </View> : null}      
          </View>
        </View>
      </View>
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
