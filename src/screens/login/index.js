import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { SocialButtonsView } from '../../../modules/social-login/screens/loginsignup';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, signUpRequest } from '../../utils/service';

const Login = (props) => {
  const [isAccountCreate, setIsAccountCreate] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [email, setEmail] = useState('ishita_saxena.nga@crowdbotics.com')
  const [password, setPassword] = useState('reNxsgmgx5')
  const [mobileNumber, setMobileNumber] = useState('+91-9972537712')
  const [confirmPassword, setConfirmPassword] = useState('reNxsgmgx5')

  const dispatch = useDispatch()
  let token = useSelector(state => state?.app?.token)

  const onLoginPress = async () => {
    if (isAccountCreate) {
      const signUpData = {
        name:"ishita",
        email,
        password,
        phone:"+91-9972537712"
      }
      const resp1 = await dispatch(signUpRequest(signUpData))
      if (resp1?.status){
        props.navigation.navigate('EmailVerification')
      } else {
        Alert.alert('Internet connection issue')
      }
    } else {
      const loginData = { email, password }
      const resp = await dispatch(loginRequest(loginData))
      if (resp?.status){
        props.navigation.navigate('Home')
      } else {
        Alert.alert('Please enter correct credentials')
      }
    }
  }

  const onLoginSignup = () => {
    setIsAccountCreate((preState) => !preState)
    setPassword('')
  }

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{ paddingHorizontal: 17, flex: 1, paddingVertical: 30}}>
        <Image source={require('../../assets/logo.png')} style={{height: 111, width: 111, alignSelf: 'center'}}></Image>
        {/* <View style={{height: 111, width: 111, backgroundColor: 'grey', borderRadius: 24, alignSelf: 'center'}} /> */}
        <Text style={{marginTop: 10, textAlign: 'center', fontSize: 24, color: '#1E8FFF', fontWeight: '600'}}>SpotHunter</Text>
        <Text style={{marginTop: 12, textAlign: 'center', fontSize: 16, fontWeight: '600'}}>Sign In</Text>
        <TextInput 
          style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} 
          placeholder={isAccountCreate ? 'Email ID' : 'Email ID/username'}
          value={email}
          onChangeText={(value) => setEmail(value)}/>
        <TextInput 
          style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} 
          placeholder={isAccountCreate ? 'mobile number' : 'password'}
          value={isAccountCreate ? mobileNumber : password}
          onChangeText={(value) => isAccountCreate ? setMobileNumber : setPassword(value)}/>
        {isAccountCreate && 
          <>
            <TextInput 
            style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} 
            placeholder='password'
            value={password}
            onChangeText={(value) => setPassword(value)}
            />
            <TextInput 
            style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} 
            placeholder='confirm password'
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}/>
          </>
        }
        {!isAccountCreate && 
          <TouchableOpacity onPress={() => props.navigation.navigate('ChangePassword', {isChangePassword: true})}>
            <Text style={{marginTop: 12, textAlign: 'center', fontSize: 10, color: '#1E8FFF', alignSelf: 'flex-end'}}>
              forgot password?
              </Text>
          </TouchableOpacity>}
        {isAccountCreate && 
          <View style={{flexDirection: 'row',marginTop: 16}}>
            <CheckBox value={toggleCheckBox}
              onValueChange={setToggleCheckBox} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 10}}>I agree to the </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('TermsAndConditions')}>
              <Text style={{color: '#1E8FFF', fontSize: 10}}>Terms and conditions </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 10}}>and </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('PrivacyPolicy')}>
              <Text style={{color: '#1E8FFF', fontSize: 10}}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 30}} onPress={onLoginPress}>
          <Text style={{color: 'white', fontWeight: '700'}}>
          {isAccountCreate ? 'CREATE ACCOUNT' : 'LOGIN'}
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 30}}>
        <SocialButtonsView
          loading={false}
          onFacebookConnect={() => onFacebookConnect(dispatch, navigation)}
          onGoogleConnect={() => onGoogleConnect(dispatch, navigation)}
          onAppleConnect={() => onAppleConnect(dispatch, navigation)}
        />
      </View>
        {/* <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 30}} onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: 'white', fontWeight: '700'}}>
          Login with google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 30}} onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: 'white', fontWeight: '700'}}>
          Login with facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 30}} onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: 'white', fontWeight: '700'}}>
          Login with apple
          </Text>
        </TouchableOpacity> */}
        
        <Text style={{marginTop: 32, textAlign: 'center', fontSize: 13}}>{isAccountCreate ? "Already have an account?" : "Don't have account?"}</Text>
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 12}} onPress={onLoginSignup}>
          <Text style={{color: 'white', fontWeight: '700'}}>
          {isAccountCreate ?   'Login' : 'create a account'}
          </Text>
        </TouchableOpacity>
          
        <Text style={{marginTop: 16, textAlign: 'center', fontSize: 10, color: '#1E8FFF'}}>Proceed as a guest</Text>
      </View>
    </ScrollView>
  );
}

export default Login;
