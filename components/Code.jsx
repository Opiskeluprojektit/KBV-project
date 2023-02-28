import React, {useState, useRef, useEffect} from 'react';
import { Image, Text, Alert, StyleSheet, View, SafeAreaView, Pressable, Linking, ImageBackground } from 'react-native';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { style } from '../styles/styles';
import CodeInput from 'react-native-code-textinput';
import {database} from '../firebase/Config';
import {onValue, ref} from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getData, removeData, storeData } from './adminFiles/CheckLogin';
/** Password will be retrieved from firebase */


function Code({navigation}) {
  
  const backgroundImage = require('../assets/Volleyball50.png');
  const logo = require('../assets/Logo2.png');
  
  const [code, setCode] = useState('');   //stores input, hardwired for testing purposes
  const [password, setPassword] = useState()

  const [email, setEmail] = useState('testi@testi.fi')
  const [userPw, setUserPw] = useState('')
  const [codePassword, setCodePassword] = useState('')

  const [userEmail, setUserEmail] = useState('user@kbv.fi')
  const [userPassword, setUserPassword] = useState()

  const [visible, setVisible] = useState(false);


  const showModal = () => setVisible(true);

  const hideModal = () => {
    setVisible(false);
    setEmail('');
    setUserPw('');
  }

  useEffect(() => {
    const statusCheck = async () => {
      let status = await getData()

      if (status) {
        navigation.navigate('Home')
      }
    }

    statusCheck()
  }, [])
  

  
      // Collects code from firebase database
      useEffect(() => {
        const administration = ref(database,"administration/codes");
        onValue(administration, (snapshot) => {
          const data = snapshot.val() ? snapshot.val() : {};
          const adminItems = {...data};
          const parse = JSON.parse(JSON.stringify(adminItems))
          console.log("parse", parse)
          setCodePassword(parse.adminKoodi);
        });
      },[]);

      

      //Uncomment to automatically take you to homescreen after code input
      useEffect(() => {
        if (code.length === 6) {
          checkCode();
        }
      }, [code]);

    function checkCode() {                        //checks if input matches password
      if (code == codePassword) {
        showModal()
      }  else {
        setUserPassword(code)
        loginUser()
      }
    }

    const loginUser = async () => {
      console.log("user kirjautuminen")
      try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          setCode(0)
          setCode('')
          removeData()
          .then(() => {
            storeData(userCredential)
            navigation.navigate('Home')
          })
        })
        .catch((err) => {
          Alert.alert('Kirjautuminen epäonnistui. ', err.toString());
        }) 
      } catch (err) {
        Alert.alert('Kirjautuminen epäonnistui. ', err.toString());
      }
    }


    const LoginAdmin = async () => {

      if(handleLogin() == true) {
        try {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, email, userPw)
          .then((userCredential) => {
            setCode('')
            hideModal()
            removeData()
            .then(() => {
              storeData(userCredential)
              navigation.navigate('Home')
            })
          })
          .catch((err) => {
            Alert.alert('Kirjautuminen epäonnistui. ', err.toString());
          }) 
         
      } catch (err) {
          Alert.alert('Kirjautuminen epäonnistui. ', err.toString());
        }
      }
    }


    const handleLogin = () => {
      // check login credentials -> route/redirect to home screen
      if (!email.trim()) {
        Alert.alert("Syötä sähköpostisi");
        return false;
      }
  
      if (!userPw.trim()) {
        Alert.alert("Syötä salasana");
        return false;
      }
  
      return true;
    }


      return (
        <ImageBackground source={backgroundImage} imageStyle={{height: '100%', width: 800}}>
          <SafeAreaView>
            
            <Image source={logo} style={style.bigLogo}></Image>
            
            <View style={style.codeInputField}>
              <CodeInput 
                codeSize={6} 
                value={code}
                onValueChange={setCode}
                inputStyle={style.codeInputBox}>
              </CodeInput>
            </View>
            <View style={style.codeContainer}>
              <Pressable onPress={() => checkCode()}>
                <Text style={style.titles}>Kirjaudu sisään</Text>
              </Pressable>
            </View>     




            {/* Modal */}


            <Provider>
                    <Portal>
                        <Modal visible={visible} contentContainerStyle={style.adminModalLoginView}>
                            <Text style={[style.adminModalTitle]}>Kirjautuminen adminiksi</Text>


                        <View style={style.adminLoginView}>
                           <TextInput
                            style={style.adminLoginInput}
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            placeholder='Sähköposti'
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            maxLength={50}
                            autoFocus
                           />

                          <TextInput
                            style={style.adminLoginInput}
                            keyboardType='default'
                            textContentType='password'
                            placeholder='Salasana'
                            value={userPw}
                            onChangeText={(userPw) => setUserPw(userPw)}
                            maxLength={50}
                            secureTextEntry={true}
                           />
                        </View>

                        <View style={[style.adminModal, {flexDirection: 'row'}]}>

                                <Pressable onPress={() => hideModal()}
                                    style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.adminLoginButton]}>
                                    <Text style={style.buttonText}>Sulje</Text>
                                </Pressable>

                                <Pressable onPress={() => LoginAdmin()}
                                    style={({pressed})=>[{opacity: pressed ? 0.9 : 1,},style.adminLoginButton]}>
                                    <Text style={style.buttonText}>Kirjaudu</Text>
                                </Pressable>

                                
                          </View>

                        </Modal>
                    </Portal>
                </Provider>
            
          </SafeAreaView>
        </ImageBackground>
      ); 

    
  }
export default Code;
