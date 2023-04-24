import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const styles = StyleSheet.create({
    paddingHorizontal34: {
        paddingHorizontal: 34
    },
    container: {
        flex: 1, 
        backgroundColor: colors.COLOR_FBFBFB, 
        paddingTop: 32
    },
    buttonContainer: {
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 8, 
        justifyContent: 'center', 
        marginHorizontal: 16, 
        marginTop: 16
    }
})

export default styles
