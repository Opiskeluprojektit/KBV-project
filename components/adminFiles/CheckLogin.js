import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AsyncStorage } from 'react-native';



export const checkLoginStatus = () => {

    const auth = getAuth()
    if (auth.currentUser) {
        return true;
    } else {
        return false
    }
}


export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@adminInfo', value);
      return true;
    } catch (error) {
      Alert.alert("virhe!", error.toString())
    }
  };