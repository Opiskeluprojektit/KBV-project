import React from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform, Alert } from 'react-native';
import { List, TextInput, Modal, Portal, Provider, Button } from 'react-native-paper';
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import { database, EVENT_REF } from '../../firebase/Config';
import {onValue, ref, update, child, push} from 'firebase/database';


const backgroundImage = require('../../assets/Volleyball50.png');

function AdminEvents({ navigation }) {
    const [division, setDivision] = useState()
    const [divisionExpand, setDivisionsExpand] = useState(false)

    const [date, setDate] = useState(new Date);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Tyhjä');
    const [dateDb, setDateDb] = useState('');
    const [timeDb, setTimeDb] = useState('');

    const [desc, setDesc] = useState('');

    const [end, setEnd] = useState(1);
    const [endText, setEndText] = useState()

    
    const [shouldShow, setShouldShow] = useState(false);

    const [visible, setVisible] = React.useState(false);


    function showItems() {
        setShouldShow(!shouldShow)
        onChange()
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);


        let fHours = Number(tempDate.getHours()) < 10 ? '0' + Number(tempDate.getHours()) : Number(tempDate.getHours());
        let fMinutes = Number(tempDate.getMinutes()) < 10 ? '0' + Number(tempDate.getMinutes()) : Number(tempDate.getMinutes());
        let fTime = fHours + ':' + fMinutes;

        let month = Number(tempDate.getMonth() + 1) < 10 ? '0' + Number(tempDate.getMonth() + 1) : Number(tempDate.getMonth() + 1);
        let day = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
        let fDate = day + '.' + month + '.' + tempDate.getFullYear();

        // if (event === 'minus') {
        //     if (end >= 1) {
        //         setEnd(end - 1)
        //     }
        // } 
        // if (event === 'plus') {
        //     setEnd(end + 1)
        // }

        // let fEnd = fHours + end < 24 ? fHours + end : "00"

        setText(fDate + ', ' + fTime)
        // setEndText(fEnd + ':' + fMinutes)
        setTimeDb(fTime)
        setDateDb(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const selectDivision = (div) => {
        setDivisionsExpand(!divisionExpand);
        setDivision(div);
      };

    function addEvent() {


        if (division && dateDb && timeDb) {


            push(ref(database, EVENT_REF), {
                date: dateDb,
                time: timeDb,
                division: division,
                description: desc,
                isEvent: division === "Muut"
            }).then(showModal);

        } else {
            Alert.alert("Muista valita sarja sekä tapahtuman päivänmäärä!")
        }
    }

    const showModal = () => setVisible(true);

    const hideModal = () => {
        setVisible(false);
        setDivision();
        setDate(new Date);
        setDesc('');
        setShouldShow(false);
        setText('Tyhjä');
      }

    // function calc(ans) {
    //     if (ans === 'minus') {
    //         if (end >= 1) {
    //             setEnd(end - 1)
    //             onChange()
    //         }
    //     } else {
    //         setEnd(end + 1)
    //         onChange()
    //     }
    // }


    return (
        <>
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <SafeAreaView>

                {/* Header: Go back button and Menu */}
                <View style={style.header}>
                    <Pressable onPress={() => navigation.navigate('AdminNav')}><View style={style.iconsEllipse}><Icon.ChevronLeft style={[style.icons]}/></View></Pressable>
                    <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
                </View>



                <View style={style.viewContainer}>
                    <View style={style.contentOnLightBG}>
                        <Text style={[style.h4Style, style.adminHeader]}>Luo tapahtuma</Text>
                    </View>


                    {/* Creating an event */}

                    

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
                        <List.Item
                        style={[style.adminSelect, style.adminShadow]}
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
                            {shouldShow && Platform.OS === 'ios' ? 
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
                                    style={{marginBottom: "5%"}}
                                    value={date}
                                    mode={'time'}
                                    is24Hour={true}
                                    display='default'
                                    onChange={onChange} />

                                {/* <View style={{flexDirection: 'row'}}>
                                    <Pressable onPress={() => calc('minus')} style={{margin: 10, backgroundColor: 'grey', padding: 10}}><Text>-</Text></Pressable>
                                    <Text>{end}</Text>
                                    <Pressable onPress={() => calc('plus')} style={{margin: 10, backgroundColor: 'grey', padding: 10}}><Text>+</Text></Pressable>
                                </View> */}


                                </View>
                            ) : shouldShow ? (
                                <View>
                                    <Pressable onPress={() => showMode("date")}><Text>Valitse päivä</Text></Pressable>
                                    <Pressable onPress={() => showMode("time")}><Text>Valitse kellonaika</Text></Pressable>
                                    {show && (
                                        <DateTimePicker
                                            testID='dateTimePicker'
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                
                                </View>
                            ): null}

                        </View>


                    {/* Description */}
                
                        <View>
                            <TextInput 
                            style={style.adminDesc}
                            placeholder="Kuvaus..."
                            value={desc}
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


                        {/* <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={calc('minus')} style={{margin: 10, backgroundColor: 'grey', padding: 10}}><Text>-</Text></Pressable>
                            <Text>{end}</Text>
                            <Pressable onPress={calc()} style={{margin: 10, backgroundColor: 'grey', padding: 10}}><Text>+</Text></Pressable>
                        </View> */}

                </View>

                {/* Modal */}

                <Provider>
                    <Portal>
                        <Modal visible={visible} contentContainerStyle={style.modalContainer}>
                            <Text style={style.modalTitle}>Tapahtuma luotu</Text>

                            <View style={[style.buttonSummaryStyles, style.adminModal]}>
                                <Pressable onPress={() => navigation.navigate('AdminNav')} 
                                    style={[style.summaryButton]}>
                                    <Text style={style.buttonText}>Sulje</Text>
                                </Pressable>

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

export default AdminEvents