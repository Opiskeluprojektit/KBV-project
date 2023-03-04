import React, { useState, useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, Pressable, Text, FlatList, ScrollView, Alert, Platform } from 'react-native';
import { List, TextInput, Modal, Portal, Provider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'
import { style } from '../../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, ref, update, set, remove, query, orderByChild, equalTo, orderByValue, orderByKey } from 'firebase/database';
import { database, enrolment_ref, EVENT_REF, PLAYER_REF } from '../../firebase/Config';
import { object } from 'prop-types';

function AdminEditEvents({ navigation }) {
    const backgroundImage = require('../../assets/Volleyball50.png'); 

    const [events, setEvents] = useState([]);

    const [visible, setVisible] = useState(false);
    const [visiblePlayers, setVisiblePlayers] = useState(false);
    const [dbId, setDbId] = useState('')
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [desc, setDesc] = useState('');
    const [division, setDivision] = useState();
    const [divisionExpand, setDivisionsExpand] = useState(false)
    const [filterDiv, setFilterDiv] = useState('Kaikki');
    const [filterExpand, setFilterExpand] = useState(false)
    const [timeStamp, setTimeStamp] = useState()
    const [convertTime, setConvertTime] = useState(new Date)
    const [endTime, setEndTime] = useState(new Date)
    const [endStr, setEndStr] = useState('')
    const [endTimeExist, setEndTimeExist] = useState(false)
    const [endHours, setEndHours] = useState('')
    const [enrolmentsToShow, setEnrolmentsToShow] = useState([])

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [checked, setChecked] = useState(false)

    const [showEnd, setShowEnd] = useState(false);

    const [players, setPlayers] = useState([])
    const [enrolments, setEnrolments] = useState()

    let enrol = []

    // Fetch all events from database

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

    // fetch all enrolments for events

    useEffect(() => { 
        const enrols = query(ref(database, enrolment_ref));
        onValue(enrols, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : {};
            const enrolledPlayers = {...data}
            const keys = Object.keys(enrolledPlayers)
            let mappedKeys = keys.map((key) => {
                return {...enrolledPlayers[key], id: key };
            })

            setEnrolments(mappedKeys)

      })

    }, [])

    // Update filtering events and enrolments when enrolments have changed

    useEffect(() => {
        dbId ? filterPlayers() : null
      }, [enrolments])

      // fetch all players

    useEffect(() => {
        const players = ref(database, PLAYER_REF);
        onValue(players, (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : {};
        const playerItems = {...data};
        const parse = JSON.parse(JSON.stringify(playerItems))
        let parseKeys = Object.values(parse)
        setPlayers(parseKeys)
        console.log("players: ", parseKeys)
        });

    }, [])

    // execute player filtering function when new event has selected

    useEffect(() => {
        dbId ? filterPlayers() : null
    }, [dbId])

    // Filtering players and creating state to list all enrolled players    

    const filterPlayers = () => {
        let enrolmentsInChosenGame = enrolments.filter((e) => e.game_id === dbId)
        let newEnrolmentsToShow = enrolmentsInChosenGame.map((e) => {
            let newEnrolments = {
                enrolmentID: null,
                playerName: null,
            };
            newEnrolments.enrolmentID = e.id;
            let enrolledPlayer;
            players.forEach((i) => {
                if (i.id == e.player_id) {
                    enrolledPlayer = i
                }
            })
            newEnrolments.playerName = enrolledPlayer ? enrolledPlayer.name : null; 
            return newEnrolments
        });

        console.log("newEnrolmentsToShow", newEnrolmentsToShow)
        setEnrolmentsToShow(newEnrolmentsToShow)
    }
    
    // Create filter for event list by selected division    

    const createFilter = () => {
        let data = events
        const currentDate = new Date()

        if (filterDiv !== 'Kaikki') {
            data = data.filter((div) => div.division == filterDiv).map(({ID, date, time, description, division, timestamp, endTimestamp, endTime}) => 
            ({ID, date, time, description, division, timestamp, endTimestamp, endTime}));
        }

        if (checked == false) {
            data.filter((i) => i.timestamp >= currentDate.valueOf())
        }


        data.sort((a, b) => a.timestamp - b.timestamp)

        return data;
    }

    // Map all events in to a list

   const allEvents = createFilter().map((item) => {
    return (
        <View key={item.ID} style={style.adminEventList}>
            <Text style={style.adminEventTitle}>{item.division} {item.date}</Text>
            <Pressable onPress={() => showModal(item.division, item.date, item.time, item.description, item.ID, item.timestamp, item.endTimestamp, item.endTime)} style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.adminEventButton]}><Text style={style.adminTextBg}>Muuta</Text></Pressable>
        </View>
    );
   })

   
   // Map all enrolled players in to selected game

   const enrolledPlayers = enrolmentsToShow.map((item) => {   

    return (
        <View key={item.enrolmentID} style={style.adminEventList}>
            <Text style={style.adminEventTitle}>{item.playerName}</Text>
            <Pressable onPress={() => confirmEnrolmentDelete(item.enrolmentID)} style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.adminPlayerButton]}><Text style={style.adminTextBg}>Poista</Text></Pressable>
        </View>
    );
        
   })

   // Function to show modal for editing events

   const showModal = (div, dd, hh, dsc, id, stm, endstm, endhh) => {
    setVisible(true)
    setDivision(div)
    setDate(dd)
    setTime(hh)
    setDesc(dsc)
    setDbId(id)
    
    if (stm) {
        setConvertTime(new Date(stm))
    }

    if (endstm) {
        setEndTime(new Date(endstm))
        setEndTimeExist(true)
    } else {
        setEndTimeExist(false)
    }

    if (endhh !== "") {
        setEndStr(endhh)
    }
   }; 

   // Function to show modal where players are listed

   const showPlayersModal = () => {
    setVisible(false)
    setVisiblePlayers(true)
   }

   // Function to hide modal where players are listed

   const hidePlayersModal = () => {
    setVisible(true)
    setVisiblePlayers(false)
   }

   // Function to show aler for admin to confirm before deleting enrolment

   const confirmEnrolmentDelete = (key) => {
    Alert.alert("Huomio!", "Haluatko varmasti poistaa ilmoittautumisen?", [
        {
            text: 'Peruuta',
            onPress: () => executeEnrolmentDelete(false, key),
            style: 'cancel'
        },
        {text: 'Kyllä', onPress: () => executeEnrolmentDelete(true, key)},
    ])
   }

   // Function to execute enrolment delete

   const executeEnrolmentDelete = (ans, key) => {
    if (ans === true) {
        remove(ref(database, enrolment_ref + key)).then(Alert.alert("Ilmoittautuminen poistettu!"))
    } else {
        console.log("ei poistettu")
    }
}

    // function to manage changes on datetimepicker

   const onChange = (event, selectedDate) => {

    if (Platform.OS === 'android') {
        
        const changedDate = selectedDate || convertTime;
        setShow(Platform.OS === 'ios');

        if (changedDate.valueOf() > (new Date().valueOf() - 3600000)) {

            setConvertTime(changedDate)
        
                let tempDate = new Date(changedDate)
        
                let fHours = Number(tempDate.getHours()) < 10 ? '0' + Number(tempDate.getHours()) : Number(tempDate.getHours());
                let fMinutes = Number(tempDate.getMinutes()) < 10 ? '0' + Number(tempDate.getMinutes()) : Number(tempDate.getMinutes());
                let fTime = fHours + ':' + fMinutes;
        
                let month = Number(tempDate.getMonth() + 1) < 10 ? '0' + Number(tempDate.getMonth() + 1) : Number(tempDate.getMonth() + 1);
                let day = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
                let fDate = day + '.' + month + '.' + tempDate.getFullYear(); 
        
                
                setTime(fTime)
                setDate(fDate)
        } else {
            Alert.alert("Tapahtuman ajankohta ei voi olla menneisyydessä")
        }
    } else if (Platform.OS === 'ios') {
         
        const changedDate = selectedDate || convertTime;
        setShow(Platform.OS === 'ios');

        setConvertTime(changedDate)
        
        let tempDate = new Date(changedDate)

        let fHours = Number(tempDate.getHours()) < 10 ? '0' + Number(tempDate.getHours()) : Number(tempDate.getHours());
        let fMinutes = Number(tempDate.getMinutes()) < 10 ? '0' + Number(tempDate.getMinutes()) : Number(tempDate.getMinutes());
        let fTime = fHours + ':' + fMinutes;

        let month = Number(tempDate.getMonth() + 1) < 10 ? '0' + Number(tempDate.getMonth() + 1) : Number(tempDate.getMonth() + 1);
        let day = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
        let fDate = day + '.' + month + '.' + tempDate.getFullYear(); 

        
        setTime(fTime)
        setDate(fDate)
    }
   }

   // function to manage changes on datetimepicker for event ending time

   const onChangeSec = (event, selectedDate) => {

        if (Platform.OS === 'android') {

            const changedDate = selectedDate || convertTime;
            setShowEnd(Platform.OS === 'ios');
    
            if (changedDate.valueOf() > (convertTime.valueOf() - 600000)) {
    
                setEndTime(changedDate)
            
                    let tempDate = new Date(changedDate)
            
                    let fHours = Number(tempDate.getHours()) < 10 ? '0' + Number(tempDate.getHours()) : Number(tempDate.getHours());
                    let fMinutes = Number(tempDate.getMinutes()) < 10 ? '0' + Number(tempDate.getMinutes()) : Number(tempDate.getMinutes());
                    let fTime = fHours + ':' + fMinutes;
            
                    let month = Number(tempDate.getMonth() + 1) < 10 ? '0' + Number(tempDate.getMonth() + 1) : Number(tempDate.getMonth() + 1);
                    let day = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
                    let fDate = day + '.' + month + '.' + tempDate.getFullYear(); 
            
                    
                    setEndHours(fTime)
            } else {
                Alert.alert("Lopetusajankohta ei voi olla ennen alkamisajankohtaa")
            }

        } else if (Platform.OS === 'ios') {

            const changedDate = selectedDate || convertTime;
            setShowEnd(Platform.OS === 'ios');

            setEndTime(changedDate)
            
                    let tempDate = new Date(changedDate)
            
                    let fHours = Number(tempDate.getHours()) < 10 ? '0' + Number(tempDate.getHours()) : Number(tempDate.getHours());
                    let fMinutes = Number(tempDate.getMinutes()) < 10 ? '0' + Number(tempDate.getMinutes()) : Number(tempDate.getMinutes());
                    let fTime = fHours + ':' + fMinutes;
            
                    let month = Number(tempDate.getMonth() + 1) < 10 ? '0' + Number(tempDate.getMonth() + 1) : Number(tempDate.getMonth() + 1);
                    let day = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
                    let fDate = day + '.' + month + '.' + tempDate.getFullYear(); 
            
                    
                    setEndHours(fTime)
        }


   }

   // function to hide event editing modal

   const hideModal = () => {
    setVisible(false);
  }

  // function to set selected division

    const selectDivision = (div) => {
        setDivisionsExpand(!divisionExpand);
        setDivision(div);
    };

    // function to execute either deleting event or hiding event editing modal

    const submitModal = (check) => {
        if (check === "delete") {
            confirmDelete()
        } 
        if (check === "submit") {
            // const newEvent = {date: date, description: desc, time: time, division: division}
            // const updates = {};
            // updates[EVENT_REF + dbId] = newEvent

            if (division && date && time) {
                update(ref(database, EVENT_REF + dbId), {
                    date: date,
                    time: time,
                    division: division,
                    description: desc,
                    isEvent: division === "Muut",
                    timestamp: convertTime.valueOf(),
                    endTimestamp: endTimeExist == true ? endTime.valueOf() : "",
                    endTime: endTimeExist == true ? endHours.valueOf() : ""
                }).then(hideModal())
            } else {
                Alert.alert("Muista valita sarja, tapahtuman päivänmäärä ja kellonaika!")
            }


        }
    }


    // execute event delete

    const executeDelete = (ans) => {
        if (ans === true) {
            remove(ref(database, EVENT_REF + dbId)).then(hideModal(), Alert.alert("Tapahtuma poistettu"))
        } else {
            console.log("ei poistettu")
        }
    }

    // confirm event delete

    const confirmDelete = () =>
        Alert.alert('Huomio!', 'Haluatko varmasti poistaa tapahtuman?', [
            {
                text: 'Peruuta',
                onPress: () => executeDelete(false),
                style: 'cancel',
            },
            {text: 'Kyllä', onPress: () => executeDelete(true)},
    ]);


    // function to hide division selection picker

    const hide = () => {
        setDivisionsExpand(false)
    }

    // function to set division filter for events
    
    const selectFilter = (fil) => {
        setFilterDiv(fil)
        setFilterExpand(!filterExpand)
    }

    // function to show datetimepicker on android

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    // function to show datetimepicker for ending time

    const showModeEnd = () => {
        setShowEnd(true);
    }

    // function to show datetimepicker if admin wants to add endtime for event

    const addEndTime = () => {
        setEndTimeExist(true)
        setEndTime(new Date(convertTime))
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
                        <Text style={[style.h4Style, style.adminHeader, {marginBottom: 15}]}>Muokkaa tapahtumia</Text>
                    </View>

                    

                    {/* Select filter for events */}

                    <View>
                        <List.Accordion

                            title={filterDiv ? filterDiv : "Filtteröi tapahtumia"}
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
                            <List.Item
                                style={[style.adminSelect, style.adminShadow, {width: "80%", marginBottom: 6}]}
                                title="Muut"
                                onPress={() => selectFilter("Muut")}
                            />
                        </List.Accordion>
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
                            <Modal visible={visible} contentContainerStyle={style.modalContainer}
                            style={ !divisionExpand ? {marginTop: "-60%"} : { marginTop: 0 } }
                            >

                            <View> 
                                <Text style={[style.modalTitle, {marginBottom: 25, marginTop: 25}]}>Muokkaa tapahtumaa</Text>
                                <Pressable onPress={() => hideModal()} style={({pressed})=>[{opacity: pressed ? 0.6 : 1,}, style.adminModalExit]}>
                                <Icon.X style={style.adminExitIcon}/>
                                </Pressable>
                            </View>


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

                            
                                <View>
                                    <View style={[style.adminIconsEllipse, style.adminEllipse]}><Icon.Clock style={style.adminIcons}/></View>
    
                                        {Platform.OS === 'ios' ? 
                                        (
                                            <DateTimePicker
                                            testID='dateTimePicker'
                                            minimumDate={new Date}
                                            style={style.adminEditDay}
                                            value={convertTime}
                                            mode={'date'}
                                            is24Hour={true}
                                            display='default'
                                            onChange={onChange} />
                                        ): Platform.OS === 'android' ? 
                                        (
                                            <View style={style.adminButtonAlign}>
                                                <Pressable style={style.adminDateButton} onPress={() => showMode("date")}><Text style={style.buttonText}>Valitse päivä: {date}</Text></Pressable>
                                                {show && (
                                                    <DateTimePicker
                                                    testID='dateTimePicker'
                                                    minimumDate={new Date}
                                                    style={style.adminEditAndroid}
                                                    value={convertTime}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display='default'
                                                    onChange={onChange} />
                                                )}


                                            </View>
                                        ): null}

                                        
                                </View>

                                <View>
                                    <View style={[style.adminIconsEllipse, style.adminEllipse]}><Icon.Clock style={style.adminIcons}/></View>

                                        {Platform.OS === 'ios' ? 
                                        (
                                            <DateTimePicker
                                            testID='dateTimePicker'
                                            minimumDate={new Date}
                                            style={style.adminEditTime}
                                            value={convertTime}
                                            mode={'time'}
                                            is24Hour={true}
                                            display='default'
                                            onChange={onChange} />
                                        ): Platform.OS === 'android' ? 
                                        (
                                            <View style={style.adminButtonAlign}>
                                        <Pressable style={style.adminDateButton} onPress={() => showMode("time")}><Text style={style.buttonText}>Valitse kellonaika: {time}</Text></Pressable>
                                                {show && (
                                                    <DateTimePicker
                                                    testID='dateTimePicker'
                                                    minimumDate={new Date}
                                                    style={style.adminEditAndroid}
                                                    value={convertTime}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display='default'
                                                    onChange={onChange} />
                                                )}


                                            </View>
                                        ): null}
                                </View>

                                {endTimeExist == true ? 
                                (
                                    <View>
                                        <View style={[style.adminIconsEllipse, style.adminEllipse]}><Icon.Clock style={style.adminIcons}/></View>
                                       
                                        {Platform.OS === 'ios' ? 
                                        (
                                            <DateTimePicker
                                            testID='dateTimePicker'
                                            minimumDate={convertTime}
                                            style={style.adminEditTime}
                                            value={endTime}
                                            mode={'time'}
                                            is24Hour={true}
                                            display='default'
                                            onChange={onChangeSec} />
                                        ): Platform.OS === 'android' ? 
                                        (
                                            <View style={style.adminButtonAlign}>
                                        <Pressable style={style.adminDateButton} onPress={() => showModeEnd("time")}><Text style={style.buttonText}>Valitse lopetusajankohta: {endStr}</Text></Pressable>
                                                {showEnd && (
                                                    <DateTimePicker
                                                    testID='dateTimePicker'
                                                    minimumDate={convertTime}
                                                    style={style.adminEditAndroid}
                                                    value={endTime}
                                                    mode={'time'}
                                                    is24Hour={true}
                                                    display='default'
                                                    onChange={onChangeSec} />
                                                )}


                                            </View>
                                        ): null}
                                    </View>
                                ): 
                                <View>
                                     <Pressable onPress={() => addEndTime()}
                                    style={({pressed})=>[{opacity: pressed ? 0.9 : 1,}, style.button, style.adminShowing, {marginBottom: 10}]}>
                                    <Text style={style.buttonText}>Lisää tapahtumalle lopetusajankohta </Text> 
                                    <Icon.ArrowRight style={style.adminArrow}/>
                                </Pressable>
                                </View>
                                }


                        <View>
                            <TextInput 
                            style={[style.adminDesc, {marginBottom: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20} ]}
                            value={desc}
                            maxLength={100}
                            numberOfLines={2}
                            onChangeText={setDesc}
                            onFocus={hide}
                            >

                            </TextInput>
                        </View>

                        <View>
                            <Pressable onPress={() => showPlayersModal()} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,}, style.button, style.adminShowing, {marginBottom: 10}]}>
                                <Text style={style.buttonText}>Näytä ilmoittautumiset</Text>
                                <Icon.ChevronRight style={style.adminArrow}/>
                            </Pressable>
                        </View>

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

                {/* modal for showing enrolments */}


                <Provider>
                    <Portal>
                        <Modal visible={visiblePlayers} contentContainerStyle={[style.modalContainer, {maxHeight: "50%"}]} style={{marginTop: "-60%"}}>

                                    <View> 
                                        <Text style={[style.modalTitle, {marginBottom: 25, marginTop: 25}]}>Ilmoittautumiset</Text>
                                    </View>

                                    <View style={style.adminModalPlayers}>
                                        
                                        <ScrollView style={style.playerScroll}>

                                            {enrolledPlayers}
                                            

                                        </ScrollView>

                                            
                                    </View>

                                    <View style={[style.buttonSummaryStyles, style.adminModalButtons]}>

                                        <Pressable onPress={() => hidePlayersModal()}
                                        style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.summaryButton]}>
                                        <Text style={style.buttonText}>Sulje</Text>
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