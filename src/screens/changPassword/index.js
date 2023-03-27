import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { changePasswordRequest, forgotPasswordRequest } from '../../utils/service';

const ChangePassword = (props) => {

  const dispatch = useDispatch()
  const [status, setStatus] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPasswordStatus] = useState('')
  const [emailId, setEmailId] = useState('')

  const onButtonPress = async () => {
    if(props.route.params.isChangePassword) {
      const reqBody = {
        current_password: currentPassword,
        password1: newPassword,
        password2: confirmPassword
      }
      const resp = await dispatch(changePasswordRequest(reqBody))
      console.log('resp: ', resp)
      Alert.alert('password changed successfully')
    } else {
      const resp = await dispatch(forgotPasswordRequest({email: 'ishita_saxena.nga@crowdbotics.com'}))
      console.log('resp: ', resp)
      setStatus(true)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
      }}>
        <FloatingTextInput 
          style={{marginTop: 24}} 
          value={props.route.params.isChangePassword ? currentPassword : emailId}
          onChangeText={(value) => props.route.params.isChangePassword ? setCurrentPassword(value) : setEmailId(value)}
          label={props.route.params.isChangePassword ? 'Current Password' : 'Email ID *'}/>
        {props.route.params.isChangePassword && 
          <>
            <FloatingTextInput 
              style={{marginTop: 16}} 
              label='New Password'
              value={newPassword}
              onChangeText={(value) => setNewPassword(value)}/>
            <FloatingTextInput 
              style={{marginTop: 16}} 
              value={confirmPassword}
              onChangeText={(value) => setConfirmPasswordStatus(value)}
              label='Confirm New Password'/>
           </>
        }
        <CustomButton 
          style={{marginTop: 16}}
          onPress={onButtonPress}
          isPrimaryButton
          label={props.route.params.isChangePassword ? 'UPDATE PASSWORD' : 'RESET PASSWORD'} />
        {status && 
          <Text style={{fontSize: 14, fontWeight: '400', color: 'red', marginTop: 24}}>
            Verification Link has been sent to your inbox. please click on verification link to reset password
          </Text>
        }
    </View>
  );
}

export default ChangePassword;
