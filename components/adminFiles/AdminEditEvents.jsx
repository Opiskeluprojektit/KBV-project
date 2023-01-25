import React, { useState, useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Platform } from 'react-native';
import { List, TextInput, Modal, Portal, Provider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, ref, update, push, child } from 'firebase/database';
import { database, EVENT_REF } from '../../firebase/Config';
import { object } from 'prop-types';




function AdminEditEvents({ navigation }) {
    const backgroundImage = require('../../assets/Volleyball50.png'); 

    const [events, setEvents] = useState([]);

    const [visible, setVisible] = React.useState(false);
    const [dbId, setDbId] = useState('')
    const [date, setDate] = useState('');
    const [time, setTime] =useState('');
    const [desc, setDesc] = useState('');
    const [division, setDivision] = useState();
    const [divisionExpand, setDivisionsExpand] = useState(false)

    const [tempDate, setTempDate] = useState('');
    const [tempTime, setTempTime] = useState('');
    const [tempDesc, setTempDesc] = useState('');
    const [tempDivision, setTempDivision] = useState('');

    
    const [mode, setMode] = useState('date');




    useEffect(() => {
        const events = ref(database, EVENT_REF);
        onValue(events, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : {};
            const eventItems = {...data};
            const keys = Object.keys(eventItems);
            let parseKeys = keys.map((key) => {
                return { ...eventItems[key], ID: key };
            })
            setEvents(parseKeys);
        })
    }, [])

    const test = () => {
    console.log("Tässä taulu")
    console.log(events)
    }


   const allEvents = events.map((item) => {
    return (
        <View key={item.ID} style={style.adminEventList}>
            <Text style={style.adminEventTitle}>{item.division} {item.date}</Text>
            <Pressable onPress={() => showModal(item.division, item.date, item.time, item.description, item.ID)} style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
        </View>
    );
   })

   const showModal = (div, dd, hh, dsc, id) => {
    setVisible(true)
    setDivision(div)
    setDate(dd)
    setTime(hh)
    setDesc(dsc)
    setDbId(id)
   };

   const hideModal = () => {
    setVisible(false);
  }

    const selectDivision = (div) => {
        setDivisionsExpand(!divisionExpand);
        setTempDivision(div);
    };

    const submitModal = (check) => {
        if (check === "cancel") {
            setTempDate('')
            setTempTime('')
            setTempDesc('')
            setTempDivision('')
            hideModal()
        } 
        if (check === "submit") {
            if (tempDivision !== '' && tempDivision !== division) {
                setDivision(tempDivision)
            }
            if (tempDate !== '' && tempDate !== date) {
                setDate(tempDate)
            }
            if (tempTime !== '' && tempTime !== time) {
                setTime(tempTime)
            }
            if (tempDesc !== '' && tempDesc !== desc) {
                setDesc(tempDesc)
            }

            // const newEvent = {date: date, description: desc, time: time, division: division}
            // const updates = {};
            // updates[EVENT_REF + dbId] = newEvent
            console.log(dbId)

            update(ref(database, EVENT_REF + dbId), {
                date: date,
                time: time,
                division: division,
                description: desc
            }).then(hideModal())

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


                {/* Edit events */}

                <View style={style.viewContainer}>

                    <View style={style.contentOnLightBG}>
                        <Text style={[style.h4Style, style.adminHeader]}>Muokkaa tapahtumia</Text>
                    </View>

                    <ScrollView style={style.adminScroll}>


                    {allEvents}

                    {/* <View style={style.adminEventList}>
                        <Text style={style.adminEventTitle}>Tapahtuma esimerkki</Text>
                        <Pressable onPress={() => test()} style={style.adminEventButton}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
                    </View> */}

                    


                    </ScrollView>
                </View>

                    {/* Modal for updating event data */}

                <Provider>
                    <Portal>
                        <Modal visible={visible} contentContainerStyle={[style.modalContainer, {marginTop: "-60%"}]}>
                            <Text style={[style.modalTitle, {marginBottom: 10}]}>Muokkaa tapahtumaa</Text>

                            <View style={style.adminModalView}>
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
                                    <List.Item
                                    style={[style.adminSelect, style.adminShadow]}
                                    title="Muut"
                                    onPress={() => selectDivision("Muut")}
                                    />
                                </List.Accordion>

                                <View style={style.adminModalView}>

                                <View>

                                <View style={[style.adminIconsEllipse, style.adminEllipse]}><Icon.Clock style={style.adminIcons}/></View>
                                    <TextInput
                                        style={style.modalTextInput}
                                        placeholder={date}
                                        keyboardType={'numbers-and-punctuation'}
                                        maxLength={10}
                                        onChangeText={setTempDate}
                                        label={"Päivänmäärä"}
                                        returnKeyType={'done'}
                                    />
                                </View>

                                <View>

                                <View style={[style.adminIconsEllipse, style.adminEllipse]}><Icon.Clock style={style.adminIcons}/></View>
                                    <TextInput
                                        style={style.modalTextInput}
                                        placeholder={time}
                                        keyboardType={'numbers-and-punctuation'}
                                        maxLength={5}
                                        onChangeText={setTempTime}
                                        label={"Kellonaika"}
                                        returnKeyType={'done'}
                                    />
                                </View>
                                

                                    {/* Vaihtoehtosesti voidaan käyttää datetimepickeriä, mutta se vaatii muutoksia tapahtuman luontiin yms. */}

                                    {/* {Platform.OS === 'ios' ? 
                                    (
                                        <View style={style.adminDatePicker}>
                                            <DateTimePicker
                                                testID='dateTimePicker'
                                                style={{marginBottom: "5%"}}
                                                value={date}
                                                mode={'date'}
                                                is24Hour={true}
                                                display='default' />

                                            <DateTimePicker
                                                testID='dateTimePicker'
                                                style={{marginBottom: "5%"}}
                                                value={date}
                                                mode={'time'}
                                                is24Hour={true}
                                                display='default' />
                                        </View>
                                    ): null} */}

                        <View>
                            <TextInput 
                            style={[style.adminDesc, {marginBottom: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20} ]}
                            placeholder="Kuvaus..."
                            value={desc}
                            maxLength={100}
                            numberOfLines={2}
                            onChangeText={setTempDesc}
                            >

                            </TextInput>
                        </View>

                                </View>


                            </View>



                            <View style={[style.buttonSummaryStyles, style.adminModalButtons]}>
                                <Pressable onPress={() => submitModal("cancel")} 
                                    style={[style.summaryButton]}>
                                    <Text style={style.buttonText}>Peruuta</Text>
                                </Pressable>

                                <Pressable onPress={() => submitModal("submit")} 
                                style={[style.summaryButton]}>
                                <Text style={style.buttonText}>Päivitä</Text>
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

export default AdminEditEvents