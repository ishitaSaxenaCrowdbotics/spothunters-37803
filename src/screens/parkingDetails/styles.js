import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const style = StyleSheet.create({
    container: {
        backgroundColor: colors.COLOR_FBFBFB,
        flex: 1
    },
    modalContainer: {
        flex:1, 
        backgroundColor: '#000000CC'
    },
    centerContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 100
    },
    subContainer: {
        backgroundColor: colors.white, 
        borderRadius: 8, 
        padding: 24
    },
})

export default style
