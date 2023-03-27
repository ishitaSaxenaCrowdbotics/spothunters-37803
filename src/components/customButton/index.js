import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export const CustomButton = (props) => {
    return(
        <TouchableOpacity style={[(props.isPrimaryButton ? styles.blueContainer : styles.whiteContainer), props.style]} onPress={props.onPress}>
        <Text style={props.isPrimaryButton ? styles.whiteTextStyle : styles.blueTextStyle}>
          {props.label}
        </Text>
      </TouchableOpacity>
    )
}