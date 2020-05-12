import AsyncStorage from '@react-native-community/async-storage';


export const getValue = async key => {
    try {
      const value = await AsyncStorage.getItem(`${key}`);
      if (value !== null) {
        console.log(`Token value is ${value}`);
        return value;
      }
    } catch (e) {
      // error reading value
      return false;
    }
  };