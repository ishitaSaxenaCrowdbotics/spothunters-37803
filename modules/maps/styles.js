import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../src/styles";

const { width, height } = Dimensions.get("window");

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;

export const styles = StyleSheet.create({
  view: {
    height: "100%"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  },
  searchbar: {
    backgroundColor: "white",
    marginLeft: scale(15),
    marginRight: scale(15),
    marginTop: scaleVertical(10),
    marginBottom: scaleVertical(5),
    borderRadius: 8,
    borderColor: "#E5E5E5",
    zIndex: 9,
    paddingHorizontal: 10
  },
  directionsContainer: {
    backgroundColor: "white",
    paddingHorizontal: 7,
    paddingVertical: 5,
    position: "absolute",
    bottom: 30,
    left: 30,
    zIndex: 999,
    borderRadius: 30,
    elevation: 5
  },
  marker: { height: 40, width: 40, resizeMode: "contain" },
  tooltip: { height: 100, width: 150, backgroundColor: "#F4F1F1", borderRadius: 10, padding: 0, margin: 0 }
});

export const autoCompleteStyles = StyleSheet.create({
  textInput: {
    height: 44,
    color: "#5d5d5d",
    fontSize: 16,
    backgroundColor: colors.COLOR_E9E9E9
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  },
  separator: {
    height: 1,
    backgroundColor: '#c8c7cc',
  }
});
