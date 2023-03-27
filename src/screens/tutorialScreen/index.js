import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../components/customButton";
import { tutorialRequest, get_auth } from "../../utils/service";

const TutorialScreen = (props) => {
    const dispatch = useDispatch()
    let videoData = useSelector(state => state?.app?.tutorial)
    console.log('video: ', videoData[0]?.file)

    const [opacity, setOpacity] = useState(0)
    const [btnText, setBtnText] = useState('Skip')

    useEffect(() => {
        dispatch(tutorialRequest())
      }, []);

    const onProceed = async () => {
      // let user = await get_auth()
      // if(user) {
      //   props.navigation.navigate('Home')
      // } else {
        props.navigation.navigate('Login')
      // }
    }

    const videoError = () => {
      return (
        <Text style={{flex: 1, textAlignVertical: 'center', alignSelf: 'center', fontSize: 16,fontWeight: '500'}}>Failed Loading the Video...</Text>
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
    <View style={{flex: 1}}>
      <Video
          source={{uri: videoData[0]?.file}} 
          style={{flex: 0.9}}
          resizeMode="cover"
          onError={videoError}
          onBuffer={onBuffer}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onEnd={onEnd}/>
        <ActivityIndicator
                animating
                size="large"
                color='#1E8FFF'
                style={{opacity: opacity, position: 'absolute', top: 250, right: 50, left: 50}}
            />
      <CustomButton
          onPress={onProceed}
          isPrimaryButton
          style={{ flex: 0.1, zIndex: 1, position: 'absolute', bottom: 10, right: 16, left: 16}} 
          label={btnText} />
    </View>
  );
};

export default TutorialScreen
