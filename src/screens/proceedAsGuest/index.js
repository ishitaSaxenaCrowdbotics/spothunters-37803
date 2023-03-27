import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';

const ProceedAsGuest = (props) => {

  const [emailId, setEmailId] = useState('')

  return (
    <View style={{ flex: 1, backgroundColor: '#FBFBFB', paddingHorizontal: 16, paddingTop: 5 }}>
      <Text style={{fontSize: 14, fontWeight: '400', marginTop: 24}}>
        For Security purpose we need to verify your email address.
      </Text>
      <FloatingTextInput
        editable={false}
        label='Email ID *'
        style={{marginTop: 20}} 
        value={emailId}
        onChangeText={(value) => setEmailId(value)}/>
        <CustomButton
          onPress={() => props.navigation.navigate('TutorialScreen')}
          isPrimaryButton
          style={{marginTop: 24}} 
          label={'Proceed'} />
    </View>
  );
}

export default ProceedAsGuest;
