import { StyleSheet } from "react-native";

// to configure this module, edit the base url in options/options.js
export const path = `https://parkauthority-37803.botics.co/modules/terms-and-conditions/`;

export const title = "Terms And Conditions";

export const styles = StyleSheet.create({
  heading: {
    height: 60,
    backgroundColor: "#333333",
    padding: 20,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center"
  },
  text: {
    color: "#000000",
    fontSize: 16,
    width: "100%"
  },
  icon: { width: 18, height: 16 },
  touchableopacity: { padding: 5 },
  scrollview: { flex: 1, padding: 20 },
  header: { color: "#fff", fontSize: 16 }
});
