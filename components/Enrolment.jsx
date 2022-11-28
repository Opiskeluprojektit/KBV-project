import { SafeAreaView, FlatList, Text, View, Pressable, Button, ImageBackground } from 'react-native';
import React from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";

function Enrolment({ navigation: { goBack } }) {

  const backgroundImage = require('../assets/Volleyball1.jpg');

  const DATA = [
    {
      id: '1',
      name: 'First name',
    },
    {
      id: '22',
      name: 'Second name',
    },
    {
      id: '333',
      name: 'Third name',
    },
  ];
  
  const Item = ({ name }) => (
    <View>
      <Text>{name}</Text>
    </View>
  );
  
    const renderItem = ({ item }) => (
      <Item name={item.name} />
    );
  
  return (
    <ImageBackground source={backgroundImage} imageStyle={{opacity:0.5}}>
      <SafeAreaView>
          <View style={style.container}>
          <Pressable onPress={() => goBack()}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
          </View>

          <View style={style.viewContainer}>
              {/* Dropdown pelipäivän valinnalle */}
              <Text style={style.text}>Valitse peli</Text>

              {/* FlatList pelaajan valinnalle */} 
              <Text style={style.text}>Valitse pelaaja</Text>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
              
              
              {/* Päivitetään alla olevaan uusi tyyli iconille? */}
              <Pressable onPress={() => goBack()}><View style={[style.iconsEllipse]}><Icon.Plus style={[style.addPlayer]}/></View> 
              <Text style={style.text}>Lisää pelaaja</Text></Pressable>

              <Pressable onPress={() => goBack()} style={[style.enrolButton]}>
                <Text style={style.buttonText}>Ilmoittaudu</Text>
              </Pressable>

              <Text style={style.text}>Ennustettu lohko</Text>
              <View style={style.predictedRanking}>
                <Text style={style.text}>Pekka Pohjola</Text>
                <Text>Pekka Pohjola</Text>
                <Text>Pekka Pohjola</Text>
                <Text>Pekka Pohjola</Text>
                <Text>Pekka Pohjola</Text>
              </View>
          </View>
      </SafeAreaView>
    </ImageBackground>
  );

}

export default Enrolment; 