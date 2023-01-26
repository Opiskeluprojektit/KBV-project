import React, { useState, useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform } from 'react-native';
import { TextInput, List, Provider, Portal, Modal } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, ref } from 'firebase/database';
import { PLAYER_REF, database } from '../../firebase/Config';




function AdminEditPlayers({ navigation }) {
    const backgroundImage = require('../../assets/Volleyball50.png'); 

    const [players, setPlayers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [divisionExpand, setDivisionsExpand] = useState(false)

    const [dbId, setDbId] = useState('');
    const [name, setName] = useState('');
    const [division, setDivision] = useState('');
    const [ranking, setRanking] = useState(0);


   useEffect(() => {
    const events = ref(database, PLAYER_REF);
    onValue(events, (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : {};
        const playerItems = {...data};
        const keys = Object.keys(playerItems);
        let parseKeys = keys.map((key) => {
            return { ...playerItems[key], ID: key };
        })
        setPlayers(parseKeys);
    })
}, [])


    const allPlayers = players.map((item) => {
        return (
            <View key={item.ID} style={style.adminEventList}>
                <Text style={style.adminEventTitle}>{item.name} / {item.division}</Text>
                <Pressable onPress={() => showModal(item.id, item.name, item.division, item.ranking)} style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
            </View>
        );
    })

    const showModal = (id, name, div, rank) => {
        setVisible(true)
        setDbId(id)
        setName(name)
        setDivision(div)
        setRanking(Number(rank))
       };

    const hideModal = () => {
    setVisible(false);
    }

    const selectDivision = (div) => {
        setDivisionsExpand(!divisionExpand);
        setDivision(div);
    };



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
                        <Text style={[style.h4Style, style.adminHeader]}>Muokkaa pelaajia</Text>
                    </View>

                    <ScrollView style={style.adminScroll}>

                        {allPlayers}

                        {/* <View style={style.adminEventList}>
                            <Text style={style.adminEventTitle}>Pelaaja esimerkki</Text>
                            <Pressable style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                        </View> */}

                        

                    </ScrollView>

                </View>


            <Provider>
                <Portal>
                    <Modal visible={visible} contentContainerStyle={style.modalContainer}
                            style={ !divisionExpand ? {marginTop: "-60%"} : { marginTop: 0 } }
                            >
                        <Text style={[style.modalTitle, {marginBottom: 10}]}>Muokkaa pelaajaa</Text>

                            <View style={style.adminModalView}>

                                <TextInput 
                                label="Pelaajan nimi"
                                style={style.adminEditPlayer}
                                returnKeyType="next"
                                underlineColor={'#1B1B1B'}
                                activeUnderlineColor={'#005C70'}
                                maxLength={50}
                                value={name}
                                onChangeText={setName}
                                />


                                <List.Accordion

                                    title={division ? division : "Sarjavalikko"}
                                    style={[style.search, style.adminBox, {marginTop: 5}]}
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


                                <Text style={[style.adminModalText, {marginBottom: 10}]}>Ranking:</Text>

                                <TextInput
                                style={style.adminEditRanking}
                                returnKeyType="done"
                                keyboardType='number-pad'
                                underlineColor={'#1B1B1B'}
                                activeUnderlineColor={'#005C70'}
                                maxLength={3}
                                value={ranking}
                                onChange={setRanking}
                                />

                            </View>



                            <View style={[style.buttonSummaryStyles, style.adminModalButtons]}>

                                <Pressable onPress={() => hideModal()} 
                                style={[style.summaryButton]}>
                                <Text style={style.buttonText}>Tallenna</Text>
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

export default AdminEditPlayers