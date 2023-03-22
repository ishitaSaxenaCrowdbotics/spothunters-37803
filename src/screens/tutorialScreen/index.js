import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import { tutorialRequest } from "../../utils/service";

const TutorialScreen = (props) => {
    const dispatch = useDispatch()
    let videoData = useSelector(state => state?.app?.tutorial)
    let data = useSelector(state => state?.app?.data)
    console.log('video: ', video)
    const [video, setVideo] = useState('')

    console.log('data: ', data)

    useEffect(() => {
        dispatch(tutorialRequest())
      }, []);

    useEffect(() => {
        setVideo(videoData[0]?.file)
    }, [videoData]);

  return (
    <View style={{flex: 1}}>
      <Video source={{uri: video}} style={{flex: 1}} />
      <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', zIndex: 1, position: 'absolute', bottom: 10, right: 16, left: 16}} onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: 'white'}}>
            PROCEED
          </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutorialScreen
