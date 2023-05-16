import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.COLOR_FBFBFB, 
        flex: 1
    },
    modalContainer: {
        flex:1, 
        backgroundColor: '#000000CC'
    },
    centerContainer: {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    subContainer: {
        backgroundColor: colors.white, 
        borderRadius: 8, 
        padding: 24
    },
})

export default styles
