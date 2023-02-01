import { SafeAreaView,  FlatList, Text, View, Pressable, Alert, 
  Button, ImageBackground, Keyboard } from 'react-native';
import React, { useState, useEffect} from 'react';
import { style } from '../styles/styles';
import { formatDMYtoYMD } from '../scripts/myDate';
import * as Icon from "react-native-feather";
import { List, TextInput, Modal, Portal, Provider } from 'react-native-paper';
import {database, enrolment_ref} from '../firebase/Config';
import {onValue, ref, update, child, push} from 'firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

const backgroundImage = require('../assets/Volleyball100.png');

function Enrolment({ navigation }) {
  
  // Games shown in dropdown list
  const [gamesToShow, setGamesToShow] = useState([]);
  const [gamesExpanded, setGamesExpanded] = useState(false);

  // What game has been chosen from dropdown list
  const [chosenGame, setChosenGame] = useState();

  // Search for player and filtered players to show on flatlist
  const [search, setSearch] = useState('');
  const [playersToShow, setPlayersToShow] = useState([]);

  // Player to enroll and show in summary
  const [playersToEnroll, setPlayersToEnroll] = useState();
  const [enrolledPlayers, setEnrolledPlayers] = useState();

  // If summary enrolment modal visible or not
  const [visible, setVisible] = React.useState(false);

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
      let parseKeys = Object.values(parse).map((i) => {
        i.date = new Date(formatDMYtoYMD(i.date));
        return i;
      })
      .filter((i) => i.date >= new Date ())
      .sort((a, b) => a.date - b.date);
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

/*   useEffect(() => {
    checkModal() ? showModal() : null;
  }, [enrolledPlayers]) */

  //empties the playersearch bar if division is changed
  useEffect(() => {
    setSearch('');
    setPlayersToShow([]);
  }, [chosenGame])


    useEffect(() => {
    filterEnrolments()
  }, [chosenGame])
  
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
        ? player.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) &&
              (chosenGame.division === item.division  || chosenGame.division === "Muut")
          )
        : [];    
    setPlayersToShow(searchArray);
  };

  // Selecting the player from the flatlist
  const selectPlayer = (player) => {
    if (enrolledPlayers.find((i) => i.name === player.name)) {
      Alert.alert("Pelaaja on jo ilmoittautunut")
    } else {
      setPlayersToEnroll(player);
      setSearch(player.name);
      setPlayersToShow();
    }
  }
    
  // Converts the game date to specific form: dd.mm.yyyy
  const getGameTitle = (i) => {
    i.date = new Date(i.date)
    return i.division + " " + i.date.getDate() + "." + (i.date.getMonth() + 1) + "." + i.date.getFullYear();
  }  

  // Maps the game date list
   const gameList =  gamesToShow.map(i => <List.Item key={i.id} title={getGameTitle(i)} onPress={() => selectGame(i)} />);

  // Showing and hiding the summary modal
  const showModal = () => setVisible(true);
  
  const hideModal = () => {
    setVisible(false);
    setChosenGame();
    setPlayersToEnroll();
    setSearch();
  }

  const handleEnrollment = () => {
    if (checkModal()) {

      // Making a running id number for enrolments, making a enrolment item and enrolment key
      let enrolmentLength = enrolment.length + 1;
      const newEnrolment = {id: enrolmentLength, game_id: chosenGame.id, player_id: playersToEnroll.id};
      const newEnrolmentKey = push(child(ref(database), enrolment_ref)).key;

      // Push a new enrolment to the enrolments list. Which will later be filtered by the filterEnrolments() to get the enrolled player to show on the modal.
      newDbEnrolments.push(newEnrolment)
      const updates = {};
      updates[enrolment_ref + newEnrolmentKey] = newEnrolment;
      update(ref(database), updates);
      filterEnrolments()
      showModal();
      return;
    }
    else {
      Alert.alert("Tarkista peli- ja pelaajavalinnat!")
    }
  } 

  // Checking if game and player has been chosen
  function checkModal() {
    return chosenGame && playersToEnroll ? true : false;
  }

  // Filter enrolments to show the enrolled player on the modal
  const filterEnrolments = () => {
    let enrolmentsToChosenGame;
    let newEnrolledPlayers;
    chosenGame ? enrolmentsToChosenGame = newDbEnrolments.concat().filter(i => i.game_id == chosenGame.id) : null
    enrolmentsToChosenGame ? newEnrolledPlayers = player.concat().filter(i => enrolmentsToChosenGame.find(j => j.player_id === i.id)).sort((a,b) => b.ranking - a.ranking) : null
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
            <Pressable  style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.iconsEllipse]} onPress={() => navigation.navigate('Home')}>
              <View>
                <Icon.ChevronLeft style={[style.icons]}/>
              </View>
            </Pressable>
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
                  style={[style.search, {overflow: "hidden"}]}
                  theme={{colors: {background: '#F9F9F9', primary: '#005C70'}}}
                  expanded={gamesExpanded}
                  onPress={() => setGamesExpanded(!gamesExpanded)} >
                    <ScrollView style={{ maxHeight: "75%" }}>{gameList}</ScrollView>
                  {/* {gameList} */}
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
                   keyboardShouldPersistTaps='always' //keyboard wont hide before clicking back
                   style={style.flatList}
                   data={playersToShow}
                   renderItem={({item}) => 
                     <Pressable style={style.playerSearch}
                     onPress={() => selectPlayer(item)}>
                       <Item name={item.name} />
                     
                     </Pressable>}
                   key={item => item.id}
                 /></>
              : null}         
              
              {/* HIDDEN, not in use: Button for adding new player to enrol 
              pressing enrol button:
                This can be added later if necessary*/}
              {/* <View style={style.addPlayer}>
                <Pressable style={{flexDirection: "row"}} onPress={() => console.log("Lisää uusi pelaaja")}>
                  <View style={[style.iconsAddPlayer]}>
                    <Icon.Plus style={style.icons}/>
                  </View> 
                  <Text style={style.addPlayerText}>Lisää pelaaja</Text>
                </Pressable>
              </View> */}

              {/* Button for enrolment */}
              {/* If previously mentioned add new player button will be taken into use
              this text could be "Ilmoittaudu" if only one player is enrolled
              but changed to "Ilmoita x pelaajaa" if two or more player are been enrolled. 
              And instead of x there would be the amount of players */}
              <Pressable onPress={handleEnrollment} 
                style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.enrolButton, style.button]}>
                <Text style={style.buttonText}>Ilmoittaudu</Text> 
              </Pressable>
              </View>
          </View>

              {/* Modal for showing enrolment summary */}
              <Provider>
                <Portal>
                  {/* Thank you for enrolling */}
                  <Modal visible={visible} contentContainerStyle={style.modalContainer}>
                    <Text style={style.modalTitle}>Kiitos{'\n'}ilmoittautumisesta!</Text>
                    <View style={style.modal}>
                      <Text style={style.summaryTitle}>ViikkoBiitsi</Text>

                      {/* Game to which the enrolment has been done */}
                      <View style={style.summaryDetails}>
                        <Icon.Clock style={style.summaryIcons}/>
                        {chosenGame ? <Text style={style.text}>{getGameTitle(chosenGame)}</Text> : null}
                      </View>

                      {/* The player which was enrolled: their name and ranking */}
                      <View style={style.summaryDetails}>
                        <Icon.User style={style.summaryIcons}/>
                        {playersToEnroll ? <Text style={style.text}>{playersToEnroll.name} 
                          {"\n"}Ranking: {playersToEnroll.ranking}</Text> : null}
                      </View>

                      {/* Predicted ranking for the chosen game */}
                      <View>
                        <FlatList 
                          data={enrolledPlayers}
                          renderItem={Player}
                          keyExtractor={item => item.id}
                          style={{marginTop: 10}}
                        />
                      </View>

                      {/* Buttons for closing the modal and adding new player */}
                      <View style={style.buttonSummaryStyles}>
                        <Pressable onPress={() => navigation.navigate('Home')} 
                            style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.summaryButton]}>
                            <Text style={style.buttonText}>Sulje</Text>
                          </Pressable>

                        <Pressable onPress={hideModal} 
                          style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.summaryButton]}>
                          <Text style={style.buttonText}>Lisää uusi pelaaja</Text>
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