import React, { useState, useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform, Alert } from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, push, ref, set, update } from 'firebase/database';
import { database, ADMIN_REF } from '../../firebase/Config';




function AdminCodes({ navigation }) {
   const backgroundImage = require('../../assets/Volleyball50.png'); 


    const [code, setCode] = useState();
    const [adminCode, setAdminCode] = useState();
    const [tempCode, setTempCode] = useState();
    const [tempAdminCode, setTempAdminCode] = useState();
    const [bonus, setBonus] = useState(5);
    const [tempBonus, setTempBonus] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        const codes = ref(database, ADMIN_REF + "0");
        onValue(codes, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : {};
            const codeItems = {...data};
            const parse = JSON.parse(JSON.stringify(codeItems))
            setCode(parse.koodi)
            setAdminCode(parse.adminKoodi)
            setBonus(parse.bonuskerroin)
            setTempCode(parse.koodi.toString())
            setTempAdminCode(parse.adminKoodi.toString())
            setTempBonus(parse.bonuskerroin.toString())
        });
        
    }, [])


    // const submit = () => {
    //     setCode(Number(tempCode))
    //     setAdminCode(Number(tempAdminCode))
    //     setBonus(Number(tempBonus))
    //     pushDb()
    // }

    const pushDb = () => {
        let tcode = Number(tempCode)
        let tadcode = Number(tempAdminCode)
        let tbonus = Number(tempBonus)

        if (code !== tcode) {
            setCode(Number(tempCode))
            setChanged(true)
            update(ref(database, ADMIN_REF + "0"), {
                koodi: tcode
            })
        } 
        
        if (adminCode !== tadcode) {
            setAdminCode(Number(tempAdminCode))
            setChanged(true)
            update(ref(database, ADMIN_REF + "0"), {
                adminKoodi: tadcode
            })
        } 
        
        if (bonus !== tbonus) {
            setBonus(Number(tempBonus))
            setChanged(true)
            update(ref(database, ADMIN_REF + "0"), {
                bonuskerroin: tbonus
            })
        }

        if (code !== tcode || adminCode !== tadcode || bonus !== tbonus) {
            Alert.alert("Tiedot tallennettu!")
        } else {
            Alert.alert("Tietoja ei ole muutettu!")
        }

        

        // if (changed == true) {
        //     set(ref(database, ADMIN_REF + "0"), {
        //         koodi: code,
        //         adminKoodi: adminCode,
        //         bonuskerroin: bonus
        //     }).then(Alert.alert("Tiedot tallennettu!"))
        // }
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
                        <Text style={[style.h4Style, style.adminHeader]}>Muokkaa koodeja</Text>
                    </View>

                   

                    <View style={style.adminAddView}>


                    <TextInput 
                            label='Yleiskoodi'
                            style={style.adminEditCode}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            underlineColor={'#1B1B1B'}
                            activeUnderlineColor={'#005C70'}
                            maxLength={4}
                            value={tempCode}
                            onChangeText={setTempCode}
                            />

                    <TextInput 
                            label="Adminkoodi"
                            style={style.adminEditCode}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            underlineColor={'#1B1B1B'}
                            activeUnderlineColor={'#005C70'}
                            maxLength={4}
                            value={tempAdminCode}
                            onChangeText={setTempAdminCode}
                            />

                    </View> 

                    <View>
                    <TextInput 
                            label="Bonuskerroin"
                            style={[style.adminEditCode, {width: "30%"}]}
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