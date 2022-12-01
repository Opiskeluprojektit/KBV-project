import { SafeAreaView, ScrollView, FlatList, Text, View, Pressable, Button, ImageBackground, TextInput } from 'react-native'; //TextInput lisätty ku herjas sitä
import React, { useState, useEffect} from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List } from 'react-native-paper';
import db from '../assets/testidata.json';

const dbPlayers = db.player;
const dbGames = db.game;

const backgroundImage = require('../assets/Volleyball1.jpg');

function Enrolment({ navigation }) {
  const [search, setSearch] = useState('');
  const [playersToShow, setPlayersToShow] = useState([]);
  const [playersToEnroll, setPlayersToEnroll] = useState([]);
  const [chosenGame, setChosenGame] = useState();
  const [gamesToShow, setGamesToShow] = useState(dbGames);
  const [gamesExpanded, setGamesExpanded] = useState(false);

  const gameList = gamesToShow.map(i => <List.Item key={i.id} title={i.division + " " + i.date} onPress={() => selectGame(i)} />);

  const selectGame = (i) => {
    setGamesExpanded(!gamesExpanded);
    setChosenGame(i)
  }
  
  //The component that the FlatList component uses to print it's items.
  const Item = ({ name }) => (
      <Text>{name}</Text>
  );
  
  //The function that the FlatList component uses to print it's items.
  const renderItem = ({ item }) => (
    <Item name={item.name} />
  );

  const executeSearch = (search) => {
    setSearch(search);
    const searchArray = search.length > 0
      ? db.player.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()
      && chosenGame.division == dbPlayers.division)
      ) : [];
    setPlayersToShow(searchArray);
  }
  
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
                <Text style={style.text}>Valitse peli</Text>
                <List.Section>
                  <List.Accordion
                    title={chosenGame ? chosenGame.division + " " + chosenGame.date : "Pelit"}
                    style={style.search}
                    expanded={gamesExpanded}
                    onPress={() => setGamesExpanded(!gamesExpanded)} >
                      
                    {gameList}
                  </List.Accordion>
                </List.Section>

                {/* FlatList pelaajan valinnalle */} 
                <Text style={style.text}>Valitse pelaaja</Text>
                <TextInput
                  label="Haku"
                  value={search}
                  style={style.search}
                  onChangeText={text => executeSearch(text)}
                  returnKeyType="search"
                  onSubmitEditing={() => executeSearch(search)}
                  placeholder="   Haku" 
                />
                <FlatList
                  data={playersToShow}
                  renderItem={renderItem}
                  key={i => i.id}
                />
                
                
                {/* Lisätään error-modal, jos yrittää painaa Lisää pelaaja,
                eikä ole lisännyt peliä ja pelaajaa täytössä olevalle pelaajalle */}
                {/* Päivitetään alla olevaan uusi tyyli iconille? */}
                <View style={style.addPlayer}>
                  <Pressable onPress={() => goBack()}>
                    <View style={[style.iconsEllipse]}>
                      <Icon.Plus style={style.icons}/>
                    </View> 
                    <Text style={style.text}>Lisää pelaaja</Text>
                  </Pressable>
                </View>

                {/* Lisätään vaihtoehto pressebleen: yhdellä pelaajalla teksti "Ilmoittaudu",
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