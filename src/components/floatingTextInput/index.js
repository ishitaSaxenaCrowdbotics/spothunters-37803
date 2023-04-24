import React from 'react';
import { TextInput } from 'react-native-paper';
import { colors } from '../../styles';
import styles from './styles';

const FloatingTextInput = (props) => {

  return (
    <TextInput
      {...props}
      mode='outlined'
      activeOutlineColor={colors.cyanBlue}
      style={[props.style, styles.backgroundColorWhite]}
    />
  );
};
export default FloatingTextInput
