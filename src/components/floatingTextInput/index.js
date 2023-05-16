import React from 'react';
import { Text, TextInput, View } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { colors, commonStyles } from '../../styles';
import styles from './styles';

const FloatingTextInput = (props) => {

  return (
    <View style={[commonStyles.marginTop20, props.style]}>
      <Text style={[commonStyles.text_small, commonStyles.marginBottom5, commonStyles.blackTextColor]}>
        {props.label}
      </Text>
      <TextInput
      multiline={props?.multiline}
      numberOfLines={props?.numberOfLines}
      {...props}
      // mode='outlined'
      // activeOutlineColor={colors.cyanBlue}
      style={[ styles.backgroundColorWhite, {borderWidth: 1,padding: 8, borderRadius: 4, borderColor: 'grey', textAlignVertical: 'center', height: props?.multiline ? 100 : null}]}
    />
    </View>
    
  );
};
export default FloatingTextInput
