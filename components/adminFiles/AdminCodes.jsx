import React, { useState, useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform, Alert } from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, push, ref, set, update } from 'firebase/database';
import { database, ADMIN_REF } from '../../firebase/Config';




function AdminCodes({ navigation }) {
   const backgroundImage = require('../../assets/Volleyball50.png'); 


    const [bonus, setBonus] = useState(5);
    const [tempBonus, setTempBonus] = useState();
    const [changed, setChanged] = useState(false);

    // Fetching admin code for admin login

    useEffect(() => {
        const variables = ref(database, ADMIN_REF + "variables");
        onValue(variables, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : {};
            const codeItems = {...data};
            const parse = JSON.parse(JSON.stringify(codeItems))
            setBonus(parse.bonuskerroin)
            setTempBonus(parse.bonuskerroin.toString())
        });
    }, [])

    // Pushing Changed data to database

    const pushDb = () => {
        let tbonus = Number(tempBonus)
        
        if (bonus !== tbonus) {
            setBonus(Number(tempBonus))
            setChanged(true)
            update(ref(database, ADMIN_REF + "variables"), {
                bonuskerroin: tbonus
            })
        }

        if (bonus !== tbonus) {
            Alert.alert("Tiedot tallennettu!")
        } else {
            Alert.alert("Tietoja ei ole muutettu!")
        }


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
                        <Text style={[style.h4Style, style.adminHeader]}>Muokkaa bonuskerrointa</Text>
                    </View>


                    <View style={{alignItems: 'center'}}>
                    <TextInput 
                            label="Bonuskerroin"
                            style={style.adminEditCode}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            underlineColor={'#1B1B1B'}
                            activeUnderlineColor={'#005C70'}
                            maxLength={4}
                            value={tempBonus}
                            onChangeText={setTempBonus}
                            />
                    </View>

                    <View>
                        <Pressable onPress={() => pushDb()}
                            style={({pressed})=>[{opacity: pressed ? 0.9 : 1,}, style.enrolButton, style.button, style.adminButton, {marginTop:40}]}>
                            <Text style={style.buttonText}>Tallenna</Text> 
                         </Pressable>
                     </View>

                     <View style={style.infoText}>
                        <Text style={[{fontSize: 20, textAlign: 'center'}]}>
                            Sisäänkirjautumiskoodit tulee muokata tietokannan kautta!
                        </Text>
                     </View>

                
                </View>




            </SafeAreaView>
        </ImageBackground>
        </>
    );

}

export default AdminCodes