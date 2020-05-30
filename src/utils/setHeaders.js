import AsyncStorage from '@react-native-community/async-storage';

export default async () => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-auth-token": await AsyncStorage.getItem(`token`)
});
