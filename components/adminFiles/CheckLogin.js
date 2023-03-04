import AsyncStorage from '@react-native-async-storage/async-storage';



// function to store data to asyncstorage

export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@adminInfo', value.user.uid);
      return true;
    } catch (error) {
      Alert.alert("virhe!", error.toString())
    }
  };

// function to retrieve data from async storage

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

// function to remove data from asyncstorage

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@adminInfo')
  } catch(e) {
    console.log(e)
  }
}