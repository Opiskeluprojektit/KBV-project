import React, { useState } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform } from 'react-native';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";




function AdminNav({ navigation }) {
   const backgroundImage = require('../../assets/Volleyball50.png'); 

    return (
        <>
        <ImageBackground source={backgroundImage}>
            <SafeAreaView>

                {/* Header: Go back button and Menu */}
                <View style={style.header}>
                    <Pressable onPress={() => navigation.navigate('Home')}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
                    <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
                </View>



                <View style={style.viewContainer}>
                    <View style={style.contentOnLightBG}>
                        <Text style={[style.h4Style, style.adminHeader]}>Admin navigaatio</Text>
                    </View>

                    <View style={style.homeButtonsContainer}>
                        <Pressable onPress={() => navigation.navigate('AdminEvents')} style={[style.homeButtons, style.button]}>
                        <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Calendar style={style.icons}/></View>
                        <Text style={style.bigButtonText}>Luo tapahtuma</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('AdminEditEvents')} style={[style.homeButtons, style.button]}>
                        <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Calendar style={style.icons}/></View>
                        <Text style={style.bigButtonText}>Muokkaa tapahtumia</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('AdminPlayers')} style={[style.homeButtons, style.button]}>
                        <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Users style={style.icons}/></View>
                        <Text style={style.bigButtonText}>Muokkaa pelaajia</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('AdminCodes')} style={[style.homeButtons, style.button]}>
                        <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Key style={style.icons}/></View>
                        <Text style={style.bigButtonText}>Muokkaa koodeja</Text>
                        </Pressable>
                    </View>

                </View>




            </SafeAreaView>
        </ImageBackground>
        </>
    );

}

export default AdminNav