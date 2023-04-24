import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const styles = StyleSheet.create({
    loaderStyle: {
        position: 'absolute', 
        top: 250, 
        right: 50, 
        left: 50
    },
    proceedButton: {
        flex: 0.1, 
        zIndex: 1, 
        position: 'absolute', 
        bottom: 20, 
        right: 16, 
        left: 16
    }
})

export default styles
