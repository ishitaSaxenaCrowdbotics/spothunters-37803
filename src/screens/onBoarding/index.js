import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, Dimensions, SafeAreaView } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { CustomButton } from "../../components/customButton";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { commonStyles } from "../../styles";
import styles from "./styles";


const OnBoarding = (props) => {

  const [index, setIndex] = useState(0)
  const isCarousel = useRef(null);

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
      <View style={[commonStyles.flex1, commonStyles.justifyContentCenter, commonStyles.alignItemsCenter, commonStyles.paddingHorizontal30]}>
        <Image source={item.image} style={styles.size280}/>
        <Text style={[commonStyles.text_big_bold, styles.marginTop42, commonStyles.centerTextAlign]}>{item.title}</Text>
        <Text style={[commonStyles.text_small_thick, commonStyles.marginTop12, commonStyles.centerTextAlign]}>{item.text}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={commonStyles.flex1}>
    <View style={commonStyles.fullHeight}>
      <Carousel
        ref={isCarousel}
        windowSize={Dimensions.get('window').width}
        data={slides}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.dotStyle}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: '#1E8FFF80',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, styles.paddingHorizontal48]}>
        <CustomButton
          onPress={() => { isCarousel?.current?.snapToPrev()}}
          style={[styles.flex5, commonStyles.marginRight20]}
          label={'Prev'} />
          <CustomButton
          onPress={() => { isCarousel?.current?.snapToNext() }}
          style={styles.flex5}
          label={'Next'} />
      </View>
      <CustomButton
        onPress={() => props.navigation.navigate('TutorialScreen')}
        isPrimaryButton
        style={styles.margin30} 
        label={'Get Started'} />
    </View>
    </SafeAreaView>
  );
};

export default OnBoarding
