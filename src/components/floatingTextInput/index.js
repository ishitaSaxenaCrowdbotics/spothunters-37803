import React, {useState, useRef} from 'react';
import {View, StyleSheet, TextInput, Text, Animated} from 'react-native';
import styles from './styles';

const FloatingTextInput = (props) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState('');
  const moveText = useRef(new Animated.Value(0)).current;

  const onFocusHandler = () => {
    setIsFocused(true)
    if (!value) {
      moveTextTop();
    }
  };
  const onBlur = () => {
    setIsFocused(false)
    if (!value) {
      moveTextBottom();
    }
  };
  const onChangeText = (textValue) => {
    setValue(textValue);
    if (textValue !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -22],
  });

  const animStyle = {
    transform: [{translateY: yVal}],
  };

  return (
    <View style={[ styles.container(isFocused), props.style ]}>
      <Animated.View style={[styles.animatedStyle, animStyle]}>
        <Text style={styles.label(isFocused)}>{props.label}</Text>
      </Animated.View>
      <TextInput
        editable={props.editable}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        value={props.value}
        onBlur={onBlur}
        style={styles.input}
        onFocus={onFocusHandler}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default FloatingTextInput
