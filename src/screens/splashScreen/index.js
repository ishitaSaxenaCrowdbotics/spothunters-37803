import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { commonStyles } from "../../styles";
import { getOnboardingFlag } from "../../utils";
import { get_auth } from "../../utils/service";

const SplashScreen = (props) => {

  const [token, setToken] = useState()

  const getToken = async () => {
    let user = await get_auth();
    setToken(user?.token)
    console.log('data: ', user?.token)
  }
  
    useEffect(() => {
      let onBoardingFlag
      getToken()
       setTimeout(async() => {
        await getOnboardingFlag()
          .then(value => { 
            console.log('data: ', value); 
            onBoardingFlag = value
          })
        console.log('onboarding', onBoardingFlag)
        if(onBoardingFlag) {
          console.log('token: ', token)
          // if(token) {
          //   props.navigation.replace('MainNav');
          // } else {
            props.navigation.navigate('Login')
          // }
        } else {
          props.navigation.navigate('OnBoarding')
        }
        
       }, 3000)
      }, [token]);

  return (
    <View style={{flex: 1}}>
      <Image source={require('../../assets/Image.png')} style={[commonStyles.fullWidth, commonStyles.fullHeight]}></Image>
    </View>
  );
};

export default SplashScreen
