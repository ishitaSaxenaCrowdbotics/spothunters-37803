import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import { styles } from "./styles";
import HTML from "react-native-render-html";

const PrivacyPolicy = ({ navigation }) => {
  const contentWidth = useWindowDimensions().width;
  const [htmlContent, setHtmlContent] = useState(
    "<h3> Loading Privacy Policy... </h3>"
  );

  useEffect(() => {
    // change the root url below to your project's url.
    fetch(`https://parkauthority-37803.botics.co/modules/privacy-policy/`)
      .then((response) => response.json())
      .then((data) => setHtmlContent(data[0].body))
      .catch((err) => {
        console.log(err);
        setHtmlContent(
          "<h3> Privacy Policy could not be loaded at this time.</h3>"
        );
        alert("Privacy Policy could not be loaded at this time.");
      });
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FBFBFB'
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <HTML
          source={{ html: htmlContent }}
          contentWidth={contentWidth}
          style={styles.heading}
        />
      </ScrollView>
    </View>
  );
};

export default {
  title: "Privacy Policy",
  navigator: PrivacyPolicy
};
