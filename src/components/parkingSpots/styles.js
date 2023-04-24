import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../styles";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 16,
        width: Dimensions.get("window").width*0.80,
        // height: Dimensions.get("window").width*0.30,
        elevation: 5,
        flexDirection: 'row'
    },
    subContainer: {
        width: 80, 
        marginRight: 10,
        borderRadius: 8,
        resizeMode: 'stretch'
    },
    textContainer: {
        flexDirection: 'row', 
        marginTop: 8, 
        alignItems: 'center'
    },
    itemContainer:{ 
        backgroundColor: colors.COLOR_E9E9E9, 
        padding: 8, 
        marginRight: 16, 
        flexDirection: 'row', 
        marginBottom: 8
    },
    marginRight2: {
        marginRight: 2
    },
    listItemContainer: {
        backgroundColor: colors.white,
          borderRadius: 8,
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 10,
          marginHorizontal: 16,
          elevation: 5
    },
    listSubContainer: {
        height: 96, 
        marginBottom: 12,
        borderRadius: 8
    },
    hourlyContainer: {
        backgroundColor: colors.COLOR_FF9D7E, 
        paddingHorizontal: 8, 
        paddingVertical: 2, 
        borderRadius: 40, 
        alignItems: 'center', 
        alignSelf: 'flex-end'
    }
  });