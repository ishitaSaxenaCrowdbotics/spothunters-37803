import React from 'react';
import { commonStyles } from '../../styles';

const { Image, TouchableOpacity } = require('react-native')

export const DrawerHeader = (props) => {

  const onDrawerHandle = () => {
    props.navigation.toggleDrawer()
  }
    return (
        <TouchableOpacity onPress={onDrawerHandle}>
            <Image source={require('../../assets/menu.png')} style={commonStyles.marginHorizontal16} />
        </TouchableOpacity>
    )
}