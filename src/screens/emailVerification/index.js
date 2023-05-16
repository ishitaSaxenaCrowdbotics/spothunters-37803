import React, { useState } from 'react';
import { View, Text, Image, Alert, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { colors, commonStyles } from '../../styles';
import { resendCodeRequest, verifyEmailRequest } from '../../utils/service';
import { Icon } from 'react-native-elements';

const EmailVerification = (props) => {

    const [code, setCode] = useState('')
    const [emailId, setEmailId] = useState(props.route.params?.email)
    const dispatch = useDispatch()

    const onVerifyCode = async () => {
        const resp = await dispatch(verifyEmailRequest({pin: code, email: emailId, guest: props?.route?.params?.isGuest ? true : false})) 
        console.log(resp)
        if(resp.status){
          Alert.alert('code verified successfully')
          if(props.route.params?.isSignup){
            props.navigation.replace('MainNav', { screen: 'booking', params: { screen: 'ParkingSpotsHome' }});  
          } else {
            props.navigation.replace('MainNav');
          }
        }
    }

    const onResendCode = async () => {
      const resp1 = await dispatch(resendCodeRequest({email: emailId}))
      if(resp1?.status){
        props.navigation.navigate('EmailVerification', {emailId})
      }
    }

  return (
    <SafeAreaView style={[commonStyles.flex1, commonStyles.whiteBackground]}>
    <View
      style={[commonStyles.whiteBackground, commonStyles.flex1, commonStyles.paddingHorizontal16]}>
        <View style={[commonStyles.flexRow, commonStyles.alignItemsCenter, commonStyles.marginTop30]}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
          {/* <Image source={require('../../assets/backButton.png')} /> */}
          <Icon name="chevron-back" type='ionicon' size={24} color={colors.black} containerStyle={commonStyles.marginHorizontal16} />
          </TouchableOpacity>
          <Text style={[commonStyles.text_large_bold, commonStyles.marginLeft24]}>Verification </Text> 
        </View>
        <Text style={[commonStyles.text_small, {color: 'black', marginTop: 28}]}>
            For Security purpose we need to verify your email address.
        </Text>
        <FloatingTextInput 
            style={commonStyles.marginTop24} 
            label={'Email ID *'}
            placeholder='someone@gmail.com'
            disabled
            onChangeText={(value) => setEmailId(emailId)}
            value={emailId}/>
        <FloatingTextInput
            style={commonStyles.marginTop24} 
            label={'Verification code *'}
            placeholder='0000'
            value={code}
            onChangeText={(value) => setCode(value)}/>
        <CustomButton
            onPress={onVerifyCode}
            isPrimaryButton
            disabled={!code}
            style={commonStyles.marginTop16} 
            label={'Verify'} />
        <CustomButton 
            isPrimaryButton
            onPress={onResendCode}
            style={commonStyles.marginTop16} 
            label={'Send New Code'} />
    </View>
    </SafeAreaView>
  );
}

export default EmailVerification;
