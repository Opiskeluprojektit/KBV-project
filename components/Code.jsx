import React, {useState, useRef, useEffect} from 'react';
import { Image, Text, Alert, StyleSheet, View, SafeAreaView, Pressable, Linking, ImageBackground } from 'react-native';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { style } from '../styles/styles';
import CodeInput from 'react-native-code-textinput';
import {database} from '../firebase/Config';
import {onValue, ref} from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
/** Password will be retrieved from firebase */


function Code({navigation}) {
  
  const backgroundImage = require('../assets/Volleyball50.png');
  const logo = require('../assets/Logo2.png');
  
  const [code, setCode] = useState(1234);   //stores input, hardwired for testing purposes
  const [password, setPassword] = useState()

  const [email, setEmail] = useState('')
  const [userPw, setUserPw] = useState('')

  const [visible, setVisible] = useState(false);


  const showModal = () => setVisible(true);

  const hideModal = () => {
    setVisible(false);
    setEmail('');
    setUserPw('');
  }

  
      // Collects code from firebase database
      useEffect(() => {
        const administration = ref(database,"administration/0");
        onValue(administration, (snapshot) => {
          const data = snapshot.val() ? snapshot.val() : {};
          const adminItems = {...data};
          const parse = JSON.parse(JSON.stringify(adminItems))
          setPassword(parse.koodi);
          setUserPw(parse.adminKoodi);
        });
      },[]);

      

      //Uncomment to automatically take you to homescreen after code input
      useEffect(() => {
        if (code.length === 4) {
          checkCode();
        }
      }, [code]);

    function checkCode() {                        //checks if input matches password
      if (code == password) {
        setCode(0)
        navigation.navigate('Home')
      } else if (code == userPw) {
        showModal()
      } else {
        Alert.alert (
          "Koodi väärin, syötä uusi koodi."
        )
      }
    }


    const LoginAdmin = async () => {

      if(handleLogin() == true) {
        try {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, email, userPw)
          .then((userCredential) => {
            const user = userCredential.user;
            setCode(0)
            hideModal()
            navigation.navigate('Home')
          })
          .catch((err) => {
            console.log('Kirjautuminen epäonnistui.', err);
            Alert.alert('Kirjautuminen epäonnistui. ', err.toString());
          }) 
         
      } catch (err) {
          console.log('Kirjautuminen epäonnistui.', err);
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
                codeSize={4} 
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
                            onChangeText={(email) => setEmail(email)}
                            maxLength={50}
                            autoFocus
                           />

                          <TextInput
                            style={style.adminLoginInput}
                            keyboardType='default'
                            textContentType='password'
                            placeholder='Salasana'
                            onChangeText={(pw) => setUserPw(pw)}
                            maxLength={50}
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
