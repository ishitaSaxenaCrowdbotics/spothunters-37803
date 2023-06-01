import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { onAppleConnect, onFacebookConnect, onGoogleConnect, SocialButtonsView } from '../../../modules/social-login/screens/loginsignup';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, resendCodeRequest, signUpRequest } from '../../utils/service';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import { setRememberMeAction } from '../../state/actions';
import { commonStyles } from '../../styles';
import styles from './styles';

const Login = (props) => {
  const [isAccountCreate, setIsAccountCreate] = useState(props?.route?.params?.isSignup)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState(']')//test1@gmail.com jainlavika19+95@gmail.com mandeep.kumar+1@crowdbotics.com
  const [password, setPassword] = useState('') //test lavika19 Admin123
  const [mobileNumber, setMobileNumber] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')// reNxsgmgx5
  const [isloading, setIsloading] = useState(false)

  const dispatch = useDispatch()
  let token = useSelector(state => state?.app?.token)

  const onLoginPress = async () => {
    if (isAccountCreate) {
      const signUpData = {
        name:"",
        email,
        password,
        phone: mobileNumber
      }
      const resp1 = await dispatch(signUpRequest(signUpData))
      if (resp1?.status){
        props.navigation.navigate('EmailVerification', {email, isSignup: props.route.params?.isSignup})
      } else {
        if(resp1?.data?.statusCode === 401){
          Alert.alert(
            'Email ID not verified',
            'Please verify your email ID',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'Verify', onPress: async() => {
                const resp1 = await dispatch(resendCodeRequest({email}))
                if(resp1?.status){
                  props.navigation.navigate('EmailVerification', {email})
                }
            }},
        
            ],
            { cancelable: false }
          )
        } else if (resp1?.data?.statusCode === 403){
          Alert.alert('Email-ID already registered. Please try to login')
        } else {
          Alert.alert(resp?.message)
        }
      }
    } else {
      setIsloading(true)
      if(rememberMe){
        await dispatch(setRememberMeAction())
      }
      const loginData = { email, password }
      const resp = await dispatch(loginRequest(loginData))
      console.log('resp: ', resp)
      if (resp?.status){
        setIsloading(false)
        props.navigation.replace('MainNav');
      } else {
        setIsloading(false)
        if(resp?.data?.statusCode === 401){
          Alert.alert(
            'Email ID not verified',
            'Please verify your email ID',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'Verify', onPress: async() => {
                const resp1 = await dispatch(resendCodeRequest({email}))
                if(resp1?.status){
                  props.navigation.navigate('EmailVerification', {email})
                }
              }},
        
            ],
            { cancelable: false }
          )
        }else {
          Alert.alert(resp?.message)
        }
      }
    }
  }

  const socialAuths = () => {
    if(props.route.params?.isSignup){
      props.navigation.replace('MainNav', { screen: 'booking', params: { screen: 'ParkingSpotsHome' }});  
    } else {
      props.navigation.replace('MainNav');
    }
  }

  const onLoginValidate = () => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(email && password){
      return false
    }
    return true
  }
  const onSignValidate = () => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(email && password && toggleCheckBox && mobileNumber && confirmPassword && (confirmPassword === password)){
      return false
    }
    return true
  }

  const onLoginSignup = () => {
    setIsAccountCreate((preState) => !preState)
    setPassword('')
  }

  return (
    <SafeAreaView style={[commonStyles.flex1, commonStyles.whiteBackground]}>
    <ScrollView contentContainerStyle={[commonStyles.justifyContentCenter, commonStyles.whiteBackground]}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={[commonStyles.size111, commonStyles.alignSelfCenter, commonStyles.size111]} />
        <Text style={styles.headingText}>Spot Hunters</Text>
        <Text style={[commonStyles.text_large_bold, commonStyles.marginTop12, commonStyles.centerTextAlign]}>{isAccountCreate ? 'Sign Up' : 'Sign In'}</Text>
        <FloatingTextInput
          label={'Email ID *'}
          placeholder='someone@gmail.com'
          value={email}
          onChangeText={(value) => setEmail(value)}/>
        <FloatingTextInput 
          secureTextEntry={isAccountCreate ? false : true }
          label={isAccountCreate ? 'mobile number *' : 'Password *'}
          placeholder={'******'}
          value={isAccountCreate ? mobileNumber : password}
          onChangeText={(value) => {isAccountCreate ? setMobileNumber(value) : setPassword(value)}}/>
        {isAccountCreate && 
          <>
            <FloatingTextInput 
            secureTextEntry
            label='Password *'
            placeholder={'******'}
            value={password}
            onChangeText={(value) => setPassword(value)}
            />
            <FloatingTextInput 
            secureTextEntry
            label='Confirm Password *'
            placeholder={'******'}
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}/>
          </>
        }
        {!isAccountCreate && 
        <View style={[commonStyles.marginTop12, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
          <View style={{flexDirection:'row', alignItems: 'center'}}>
          <CheckBox 
              value={rememberMe}
              onValueChange={(newValue) => setRememberMe(newValue)}/>
          <Text style={[commonStyles.text_xxs_bold, commonStyles.marginLeft5]}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('ChangePassword', {name: 'Forgot Password'})}>
            <Text style={[commonStyles.text_xxs_thick, commonStyles. centerTextAlign, commonStyles.blueTextColor, commonStyles.alignSelfEnd, commonStyles.textAlignVerticalCenter]}>
              Forgot Password?
              </Text>
          </TouchableOpacity>
        </View>
          }
        {isAccountCreate && 
          <View style={[commonStyles.flexRow, commonStyles.marginTop16]}>
            <CheckBox 
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
            <View style={[commonStyles.marginLeft5, commonStyles.flexRow, commonStyles.alignItemsCenter]}>
              <Text style={commonStyles.text_xxs_thick }>I agree to the </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('TermsAndConditions')}>
              <Text style={[commonStyles.text_xxs_thick, commonStyles.blueTextColor]}>Terms and conditions </Text>
              </TouchableOpacity>
              <Text style={commonStyles.text_xxs_thick }>and </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('PrivacyPolicy')}>
              <Text style={[commonStyles.text_xxs_thick, commonStyles.blueTextColor]}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        <CustomButton
          disabled={isAccountCreate ? onSignValidate() : onLoginValidate()}
          onPress={onLoginPress}
          isPrimaryButton
          style={commonStyles.marginTop30} 
          label={isAccountCreate ? 'Create Account' : 'Login'} />
          {isloading && <ActivityIndicator  size="large" style={commonStyles.marginTop10}
                color='#1E8FFF' />}
        <View style={commonStyles.marginTop30}>
        <SocialButtonsView
          loading={false}
          onFacebookConnect={() => onFacebookConnect(dispatch, props.navigation, socialAuths)}
          onGoogleConnect={() => onGoogleConnect(dispatch, props.navigation, socialAuths)}
          onAppleConnect={() => onAppleConnect(dispatch, props.navigation, socialAuths)}
        />
      </View>
        <Text style={styles.textStyle}>{isAccountCreate ? "Already have an account?" : "Don't have account?"}</Text>
        <CustomButton
          onPress={onLoginSignup}
          isPrimaryButton
          style={commonStyles.marginTop12} 
          label={isAccountCreate ?   'Login' : 'Create an account'} />
        <TouchableOpacity onPress={() => props.navigation.navigate('ProceedAsGuest')}>
          <Text style={[commonStyles.text_xs, commonStyles.marginTop16, commonStyles.centerTextAlign, commonStyles.blueTextColor]}>Proceed as a guest</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export default Login;
