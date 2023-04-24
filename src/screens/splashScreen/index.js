import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { commonStyles } from "../../styles";
import { getOnboardingFlag } from "../../utils";

const SplashScreen = (props) => {
  
    useEffect(() => {
      let onBoardingFlag
       setTimeout(async() => {
        await getOnboardingFlag()
          .then(value => { 
            console.log('data: ', value); 
            onBoardingFlag = value
          })
        console.log('onboarding', onBoardingFlag)
        if(onBoardingFlag) {
          props.navigation.navigate('Login')
        } else {
          props.navigation.navigate('OnBoarding')
        }
        
       }, 3000)
      }, []);

  return (
    <View style={{flex: 1}}>
      <Image source={require('../../assets/Image.png')} style={[commonStyles.fullWidth, commonStyles.fullHeight]}></Image>
    </View>
  );
};

export default SplashScreen
