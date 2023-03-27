import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";

const SplashScreen = (props) => {

    useEffect(() => {
       setTimeout(() => {
        props.navigation.navigate('OnBoarding')
       }, 3)
      }, []);

  return (
    <View style={{flex: 1}}>
      <Image source={require('../../assets/Image.png')} style={{height: '100%', width: '100%'}}></Image>
    </View>
  );
};

export default SplashScreen
