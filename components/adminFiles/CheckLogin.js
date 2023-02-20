import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { child, DataSnapshot, get, onValue, ref } from "firebase/database";
import { database, USER_REF } from "../../firebase/Config";



export const checkLoginStatus = () => {

    const auth = getAuth()
    if (auth.currentUser) {
        return true;
    } else {
        return false
    }
}

 export const checkUserStatus = async () => {
  const test = await fetchUserData()

  if (test === 'admin'){
    return true
  } else {
    return false
  }

 }

export const fetchUserData = async () => {

  const userCred = await getData()

  if (userCred) {
    let fetchedRole;
    
    onValue(ref(database, USER_REF + userCred), (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const dataItems = {...data};
      const parse = JSON.parse(JSON.stringify(dataItems))
      const result = parse.role
      fetchedRole = result
    })


      return fetchedRole
  }


}
  




export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@adminInfo', value.user.uid);
      return true;
    } catch (error) {
      Alert.alert("virhe!", error.toString())
    }
  };

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@adminInfo')
    if (value !== null) {
      return value
    } 
  } catch(e) {
    console.log(e)
  }
}

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@adminInfo')
  } catch(e) {
    console.log(e)
  }
}