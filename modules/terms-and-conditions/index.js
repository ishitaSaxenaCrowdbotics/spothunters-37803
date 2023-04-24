import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import HTML from "react-native-render-html";
import { path, styles, title } from "./options";

const TermsAndConditions = ({ navigation }) => {
  const contentWidth = useWindowDimensions().width;
  const [htmlContent, setHtmlContent] = useState("<h1>Loading...</h1>");

  useEffect(() => {
    // Set your API's URL via Module Options - in options.js
    fetch(path)
      .then((response) => response.json())
      .then((data) => setHtmlContent(data.results[0].body))
      .catch((err) => {
        console.log(err);
        return setHtmlContent("<h1>Error Loading Terms and Conditions</h1>");
    });
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#FBFBFB', padding: 16 }}>
      <ScrollView style={{ flex: 1 }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
    </View>
  );
};

export default {
  title: "Terms and Conditions",
  navigator: TermsAndConditions
};
