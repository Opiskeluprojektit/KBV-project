import { SafeAreaView, FlatList, Text, View, Pressable, Button, ImageBackground } from 'react-native';
import React, { useState, useEffect} from 'react';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { List, TextInput } from 'react-native-paper';

function Enrolment({ navigation: { goBack } }) {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(DATA);
  }, [])

  const backgroundImage = require('../assets/Volleyball1.jpg');

/*   Alla oleva DATA rakennettu vain testikäyttöön, 
  jotta voi tarvittaessa testata searchbarin toimivuutta
  jollakin datalla */
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

    const executeSearch = (search) => {
      const searchArray = DATA.filter((item) => item.name.includes(search));
      setItems(searchArray);
    }
  
  return (
    <ImageBackground source={backgroundImage} imageStyle={{opacity:0.5}}>
      <SafeAreaView style={style.container}>
          <View style={style.header}>
          <Pressable onPress={() => goBack()}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
          </View>

          <View style={style.viewContainer}>
              {/* Dropdown pelipäivän valinnalle */}
              <Text style={style.text}>Valitse peli</Text>
              <List.Section>
                <List.Accordion
                  title="Miehet 1.6.2023"
                  style={style.search}>
                  <List.Item title="Naiset 7.6.2023" />
                  <List.Item title="Miehet 8.6.2023" />
                </List.Accordion>
              </List.Section>

              {/* FlatList pelaajan valinnalle */} 
              <Text style={style.text}>Valitse pelaaja</Text>
              <TextInput
                label="Haku"
                value={search}
                onChangeText={text => setSearch(text)}
                returnKeyType="search"
                onSubmitEditing={() => executeSearch(search)}
              />
              <FlatList
                data={items}
                renderItem={renderItem}
                key={item => item.id}
              />
              
              
              {/* Päivitetään alla olevaan uusi tyyli iconille? */}
              <Pressable onPress={() => goBack()}><View style={[style.iconsEllipse]}><Icon.Plus style={[style.addPlayer]}/></View> 
              <Text style={style.text}>Lisää pelaaja</Text></Pressable>

              <Pressable onPress={() => goBack()} style={[style.enrolButton, style.button]}>
                <Text style={style.buttonText}>Ilmoittaudu</Text>
              </Pressable>

              <View style={style.predictedRanking}>
              <Text style={style.text}>Ennustettu lohko</Text>
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