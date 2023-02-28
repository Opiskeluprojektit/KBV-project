import React, { useState, useEffect } from 'react';
import { Image, Text, View, SafeAreaView, Pressable, Linking, ImageBackground, Alert } from 'react-native';
import { style } from '../styles/styles';
import * as Icon from "react-native-feather";
import { onValue, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getData } from './adminFiles/CheckLogin';
import { database, USER_REF } from '../firebase/Config';

// const auth = getAuth();
// auth.onAuthStateChanged(function(user) {
//   if (user) {
//     console.log('authenticated: ', user);
//   } else {
//     console.log('authenticated: ', user);
//   }
// });

export default function Home({navigation}) {

  const backgroundImage = require('../assets/Volleyball50.png');
  const logo = require('../assets/Logo2.png');
  const [loginStatus, setLoginStatus] = useState(false)
  const [role, setRole] = useState()


  const handleUserCheck = async () => {
    const userCred = await getData() 
  
    if (userCred) {
      
      onValue(ref(database, USER_REF + userCred), (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : {};
        const dataItems = {...data};
        const parse = JSON.parse(JSON.stringify(dataItems))
        const result = parse.isAdmin
        console.log('result', result);
        setRole(result)
      })
  
      if (role === true) {
        setLoginStatus(true)
      } else {
        setLoginStatus(false)
      }
    } else {
      return false
    }
  }
  
  useEffect(() => {
    handleUserCheck()
  }, [role])
  
  // useEffect(() => {
  //   const test = async () => {
  //     let status = await handleUserCheck()
  //     console.log("status", status);
  
  //     if (status === true) {
  //       setLoginStatus(true)
  //     } else if (status === false) {
  //       setLoginStatus(false)
  //     } else {
  //       test()
  //     }
  //   }

  //   test()
  // }, [])
  
  
  
/*   const test = async () => {
    let status = await handleUserCheck()
    console.log("status", status);

    if (status === true) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  } */


  return (
    <ImageBackground source={backgroundImage} imageStyle={{height: '100%', width: 800}}>
      <SafeAreaView style={style.container}>


          {loginStatus === true ? 
          (
            <View style={[style.header, {flexDirection: 'row', paddingBottom: 20}]}>
              <View style={style.adminBoxLeft}>
                <Image source={logo} style={style.adminHomeScreenLogo}></Image>
              </View>

              <View style={style.adminBoxCenter}> 

                <View style={style.adminPanelButton}>
                  <Text style={[style.bigButtonText, {textAlign: 'center', fontSize: 20}]}>
                    Admin
                  </Text>
                </View>


                {/* <Pressable  onPress={() => navigation.navigate('AdminNav')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,}, style.adminPanelButton]}>
                  <Text style={[style.bigButtonText, {marginLeft: 12, fontSize: 16}]}>Admin Paneeli</Text>
                  <View style={[style.adminPanelEllipse, style.adminEllipseHome]}><Icon.ArrowRight style={style.adminIconsButton}/></View>
                </Pressable> */}
              </View>

              <View style={style.adminBoxRight}>
                <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.adminMenuButton} width={42} height={40} /></View></Pressable>
              </View>
            </View>
          ) : (
            <View style={style.header}>
              <Image source={logo} style={style.HomeScreenLogo}></Image>
              <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
            </View>
          )}

                {/* <Pressable style={{padding: 10, backgroundColor: 'grey'}} onPress={() => test()}>
                  <Text>
                    testi
                  </Text>
                </Pressable> */}

          {/* <View style={style.header}>
          <Image source={logo} style={style.HomeScreenLogo}></Image>



            <Pressable onPress={() => navigation.navigate('Menu')}><View><Icon.Menu style={style.menuButton} width={42} height={40} /></View></Pressable>
          </View> */}
          
          {/* Heading*/}
          <View style={style.heading}>
            <Text style={style.h2Style}>Kokkola{'\n'}Beach{'\n'}Volley</Text>
          </View>

          {/* Navigation to different screens: Enrolment, Points, Ranking and to rules in KBV website*/}
          <View style={style.homeButtonsContainer}>
            <Pressable onPress={() => navigation.navigate('Enrolment')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.UserPlus style={style.icons}/></View>
              <Text style={style.bigButtonText}>Ilmoittaudu</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Points')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Edit style={style.icons}/></View>
              <Text style={style.bigButtonText}>Pisteiden syöttö</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Ranking')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Award style={style.icons}/></View>
              <Text style={style.bigButtonText}>Ranking-listat</Text>
            </Pressable>
            <Pressable  onPress={() => {Linking.openURL('https://sites.google.com/view/kokkolabeachvolley/etusivu/viikkobiitsi/viikkobiitsi-s%C3%A4%C3%A4nn%C3%B6t');}} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.button]}>
              <Text style={style.bigButtonText}>ViikkoBiitsi-säännöt</Text>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.BookOpen style={style.icons}/></View>
            </Pressable>

            {loginStatus == true ?
            (
              <Pressable onPress={() => navigation.navigate('AdminNav')} style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.homeButtons, style.adminPanelPressable]}>
              <View style={[style.iconsEllipse, style.homeEllipse]}><Icon.Settings style={style.icons}/></View>
              <Text style={style.bigButtonText}>Admin paneeli</Text>
            </Pressable>
            ) : null}

            
            
          </View>
          
      </SafeAreaView>
    </ImageBackground>
  );
}


