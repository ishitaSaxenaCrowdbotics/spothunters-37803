import React, { useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { CustomButton } from "../../components/customButton";

const OnBoarding = (props) => {

    useEffect(() => {
      }, []);

      const slides = [
        {
          key: 1,
          title: 'Lorem Ipsum is simply',
          text: 'At magnum periculum adiit in quo aut perferendis doloribus asperiores repellat hanc ego assentior.',
          image: require('../../assets/image1.jpeg'),
          backgroundColor: '#59b2ab',
        },
        {
          key: 2,
          title: 'Lorem Ipsum is simply',
          text: 'At magnum periculum adiit in quo aut perferendis doloribus asperiores repellat hanc ego assentior.',
          image: require('../../assets/image2.jpeg'),
          backgroundColor: '#febe29',
        },
        {
          key: 3,
          title: 'Lorem Ipsum is simply',
          text: 'At magnum periculum adiit in quo aut perferendis doloribus asperiores repellat hanc ego assentior.',
          image: require('../../assets/image2.jpeg'),
          backgroundColor: '#22bcb5',
        }
      ];
      const renderItem = ({ item }) => {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={item.image} style={{width: 280, height: 280}}/>
            <Text style={{marginTop: 42, textAlign: 'center'}}>{item.title}</Text>
            <Text style={{marginTop: 12, textAlign: 'center'}}>{item.text}</Text>
          </View>
        );
      }
      const _renderNextButton = () => {
        return (
          <View style={{borderRadius: 20, borderWidth: 1, borderColor: '#1E8FFF', padding: 10, alignItems: 'center', width: 90}}>
              <Text style={{color: '#1E8FFF'}}>
              Next
              </Text>
          </View>
        )
      }
      const _renderPrevButton = () => {
        return (
          <View style={{borderRadius: 20, borderWidth: 1, borderColor: '#1E8FFF', padding: 10, alignItems: 'center', width: 90}}>
              <Text style={{color: '#1E8FFF'}}>
              Prev
              </Text>
          </View>
        )
      }

  return (
    <View style={{ flex: 1, paddingHorizontal: 48 }}>
      <AppIntroSlider 
        renderItem={renderItem} 
        data={slides} 
        onDone={() => props.navigation.navigate('Login')} 
        showPrevButton
        showDoneButton={false}
        renderNextButton={_renderNextButton}
        renderPrevButton={_renderPrevButton}
        activeDotStyle={{backgroundColor: '#1E8FFF'}}
        dotStyle={{backgroundColor:'#1E8FFF80'}}
        prevLabel={'Prev'}/>
        <CustomButton
          onPress={() => props.navigation.navigate('TutorialScreen')}
          isPrimaryButton
          style={{marginVertical: 30}} 
          label={'GET STARTED'} />
      {/* <View style={{height: 280, width: 280, backgroundColor: 'grey', borderRadius: 24}} />
      <Text style={{marginTop: 42, textAlign: 'center'}}>Lorem Ipsum is simply </Text>
      <Text style={{marginTop: 12, textAlign: 'center'}}>At magnum periculum adiit in quo aut perferendis doloribus asperiores repellat hanc ego assentior. </Text>
      <View style={{flexDirection: 'row', marginTop: 40}}>
          <TouchableOpacity style={{borderRadius: 24, borderWidth: 1, borderColor: '#1E8FFF', padding: 10, flex: 1, alignItems: 'center', marginRight: 20}}>
              <Text style={{color: '#1E8FFF'}}>
              PREV
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius: 24, borderWidth: 1, borderColor: '#1E8FFF', padding: 10, flex: 1, alignItems: 'center'}}>
              <Text style={{color: '#1E8FFF'}}>
              NEXT
              </Text>
          </TouchableOpacity>
      </View>
      <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 30}} onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: 'white'}}>
          GET STARTED
          </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default OnBoarding
