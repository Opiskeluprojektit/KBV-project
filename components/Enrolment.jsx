import { SafeAreaView,  FlatList, Text, View, Pressable, Alert, 
  Button, ImageBackground } from 'react-native';
import React, { useState, useEffect} from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List, TextInput, Modal, Portal, Provider } from 'react-native-paper';
import db from '../assets/testidata.json';
import {database} from '../firebase/Config';
import {onValue, ref} from 'firebase/database';
import { MyDate, formatDMYtoYMD } from '../scripts/myDate';


const dbPlayers = JSON.parse(JSON.stringify(db.player));
const dbEnrolments = JSON.parse(JSON.stringify(db.enrolment));
const sortedDBGames = JSON.parse(JSON.stringify(db.game))
.map((i) => {
  i.date = new MyDate(formatDMYtoYMD(i.date));
  return i;
})
.filter((i) => i.date >= new Date())
.sort((a, b) => a.date - b.date);

let newDbEnrolments = dbEnrolments.concat();

const backgroundImage = require('../assets/Volleyball100.png');

function Enrolment({ navigation }) {
  // Nämä constit tullaan kommentoimaan myös
  const [search, setSearch] = useState('');
  const [playersToShow, setPlayersToShow] = useState([]);
  const [playersToEnroll, setPlayersToEnroll] = useState();
  const [enrolledPlayers, setEnrolledPlayers] = useState();
  const [chosenGame, setChosenGame] = useState();
  const [gamesToShow, setGamesToShow] = useState(sortedDBGames);
  const [gamesExpanded, setGamesExpanded] = useState(false);
  const [visible, setVisible] = React.useState(false);

  // Firebase tietokannan testaamiseen liittyvää
  const [gamestest, setGamestest] = useState();
  const [playertest, setPlayertest] = useState();

  // Collects game information from firebase database
  useEffect(() => {
    const games = ref(database,"game/");
    onValue(games, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const gameItems = {...data};
      setGamestest(gameItems);
    });
  },[]);
  
  // Collects player information from firebase database
  useEffect(() => {
    const players = ref(database,"player/");
    onValue(players, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const playerItems = {...data};
      setPlayertest(playerItems);
    });
  },[]);

  useEffect(() => {
    checkModal() ? showModal() : null;
  }, [enrolledPlayers])
  
  
  console.log(gamestest)
  
  // The component for closing the game day dropdown and setting the chosen game date
  const selectGame = (i) => {
    setGamesExpanded(!gamesExpanded);
    setChosenGame(i);  
  }
  
  // The component that the FlatList component uses to print it's items.
  const Item = ({ name }) => (
      <Text>{name}</Text>
  );

  // The search component for player search:
    // Search filters the written text and brings up the results according to it
    /* Tähän lisätään vielä, että pelaajaa ei näytetä, jos hän on jo 
        ilmoittautunut kyseiseen peliin */
  const executeSearch = (search) => {
    setSearch(search);
    const searchArray =
      search.length > 0
        ? dbPlayers.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) &&
              chosenGame.division === item.division
          )
        : [];
    setPlayersToShow(searchArray);
  };

  // Selecting the player from the flatlist
  const selectPlayer = (player) => {
    console.log("pelaaja valittu: ", player);
    // const newPlayersToEnroll = playersToEnroll.concat(player);
    setPlayersToEnroll(player);
    setSearch(player.name);
    setPlayersToShow();
  }
    
  // Converts the game date to specific form: dd.mm.yyyy
  const getGameTitle = (i) => {
    return i.division + " " + (i.date.getDate() + 1) + "." + (i.date.getMonth() + 1) + "." + i.date.getFullYear();
  }

  // Maps the game date list
  const gameList = gamesToShow.map(i => <List.Item key={i.id} title={getGameTitle(i)} onPress={() => selectGame(i)} />);

  // Showing and hiding the summary modal
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setChosenGame();
  }

  const handleEnrollment = () => {
    if (checkModal()) {
      //push a new enrolment to the enrolments list. Which will later be filtered by the filterEnrolments() to get the enrolled player to show on the modal.
      //newDbEnrolments.push({id: 99, game_id: chosenGame.id, player_id: playersToEnroll.id});
      
      filterEnrolments()
    }
    else {
      Alert.alert("Tarkista peli- ja pelaajavalinnat!")
    }
  } 

  function checkModal() {
    return chosenGame && playersToEnroll ? true : false;
  }

  const filterEnrolments = () => {
    let enrolmentsToChosenGame;
    let newEnrolledPlayers;
    //console.log("chosenGame: ", chosenGame);
    chosenGame ? enrolmentsToChosenGame = newDbEnrolments.concat().filter(i => i.game_id == chosenGame.id) : null
    enrolmentsToChosenGame ? newEnrolledPlayers = dbPlayers.concat().filter(i => enrolmentsToChosenGame.find(j => j.player_id === i.id)).sort((a,b) => b.ranking - a.ranking) : null
    newEnrolledPlayers ? setEnrolledPlayers(newEnrolledPlayers) : null;
  }

  const Player = ({item}) => {
    return <Text>{item.name}</Text>
  }

  return (
    <ImageBackground source={backgroundImage}>
      <SafeAreaView>
      
          {/* Header: Go back button and Menu */}
          <View style={style.header}>
            <Pressable onPress={() => navigation.navigate('Home')}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
            <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
          </View>

          {/* Heading */}
          <View style={style.viewContainer}>
            <View style={style.contentOnLightBG}>
              <Text style={style.h4Style}>Ilmoittautuminen viikkokisaan</Text>
  
              {/* Dropdown for choosing gaming day */}
              <List.Section>
                <List.Accordion
                  title={chosenGame ? getGameTitle(chosenGame) : "Valitse peli"}
                  style={style.search}
                  theme={{colors: {background: '#F9F9F9'}}}
                  expanded={gamesExpanded}
                  onPress={() => setGamesExpanded(!gamesExpanded)} >
                    
                  {gameList} 
                </List.Accordion> 
              </List.Section>

              {/* FlatList for choosing the player */}
              {chosenGame ? <>
                <TextInput
                  label="Pelaajahaku"
                  value={search}
                  style={style.search}
                  underlineColor={'#1B1B1B'}
                  activeUnderlineColor={'#005C70'}
                  onChangeText={text => executeSearch(text)}
                  returnKeyType="search"
                  onSubmitEditing={() => executeSearch(search)}
                />
                <FlatList
                  data={playersToShow}
                  renderItem={({item}) => <Pressable onPress={() => selectPlayer(item)}><Item name={item.name} /></Pressable>}
                  key={i => i.id}
                /></>
              : null}         
              
              {/* HIDDEN, not in use: Button for adding new player to enrol */}
              {/* <View style={style.addPlayer}>
                <Pressable style={{flexDirection: "row"}} onPress={() => console.log("Lisää uusi pelaaja")}>
                  <View style={[style.iconsAddPlayer]}>
                    <Icon.Plus style={style.icons}/>
                  </View> 
                  <Text style={style.addPlayerText}>Lisää pelaaja</Text>
                </Pressable>
              </View> */}

              {/* Button for enrolment */}
              {/* Lisätään vaihtoehto pressableen: yhdellä pelaajalla teksti "Ilmoittaudu",
              kahdella tai useammalla pelaajalla teksti: "Ilmoita x pelaajaa". x:n tilalle pelaajien määrä*/}
              <Pressable onPress={handleEnrollment} 
                style={[style.enrolButton, style.button]}>
                <Text style={style.buttonText}>Ilmoittaudu</Text>
              </Pressable>

              </View>
          </View>

              {/* Modal for showing enrolment summary */}
              <Provider>
                <Portal>
                  <Modal visible={visible} contentContainerStyle={style.modalContainer}>
                    <Text style={style.modalTitle}>Kiitos{'\n'}ilmoittautumisesta!</Text>
                    <View style={style.modal}>
                      <Text style={style.summaryTitle}>ViikkoBiitsi</Text>

                      {/* Game to which the enrolment has been done */}
                      <View style={style.summaryDetails}>
                        <Icon.Clock style={style.summaryIcons}/>
                        {chosenGame ? <Text style={style.text}>ViikkoBiitsi {getGameTitle(chosenGame)}</Text> : null}
                      </View>

                      {/* The players which were enrolled */}
                      <View style={style.summaryDetails}>
                        <Icon.Users style={style.summaryIcons}/>
                        {playersToEnroll ? <Text style={style.text}>{playersToEnroll.name} 
                          {"\n"}Ranking: {playersToEnroll.ranking}</Text> : null}
                      </View>

                      {/* Predicted ranking for the chosen game */}
                      <View>
                        <FlatList 
                          data={enrolledPlayers}
                          renderItem={Player}
                          keyExtractor={item => item.id}
                        />
                      </View>

                      <View style={style.buttonSummaryStyles}>
                        <Pressable onPress={() => navigation.navigate('Home')} 
                            style={[style.summaryButton]}>
                            <Text style={style.buttonText}>Sulje</Text>
                          </Pressable>

                        <Pressable onPress={hideModal} 
                          style={[style.summaryButton]}>
                          <Text style={style.buttonText}>Lisää pelaaja</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </Portal>
              </Provider>
      </SafeAreaView>
    </ImageBackground>
  );

}

export default Enrolment; 