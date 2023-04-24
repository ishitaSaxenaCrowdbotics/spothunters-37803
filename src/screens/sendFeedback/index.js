import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { commonStyles } from '../../styles';
import { feedBackRequest, get_auth } from '../../utils/service';
import styles from './styles';

const SendFeedback = (props) => {

  const dispatch = useDispatch()
  const [msg, setMsg] = useState('')
  const [emailID, setEmailID] = useState(userData?.email)

  let userData = useSelector(state => state?.app?.userData)

  const onSubmit = async () => {
    const resp = await dispatch(feedBackRequest({email: emailID, message: msg}))
    console.log('resp: ', resp)
    if(resp.id){
      Alert.alert('feedback sent')
    }
  }

  useEffect(() => {
    setEmailID(userData?.email)
    console.log('userData: ', userData)
  },[userData])

  return (
    <View style={styles.container}>
      <Text style={commonStyles.text_large_thick}>
        Help us to improve
      </Text>
      <Text style={[commonStyles.text_small, commonStyles.marginTop24]}>
        Would you help us improve your experience by your feedback?
      </Text>
      <FloatingTextInput
        label='Email ID *'
        style={commonStyles.marginTop20} 
        value={emailID}
        disabled
        onChangeText={() => setEmailID(emailID)}/>
      <FloatingTextInput
        label='Message*'
        multiline 
        numberOfLines={10}
        style={commonStyles.marginTop20} 
        value={msg}
        onChangeText={(value) => setMsg(value)}/>
        <CustomButton
          onPress={onSubmit}
          isPrimaryButton
          disabled={!msg}
          style={commonStyles.marginTop24} 
          label={'Submit'} />
    </View>
  );
}

export default SendFeedback;
