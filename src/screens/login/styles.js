import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 17, 
        flex: 1, 
        paddingVertical: 30
    },
    headingText: {
        marginTop: 10, 
        textAlign: 'center', 
        fontSize: 24, 
        color: colors.base, 
        fontWeight: '600'
    },
    textStyle: {
        marginTop: 32, 
        textAlign: 'center', 
        fontSize: 13
    }
})

export default styles
