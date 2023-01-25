import React, { useState } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Alert } from 'react-native';
import { TextInput, List, Portal, Provider, Modal } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { database, PLAYER_REF } from '../../firebase/Config';
import {ref, push} from 'firebase/database';




function AdminPlayers({ navigation }) {
   const backgroundImage = require('../../assets/Volleyball50.png'); 


   const [division, setDivision] = useState('');
   const [divisionExpand, setDivisionsExpand] = useState(false)

   const [player, setPlayer] = useState('');
   const [ranking, setRanking] = useState(0);

   const [visibleFirst, setVisibleFirst] = useState(false);


   const selectDivision = (div) => {
    setDivisionsExpand(!divisionExpand);
    setDivision(div);
  };

  const addPlayer = () => {
    if (division && player) {
        push(ref(database, PLAYER_REF), {
            division: division,
            name: player,
            ranking: ranking
        }).then(showModal);
    } else {
        Alert.alert("Muista täyttää pelaajan nimi ja sarja!")
    }
  }


  const showModal = () => setVisibleFirst(true);

  const hideModal = () => {
    setVisibleFirst(false);
    setDivision('');
    setPlayer('');
  }


    return (
        <>
        <ImageBackground source={backgroundImage}>
            <SafeAreaView>

                {/* Header: Go back button and Menu */}
                <View style={style.header}>
                    <Pressable onPress={() => navigation.navigate('AdminNav')}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
                    <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
                </View>



                <View style={style.viewContainer}>
                    <View style={style.contentOnLightBG}>
                        <Text style={[style.h4Style, style.adminHeader]}>Lisää tai muokkaa pelaajia</Text>
                    </View>


                    <Text style={style.menuContent}>Lisää pelaaja</Text>


                    {/* Insert player name and division */}

                    <View style={style.adminAddView}>
                    <TextInput 
                            label="Pelaajan nimi"
                            style={style.adminAddPlayer}
                            returnKeyType="next"
                            underlineColor={'#1B1B1B'}
                            activeUnderlineColor={'#005C70'}
                            maxLength={50}
                            value={player}
                            onChangeText={setPlayer}
                            />

                    <Pressable onPress={addPlayer} style={style.adminAddButton}>
                        <Text style={style.adminTextBg}>Lisää</Text>
                    </Pressable>

                    </View>

                    {/* Select division */}

                    <List.Accordion

                        title={division ? division : "Sarjavalikko"}
                        style={[style.search, style.adminCheck, style.adminShadow]}
                        theme={{
                        colors: { background: "#F9F9F9", primary: "#005C70" },
                        }}
                        expanded={divisionExpand}
                        onPress={() => setDivisionsExpand(!divisionExpand)}
                        > 

                        <List.Item
                        style={[style.adminSelect, style.adminShadow]}
                        title="Naiset"
                        onPress={() => selectDivision("Naiset")}
                        />
                        <List.Item
                        style={[style.adminSelect, style.adminShadow]}
                        title="Miehet"
                        onPress={() => selectDivision("Miehet")}
                        />
                        <List.Item
                        style={[style.adminSelect, style.adminShadow]}
                        title="Tytöt"
                        onPress={() => selectDivision("Tytöt")}
                        />
                        <List.Item
                        style={[style.adminSelect, style.adminShadow]}
                        title="Pojat"
                        onPress={() => selectDivision("Pojat")}
                        />
                    </List.Accordion>



                    <Text style={style.menuContent}>Muokkaa pelaajia</Text>

                    <ScrollView style={style.adminScroll}>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                        <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View>

                    </ScrollView>

                </View>



                {/* First modal */}

                
                <Provider>
                    <Portal>
                        <Modal visible={visibleFirst} contentContainerStyle={style.modalContainer}>
                            <Text style={style.modalTitle}>Tapahtuma luotu</Text>

                            <View style={[style.buttonSummaryStyles, style.adminModal]}>

                                <Pressable onPress={hideModal} 
                                style={[style.summaryButton]}>
                                <Text style={style.buttonText}>Lisää uusi tapahtuma</Text>
                                </Pressable>
                            </View>

                        </Modal>
                    </Portal>
                </Provider>


            </SafeAreaView>
        </ImageBackground>
        </>
    );

}

export default AdminPlayers