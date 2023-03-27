import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { feedBackRequest } from '../../utils/service';

const SendFeedback = (props) => {

  const dispatch = useDispatch()
  const [msg, setMsg] = useState('')

  const onSubmit = async () => {
    const resp = await dispatch(feedBackRequest({email: 'ishita_saxena.nga@crowdbotics.com', message: msg}))
    console.log('resp: ', resp)
    if(resp.id){
      Alert.alert('feedback sent')
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FBFBFB', paddingHorizontal: 16, paddingTop: 5 }}>
      <Text style={{fontSize: 16, fontWeight: '500'}}>
        Help us to improve
      </Text>
      <Text style={{fontSize: 14, fontWeight: '400', marginTop: 24}}>
        Would you help us improve your experience by your feedback?
      </Text>
      <FloatingTextInput
        editable={false}
        label='Email ID *'
        style={{marginTop: 20}} 
        value={'ishita@gmail.com'}/>
      <FloatingTextInput
        label='Message*'
        multiline 
        numberOfLines={10}
        style={{marginTop: 20}} 
        value={msg}
        onChangeText={(value) => setMsg(value)}/>
        <CustomButton
          onPress={onSubmit}
          isPrimaryButton
          style={{marginTop: 24}} 
          label={'Submit'} />
    </View>
  );
}

export default SendFeedback;
