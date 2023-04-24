import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 17, 
        flex: 1, 
        paddingVertical: 30
    },
    size280: {
        width: 280, height: 280
    },
    marginTop42: {
        marginTop: 42
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.base,
    },
    margin30: {
        margin: 30
    },
    flex5: {
        flex: 0.5
    },
    paddingHorizontal48: {
        paddingHorizontal: 48
    }
})

export default styles
