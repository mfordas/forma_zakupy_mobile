import AsyncStorage from '@react-native-community/async-storage';

export const getValue = async key => {
    try {
      const value = await AsyncStorage.getItem(`${key}`);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return false;
    }
  };

  export const setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(`${key}`, `${value}`)
    } catch (e) {
      console.log(`Error while saving ${key}`);
    }
  };
  
  export const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(`${key}`)
    } catch(e) {
      console.log(`Error while removing ${key}`);
    }
  
    console.log('Done.');
  };