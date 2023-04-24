import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../components/customButton";
import { commonStyles } from "../../styles";
import { setOnboardingFlag } from "../../utils";
import { tutorialRequest, get_auth } from "../../utils/service";
import styles from "./styles";

const TutorialScreen = (props) => {
    const dispatch = useDispatch()
    let videoData = useSelector(state => state?.app?.tutorial)
    console.log('video: ', videoData?.results)

    const [opacity, setOpacity] = useState(0)
    const [btnText, setBtnText] = useState('Skip')
    const [pause, setPause] = useState(false)

    useEffect(() => {
        dispatch(tutorialRequest())
    }, []);

    useEffect(() => {
          const blur = props.navigation.addListener('blur', () => {
          setPause(true)
        });
        const focus = props.navigation.addListener('focus', () => {
        setPause(false)
      });
      return blur, focus;
    }, [props.navigation]);

    const onProceed = async () => {
      setOnboardingFlag() 
      // let user = await get_auth()
      // console.log('reme: ', user?.user?.token + 'n: ' + rememberMe)
      // if(rememberMe && user) {
      //   props.navigation.navigate('Home')
      // } else {
        props.navigation.navigate('Login')
      // }
    }

    const videoError = () => {
      return (
        <Text style={[commonStyles.text_large_thick, commonStyles.flex1, commonStyles.alignSelfCenter, commonStyles.textAlignVerticalCenter]}>Failed Loading the Video...</Text>
      )
    }

    const onLoadStart = () => {
      setOpacity(1);
  }
  
  const onLoad = () => {
      setOpacity(0);
  }
  
  const onBuffer = ({isBuffering}) => {
      setOpacity(isBuffering ? 1 : 0);
  }

  const onEnd = () => {
    setBtnText('Proceed')
  }

  return (
    <View style={commonStyles.flex1}>
      {(videoData?.results && videoData?.results?.length > 0) &&
      <Video
          source={{uri: videoData?.results[0]?.file}} 
          paused={pause}
          style={{flex: 0.9}}
          resizeMode="cover"
          onError={videoError}
          onBuffer={onBuffer}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onEnd={onEnd}/>}
        <ActivityIndicator
                animating
                size="large"
                color='#1E8FFF'
                style={[styles.loaderStyle, {opacity: opacity}]}
            />
      <CustomButton
          onPress={onProceed}
          isPrimaryButton
          style={styles.proceedButton} 
          label={btnText} />
    </View>
  );
};

export default TutorialScreen
