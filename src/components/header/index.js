import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { Image, TouchableOpacity } = require('react-native')

export const Header = () => {
    const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  }
    return (
        <TouchableOpacity onPress={goBack}>
            <Image source={require('../../assets/backButton.png')} style={{marginHorizontal: 16}} />
        </TouchableOpacity>
    )
}