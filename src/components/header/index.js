import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors, commonStyles } from '../../styles';
import { Icon } from 'react-native-elements';

const { Image, TouchableOpacity } = require('react-native')

export const Header = () => {
    const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  }
    return (
        <TouchableOpacity onPress={goBack}>
          <Icon name="chevron-back" type='ionicon' size={24} color={colors.black} containerStyle={commonStyles.marginHorizontal16} />
            {/* <Image source={require('../../assets/backButton.png')} style={commonStyles.marginHorizontal16} /> */}
        </TouchableOpacity>
    )
}