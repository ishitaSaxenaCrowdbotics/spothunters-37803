import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { verifyEmailRequest } from '../../utils/service';

const EmailVerification = (props) => {

    const [code, setCode] = useState('')
    const [emailId, setEmailId] = useState('')
    const dispatch = useDispatch()

    const onVerifyCode = async () => {
        const resp = await dispatch(verifyEmailRequest({pin: code, email: emailId}))
        console.log(resp)
        if(resp.status){
          Alert.alert('code verified successfully')
        }
    }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
      }}>
        <View style={{flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={require('../../assets/backButton.png')} />
          </TouchableOpacity>
          <Text style={{marginLeft: 24, fontSize: 16, fontWeight: '600'}}>Verification </Text> 
        </View>
        <Text style={{fontSize: 14, fontWeight: '400', color: 'black', marginTop: 28}}>
            For Security purpose we need to verify your email address.
        </Text>
        <FloatingTextInput 
            style={{marginTop: 24}} 
            label={'Email ID *'}
            onChangeText={(value) => setEmailId(value)}
            value={emailId}/>
        <FloatingTextInput
            style={{marginTop: 24}} 
            label={'Verification code *'}
            value={code}
            onChangeText={(value) => setCode(value)}/>
        <CustomButton
            onPress={onVerifyCode}
            isPrimaryButton
            style={{marginTop: 16}} 
            label={'VERIFY'} />
        <CustomButton 
            isPrimaryButton
            style={{marginTop: 16}} 
            label={'SEND NEW CODE'} />
    </View>
  );
}

export default EmailVerification;
