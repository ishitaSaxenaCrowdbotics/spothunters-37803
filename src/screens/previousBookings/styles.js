import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.COLOR_FBFBFB, 
        flex: 1
    },
    settingButton: {
        width: 55, 
        height: 54, 
        backgroundColor: colors.base, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 15
    }
})

export default styles
