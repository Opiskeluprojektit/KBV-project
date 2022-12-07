import { SafeAreaView, ScrollView, FlatList, Text, View, Pressable, Button, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect} from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List, TextInput } from 'react-native-paper';
import db from '../assets/testidata.json';
import {database} from '../firebase/Config';
import {onValue, ref} from 'firebase/database';
import { MyDate, formatDMYtoYMD } from '../scripts/myDate';


const dbPlayers = JSON.parse(JSON.stringify(db.player));
const sortedDBGames = JSON.parse(JSON.stringify(db.game))
.map((i) => {
  i.date = new MyDate(formatDMYtoYMD(i.date));
  return i;
})
.filter((i) => i.date >= new Date())
.sort((a, b) => a.date - b.date);

const backgroundImage = require('../assets/Volleyball100.png');

function Enrolment({ navigation }) {
  const [search, setSearch] = useState('');
  const [playersToShow, setPlayersToShow] = useState([]);
  const [playersToEnroll, setPlayersToEnroll] = useState([]);
  const [chosenGame, setChosenGame] = useState();
  const [gamesToShow, setGamesToShow] = useState(sortedDBGames);
  const [gamesExpanded, setGamesExpanded] = useState(false);

// Firebase tietokannan testaamiseen liittyvää
  const [gamestest, setGamestest] = useState();
  const [playertest, setPlayertest] = useState();

  // Hakee pelien tiedot firebase tietokannasta
  useEffect(() => {
    const games = ref(database,"game/");
    onValue(games, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const gameItems = {...data};
      setGamestest(gameItems);
    });
  },[]);
  
  // Hakee pelaajien tiedot firebase tietokannasta
  useEffect(() => {
    const players = ref(database,"player/");
    onValue(players, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const playerItems = {...data};
      setPlayertest(playerItems);
    });
  },[]);
  
  console.log(gamestest)
  

  const selectGame = (i) => {
    setGamesExpanded(!gamesExpanded);
    setChosenGame(i)
  }
  
  //The component that the FlatList component uses to print it's items.
  const Item = ({ name }) => (
      <Text>{name}</Text>
  );
  
  //The function that the FlatList component uses to print it's items.
/*   const renderItem = ({ item }) => (
    <Item name={item.name} />
  ); */

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

  const selectPlayer = (player) => {
    console.log("pelaaja valittu: ", name);
    // setPlayersToShow[""];
    const newPlayersToEnroll = playersToEnroll.concat(player);
    setPlayersToEnroll(player);
    //setSearch(name)
  }
    
  const getGameTitle = (i) => {
    return i.division + " " + (i.date.getDate() + 1) + "." + (i.date.getMonth() + 1) + "." + i.date.getFullYear();
  }
  const gameList = gamesToShow.map(i => <List.Item key={i.id} title={getGameTitle(i)} onPress={() => selectGame(i)} />);


  return (
    <ImageBackground source={backgroundImage}>
      <SafeAreaView>
      
          {/* Header: Go back -painike ja Menu */}
          <View style={style.header}>
            <Pressable onPress={() => navigation.navigate('Home')}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
            <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
          </View>

          <View style={style.viewContainer}>
            <View style={style.contentOnLightBG}>
              <Text style={style.h4Style}>Ilmoittautuminen viikkokisaan</Text>
  
              {/* Dropdown pelipäivän valinnalle */}
              <Text style={style.titles}>Valitse peli</Text> 
              <List.Section>
                <List.Accordion
                  title={chosenGame ? getGameTitle(chosenGame) : null}
                  style={style.search}
                  expanded={gamesExpanded}
                  onPress={() => setGamesExpanded(!gamesExpanded)} >
                    
                  {gameList}
                </List.Accordion>
              </List.Section>

              {/* FlatList pelaajan valinnalle */}
              {chosenGame ? <><Text style={style.titles}>Valitse pelaaja</Text>
                <TextInput
                  label="Haku"
                  value={search}
                  style={style.search}
                  onChangeText={text => executeSearch(text)}
                  returnKeyType="search"
                  onSubmitEditing={() => executeSearch(search)}
                />
                <FlatList
                  data={playersToShow}
                  // renderItem={renderItem} 
                  renderItem={({item}) => <Pressable onPress={() => selectPlayer(item)}><Item name={item.name} /></Pressable>}
                  key={i => i.id}
                  //onPress={() => selectPlayer(i.id)}
                  //onSubmitEditing={() => selectPlayer(i.id)}
                /></>
              : null}         
              
              {/* Päivitetään alla olevaan uusi tyyli iconille? */}
              <View style={style.addPlayer}>
                <Pressable style={{flexDirection: "row"}} onPress={() => console.log("pelaaja valittu")}>
                  <View style={[style.iconsEllipse2]}>
                    <Icon.Plus style={style.icons}/>
                  </View> 
                  <Text style={style.titles}>Lisää pelaaja</Text>
                </Pressable>
              </View>

              {/* Lisätään vaihtoehto pressableen: yhdellä pelaajalla teksti "Ilmoittaudu",
              kahdella tai useammalla pelaajalla teksti: "Ilmoita x pelaajaa". x:n tilalle pelaajien määrä*/}
              <Pressable onPress={() => navigation.navigate('SummaryEnrolment')} 
                style={[style.enrolButton, style.button]}>
                <Text style={style.buttonText}>Ilmoittaudu</Text>
              </Pressable>

              

                {/* Tähän voi tehdä ennustetun lohkon, jos se tehdään */}
{/*               <View style={style.predictedRanking}>
              <Text style={style.text}>Ennustettu lohko</Text>
                <Text style={style.text}>Pekka Pohjola</Text>
                <Text style={style.text}>Pekka Ojala</Text>
                <Text style={style.text}>Matti Meikäläinen</Text>
                <Text style={style.text}>Martti Meikäläinen</Text>
                <Text style={style.text}>Esa Esimerkki</Text>
              </View> */}

            </View>
          </View>
      </SafeAreaView>
    </ImageBackground>
  );

}

export default Enrolment; 