import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { colors, commonStyles } from '../../styles';
import { changePasswordRequest, forgotPasswordRequest } from '../../utils/service';

const ChangePassword = (props) => {

  const dispatch = useDispatch()
  const [status, setStatus] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailId, setEmailId] = useState('') 
  const [isloading, setIsloading] = useState(false)

  const onButtonPress = async () => {
    if(props.route.params?.isChangePassword) {
      setIsloading(true)
      const reqBody = {
        current_password: currentPassword,
        password1: newPassword,
        password2: confirmPassword
      }
      const resp = await dispatch(changePasswordRequest(reqBody))
      console.log('resp: ', resp)
      if(resp?.status){
        setIsloading(false)
        Alert.alert('password changed successfully')
      } else {
        setIsloading(false)
        Alert.alert(resp?.message)
      }
    } else {
      const resp = await dispatch(forgotPasswordRequest({email: emailId}))
      console.log('resp: ', resp)
      if(resp?.status){
        setStatus(true)
      } else {
        Alert.alert('Enter a registered email address.')
      }
    }
  }

  const onValidate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(reg.test(emailId)){
      return false
    }
    return true
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
      }}>
        <FloatingTextInput 
          secureTextEntry={props.route.params?.isChangePassword}
          style={commonStyles.marginTop16} 
          value={props.route.params?.isChangePassword ? currentPassword : emailId}
          onChangeText={(value) => props.route.params?.isChangePassword ? setCurrentPassword(value) : setEmailId(value)}
          label={props.route.params?.isChangePassword ? 'Current Password' : 'Email ID *'}/>
        {props.route.params?.isChangePassword && 
          <>
            <FloatingTextInput 
              secureTextEntry
              style={commonStyles.marginTop16} 
              label='New Password'
              value={newPassword}
              onChangeText={(value) => setNewPassword(value)}/>
            <FloatingTextInput 
              secureTextEntry
              style={commonStyles.marginTop16} 
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              label='Confirm New Password'/>
           </>
        }
        <CustomButton 
          style={commonStyles.marginTop16}
          onPress={onButtonPress}
          isPrimaryButton
          disabled={props.route.params?.isChangePassword ? !(newPassword && confirmPassword && currentPassword) : onValidate()}
          label={props.route.params?.isChangePassword ? 'UPDATE PASSWORD' : 'RESET PASSWORD'} />
        {status && 
          <Text style={[commonStyles.text_small, commonStyles.marginTop24, commonStyles.redTextColor]}>
            Verification Link has been sent to your inbox. please click on verification link to reset password
          </Text>
        }
        {isloading && <ActivityIndicator  size="large" style={commonStyles.marginTop10}
                color={colors.base} />}
    </View>
  );
}

export default ChangePassword;
