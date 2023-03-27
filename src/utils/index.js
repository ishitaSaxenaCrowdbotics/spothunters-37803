import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dimensions } from "react-native"

export const utils = {
    getWindowHeight() {
        const WINDOW_HEIGHT = Dimensions.get("window").height
        return WINDOW_HEIGHT
    }
}

export const removeAuthData = async () => {
    await AsyncStorage.removeItem('auth');
}