import React from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView } from 'react-native';
import { List, TextInput, Modal, Portal, Provider, Button } from 'react-native-paper';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'


const backgroundImage = require('../assets/Volleyball100.png');

function Admin({ navigation }) {
    const [division, setDivision] = useState()
    const [divisionExpand, setDivisionsExpand] = useState(false)

    const [date, setDate] = useState(new Date);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Tyhjä');

    const [desc, setDesc] = useState('');

    
    const [shouldShow, setShouldShow] = useState(false);


    function showItems() {
        setShouldShow(!shouldShow)
        onChange()
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '.' + (tempDate.getMonth() + 1) + '.' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        setText(fDate + ', ' + fTime)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const selectDivision = (div) => {
        setDivisionsExpand(!divisionExpand);
        setDivision(div);
      };

    const addEvent = () => {
        console.log()
    }

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
                        <Text style={[style.h4Style, style.adminHeader]}>Admin paneeli</Text>
                    </View>


                    {/* Creating an event */}

                    <Text style={style.menuContent}>Luo tapahtuma</Text>

                    {/* Select division for the event */}

                    <List.Accordion

                        title={division ? division : "Sarjavalikko"}
                        style={[style.search, style.adminBox]}
                        theme={{
                        colors: { background: "#F9F9F9", primary: "#005C70" },
                        }}
                        expanded={divisionExpand}
                        onPress={() => setDivisionsExpand(!divisionExpand)}
                        > 

                        <List.Item
                        style={style.adminSelect}
                        title="Naiset"
                        onPress={() => selectDivision("Naiset")}
                        />
                        <List.Item
                        style={style.adminSelect}
                        title="Miehet"
                        onPress={() => selectDivision("Miehet")}
                        />
                        <List.Item
                        style={style.adminSelect}
                        title="Tytöt"
                        onPress={() => selectDivision("Tytöt")}
                        />
                        <List.Item
                        style={style.adminSelect}
                        title="Pojat"
                        onPress={() => selectDivision("Pojat")}
                        />
                        <List.Item
                        style={style.adminSelect}
                        title="Muut"
                        onPress={() => selectDivision("Muut")}
                        />
                    </List.Accordion>

                    {/* Date and time picker */}

                        <View>
                            <Pressable onPress={() => showItems()} style={[style.search, style.adminBox]}> 
                            <Text style={style.adminText}>Tapahtumapäivä</Text>
                            <Text style={style.adminText}>{text}</Text>
                            </Pressable>
                            {shouldShow ? 
                            (
                                <View style={style.datePickerContainer}>
                                <DateTimePicker
                                    testID='dateTimePicker'
                                    style={{marginBottom: "5%"}}
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display='default'
                                    onChange={onChange} />

                                <DateTimePicker
                                    testID='dateTimePicker'
                                    value={date}
                                    mode={'time'}
                                    is24Hour={true}
                                    display='default'
                                    onChange={onChange} />


                                </View>
                            ) : null}

                        </View>


                    {/* Description */}
                
                        <View>
                            <TextInput 
                            style={style.adminDesc}
                            placeholder="Kuvaus..."
                            maxLength={100}
                            numberOfLines={2}
                            onChangeText={setDesc}
                            >

                            </TextInput>
                        </View>

                        <View>
                        <Pressable onPress={addEvent} 
                            style={[style.enrolButton, style.button, style.adminButton]}>
                            <Text style={style.buttonText}>Luo tapahtuma</Text> 
                         </Pressable>
                        </View>



                </View>




            </SafeAreaView>
        </ImageBackground>
        </>
    );

}

export default Admin