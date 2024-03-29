import React, { useState, useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Alert } from 'react-native';
import { TextInput, List, Provider, Portal, Modal } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, ref, set, remove, update } from 'firebase/database';
import { PLAYER_REF, database } from '../../firebase/Config';

function AdminEditPlayers({ navigation }) {
    const backgroundImage = require('../../assets/Volleyball50.png'); 

    const [players, setPlayers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [divisionExpand, setDivisionsExpand] = useState(false)

    const [dbId, setDbId] = useState('');
    const [name, setName] = useState('');
    const [division, setDivision] = useState('');
    const [ranking, setRanking] = useState();
    const [year, setYear] = useState(new Date().getFullYear())

    const [filterDiv, setFilterDiv] = useState('Kaikki');
    const [filterExpand, setFilterExpand] = useState();

    // fetch all players

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

    useEffect(() => {
        console.log(ranking)
    }, [ranking])

    // function to create filter for players by division
    
    const createFilter = () => {
        let data = players
        if (filterDiv !== 'Kaikki') {
            data = data.filter((div) => div.division == filterDiv).map(({ID, name, division}) => ({ID, name, division}));
        }
        data.sort((a, b) => a.name - b.name)
        return data;
    }

    // function to map all players in to list

    const allPlayers = createFilter().map((item) => {
        return (
            <View key={item.ID} style={style.adminEventList}>
                <Text style={style.adminEventTitle}>{item.name} {"\n"} {item.division}</Text>
                <Pressable onPress={() => showModal(item.ID, item.name, item.division, item.ranking)} 
                            style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.adminEventButton]}>
                    <Text style={style.adminTextBg}>Muuta</Text>
                </Pressable>
            </View>
        );
    })

    // function to show player editing modal

    const showModal = (id, name, div, rank) => {
        setVisible(true)
        setDbId(id)
        setName(name)
        setDivision(div)
        console.log("ranking", rank[year]);
        setRanking(rank[year].toString())
       };

    // function to hide modal

    const hideModal = () => {
    setVisible(false);
    }

    // function to set selected division for filter

    const selectDivision = (div) => {
        setDivisionsExpand(!divisionExpand);
        setDivision(div);
    };

    // function to either execute deleting a player or saving changes to database

    const submitModal = (check) => {
        if (check === "delete") {
            confirmDelete()
        } 
        if (check === "submit") {
            if (name && division && ranking) {
                setRanking(Number(ranking))
                update(ref(database, PLAYER_REF + dbId), {
                    name: name,
                    division: division,
                    ranking: {[year]: Number(ranking)}
                }).then(hideModal())
            } else {
                Alert.alert("Huom!", "Muista täyttää pelaajan nimi, sarja sekä ranking")
            }
        }
    }

    // function to confirm player delete

    const confirmDelete = () =>
            Alert.alert('Huomio!', 'Haluatko varmasti poistaa pelaajan', [
                {
                    text: 'Peruuta',
                    onPress: () => executeDelete(false),
                    style: 'cancel',
                },
                {text: 'Kyllä', onPress: () => executeDelete(true)},
        ]);

    // function to execute player deletion

    const executeDelete = (ans) => {
        if (ans === true) {
            remove(ref(database, PLAYER_REF + dbId)).then(hideModal(), Alert.alert("Pelaaja poistettu"))
        } else {
            console.log("ei poistettu")
        }
    }

    // function to set selected filter
    
    const selectFilter = (fil) => {
        setFilterDiv(fil)
        setFilterExpand(!filterExpand)
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
                        <Text style={[style.h4Style, style.adminHeader, {marginBottom: 15}]}>Muokkaa pelaajia</Text>
                    </View>
                    <View>
                        <List.Accordion
                            title={filterDiv ? filterDiv : "Filtteröi Pelaajia"}
                            style={[style.search, style.adminBox]}
                            theme={{
                            colors: { background: "#F9F9F9", primary: "#005C70" },
                            }}
                            expanded={filterExpand}
                            onPress={() => setFilterExpand(!filterExpand)}
                            > 
                            <List.Item
                                style={[style.adminSelect, style.adminShadow, {width: "80%", marginBottom: 6}]}
                                title="Kaikki"
                                onPress={() => selectFilter("Kaikki")}
                            />
                            <List.Item
                                style={[style.adminSelect, style.adminShadow, {width: "80%", marginBottom: 6}]}
                                title="Naiset"
                                onPress={() => selectFilter("Naiset")}
                            />
                            <List.Item
                                style={[style.adminSelect, style.adminShadow, {width: "80%", marginBottom: 6}]}
                                title="Miehet"
                                onPress={() => selectFilter("Miehet")}
                            />
                            <List.Item
                                style={[style.adminSelect, style.adminShadow, {width: "80%", marginBottom: 6}]}
                                title="Tytöt"
                                onPress={() => selectFilter("Tytöt")}
                            />
                            <List.Item
                                style={[style.adminSelect, style.adminShadow, {width: "80%", marginBottom: 6}]}
                                title="Pojat"
                                onPress={() => selectFilter("Pojat")}
                            />
                        </List.Accordion>
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
                        <View> 
                            <Text style={[style.modalTitle, {marginBottom: 25, marginTop: 25, marginRight: 25}]}>Muokkaa Pelaajaa</Text>
                            <Pressable onPress={() => hideModal()} style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.adminModalExit]}>
                            <Icon.X style={style.adminExitIcon}/>
                            </Pressable>
                        </View>
                        <View style={style.adminModalView}>
                        <Text style={[style.adminModalText, {marginBottom: 0, marginLeft: "4%"}]}>Pelaajan nimi:</Text>
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
                            <Text style={[style.adminModalText, {marginBottom: 5, marginLeft: "4%"}]}>Sarjavalikko:</Text>
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
                            <Text style={[style.adminModalText, {marginBottom: 5, marginLeft: "4%"}]}>Ranking:</Text>
                            <TextInput
                                style={style.adminEditRanking}
                                returnKeyType="done"
                                keyboardType='number-pad'
                                underlineColor={'#1B1B1B'}
                                activeUnderlineColor={'#005C70'}
                                maxLength={5}
                                value={ranking}
                                onChangeText={setRanking}
                            />
                        </View>
                            <View style={[style.buttonSummaryStyles, style.adminModalButtons]}>
                                <Pressable onPress={() => submitModal("delete")} 
                                    style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.summaryButton]}>
                                    <Text style={style.adminDeleteButton}>Poista</Text>
                                </Pressable>
                                <Pressable onPress={() => submitModal("submit")} 
                                style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.summaryButton]}>
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