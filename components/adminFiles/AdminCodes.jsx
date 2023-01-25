import React, { useState } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform } from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";




function AdminCodes({ navigation }) {
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
                        <Text style={[style.h4Style, style.adminHeader]}>Muokkaa koodeja</Text>
                    </View>

                    <View style={style.adminAddView}>


                    <TextInput 
                            label="Yleiskoodi"
                            style={style.adminEditCode}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            underlineColor={'#1B1B1B'}
                            activeUnderlineColor={'#005C70'}
                            maxLength={50}
                            />

                    <TextInput 
                            label="Adminkoodi"
                            style={style.adminEditCode}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            underlineColor={'#1B1B1B'}
                            activeUnderlineColor={'#005C70'}
                            maxLength={50}
                            />

                    </View> 

                    <View>
                        <Pressable 
                            style={[style.enrolButton, style.button, style.adminButton, {marginTop:40}]}>
                            <Text style={style.buttonText}>Tallenna</Text> 
                         </Pressable>
                     </View>

                </View>




            </SafeAreaView>
        </ImageBackground>
        </>
    );

}

export default AdminCodes