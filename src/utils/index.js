import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dimensions } from "react-native"

export const utils = {
    getWindowHeight() {
        const WINDOW_HEIGHT = Dimensions.get("window").height
        return WINDOW_HEIGHT
    }
}

export const removeAuthData = async () => {
    await AsyncStorage.removeItem('auth')
}

export const setOnboardingFlag = async () => {
    AsyncStorage.setItem('onBoarding', "true")
}

export const getOnboardingFlag = async () => JSON.parse(await AsyncStorage.getItem('onBoarding'))

export const convertToMeterToMiles = dist => dist * 0.000621371

export const convertTime12to24 = time12h => {
    const [time, modifier] = time12h.split(" ");
   
    let [hours, minutes] = time.split(":");
   
    if (hours === "12") {
      hours = "00";
    }
   
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
   
    return `${hours}:${minutes}`;
  };