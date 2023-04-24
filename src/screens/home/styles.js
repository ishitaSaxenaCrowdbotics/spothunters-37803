import {StyleSheet} from 'react-native'
import { colors } from '../../styles'

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.COLOR_FBFBFB
    },
    subContainer:  {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginVertical: 25, 
        alignItems: 'center', 
        paddingHorizontal: 16
    }
})

export default styles
