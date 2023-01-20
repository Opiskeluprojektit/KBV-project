import React, { useState } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform } from 'react-native';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";




function AdminPlayers({ navigation }) {
   const backgroundImage = require('../../assets/Volleyball50.png'); 

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

                </View>




            </SafeAreaView>
        </ImageBackground>
        </>
    );

}

export default AdminPlayers