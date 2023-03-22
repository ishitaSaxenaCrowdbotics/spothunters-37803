import React, { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { verifyEmailRequest } from '../../utils/service';

const EmailVerification = (props) => {

    const [code, setCode] = useState('')
    const dispatch = useDispatch()

    const onVerifyCode = async () => {
        const resp = await dispatch(verifyEmailRequest({pin: code, email: 'ishita_saxena.nga@crowdbotics.com'}))
        console.log(resp)
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
        <TextInput 
            style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 24}} 
            placeholder={'Email ID *'}
            editable={false}
            value='ishita_saxena.nga@crowdbotics.com'/>
        <TextInput 
            style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 24}} 
            placeholder={'Verification code *'}
            value={code}
            onChangeText={(value) => setCode(value)}/>
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 16}} onPress={() => {}}>
          <Text style={{color: 'white', fontWeight: '700'}}>
            VERIFY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 16}} onPress={onVerifyCode}>
          <Text style={{color: 'white', fontWeight: '700'}}>
            SEND NEW CODE
          </Text>
        </TouchableOpacity>
    </View>
  );
}

export default EmailVerification;
