import { Dimensions } from "react-native"

export const utils = {
    getWindowHeight() {
        const WINDOW_HEIGHT = Dimensions.get("window").height
        return WINDOW_HEIGHT
    }
}