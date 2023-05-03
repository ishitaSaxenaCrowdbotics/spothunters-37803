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

export const calcTotalTime = (inTime, outTime) => {

  const entry_time = new Date(outTime)
  const exit_time = new Date(inTime)  
  const timeDiff = Math.abs(entry_time.getTime() - exit_time.getTime())
  const hoursDiff = timeDiff / (1000 * 60 * 60)
  return hoursDiff.toFixed(2)
}

export const formatTime = dateStr => {
  const dateObj = new Date(dateStr)
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const ampm = hours >= 12 ? "PM" : "AM"
  const hours12 = hours % 12 || 12
  const formattedTime = `${hours12}:${
  minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`
  return formattedTime
  
  }

 export const toUnixTime = (year, month, day, hr, min, sec) => {
    const date = new Date(Date.UTC(year, month - 1, day, hr, min, sec));
    return Math.floor(date.getTime()/1000);
  }