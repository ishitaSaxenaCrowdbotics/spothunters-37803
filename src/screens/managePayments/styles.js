import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../styles";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 16,
        elevation: 5
    },
    qrCodeContainer: {
        backgroundColor: colors.base, 
        borderRadius: 37, 
        paddingVertical: 6,  
        width: 113
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
  });