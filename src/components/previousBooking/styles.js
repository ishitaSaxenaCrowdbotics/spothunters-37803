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
    rateContainer: {
        backgroundColor: colors.white, 
        borderRadius: 37, 
        paddingVertical: 6,  
        width: 113
    },
    modalContainer: {
        flex: 1, 
        backgroundColor: '#00000080'
    },
    modalSubContainer: {
        backgroundColor: 'white',
        position: 'absolute', 
        bottom: 0, 
        right: 0, 
        left: 0, 
        opacity:1,
        paddingHorizontal: 28, 
        paddingVertical: 32
    },
    rateTextInput: {
        borderWidth: 1,
        borderRadius: 10, 
        borderColor: colors.gray, 
        padding: 14
    },
    rateButton: {
        backgroundColor: colors.base, 
        borderRadius: 37, 
        paddingVertical: 13, 
        marginTop: 24
    },
    closeButtonContainer: {
        backgroundColor: 'white', 
        borderRadius: 37, 
        paddingVertical: 13, 
        marginTop: 24, 
        borderWidth: 1, 
        borderColor: '#1E8FFF'
    },
    feedbackText: {
        width: 180, 
        height: 140, 
        backgroundColor: colors.gray, 
        alignSelf: 'center', 
        marginBottom: 32
    }
  });