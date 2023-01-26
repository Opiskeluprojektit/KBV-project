import React, { useState, useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform } from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, ref } from 'firebase/database';
import { PLAYER_REF, database } from '../../firebase/Config';




function AdminEditPlayers({ navigation }) {
   const backgroundImage = require('../../assets/Volleyball50.png'); 

   const [players, setPlayers] = useState([]);


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
                <Pressable onPress={() => console.log(item.ID, item.name, item.division, item.ranking)} style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
            </View>
        );
    })



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




            </SafeAreaView>
        </ImageBackground>
        </>
    );

}

export default AdminEditPlayers