import { StyleSheet } from "react-native";
import { colors } from "../../styles";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 16,
        elevation: 5
    },
    subContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    marginRight8: {
        marginRight: 8
    }
  });