import { StyleSheet } from "react-native";
import { colors } from "../../styles";

export const styles = StyleSheet.create({
    container: {
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
    headerText: {
        textAlign: 'center', 
        marginTop: 24, 
        marginHorizontal: 40
    },
    buttonContainer: {
        flexDirection: 'row', 
        marginTop: 24, 
        justifyContent: 'space-between'
    },
    cancelButton: {
        backgroundColor: colors.base, 
        borderRadius: 24, 
        alignItems: 'center', 
        flex: 1,  
        padding: 10, 
        marginRight: 20
    },
    logOutButton: {
        borderRadius: 24, 
        borderColor: colors.base, 
        padding: 10, 
        alignItems: 'center', 
        borderWidth: 1, 
        flex: 1
    },
    payButton: {
        width: "40%",
        height: 50,
        alignSelf: "center"
      }
  });