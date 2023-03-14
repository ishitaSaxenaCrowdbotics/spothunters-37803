import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Login = (props) => {
  const [isAccoutnCreate, setIsAccountCreate] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{ paddingHorizontal: 17, flex: 1, paddingVertical: 30}}>
        <TouchableOpacity style={{backgroundColor:'#1E8FFF', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}} onPress={() => setIsAccountCreate(false)}>
          <Image source={require('../../../screens/assets/arrow.png')}
                      resizeMode={'cover'}
                      style={{ width: 20, height: 10 }}></Image>
        </TouchableOpacity>
        <Image source={require('../../assets/logo.png')} style={{height: 111, width: 111, alignSelf: 'center'}}></Image>
        {/* <View style={{height: 111, width: 111, backgroundColor: 'grey', borderRadius: 24, alignSelf: 'center'}} /> */}
        <Text style={{marginTop: 10, textAlign: 'center', fontSize: 24, color: '#1E8FFF', fontWeight: '600'}}>SpotHunter </Text>
        <Text style={{marginTop: 12, textAlign: 'center', fontSize: 16, fontWeight: '600'}}>Sign In</Text>
        <TextInput style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} placeholder={isAccoutnCreate ? 'Email ID' : 'Email ID/username'}/>
        <TextInput style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} placeholder={isAccoutnCreate ? 'mobile number' : 'password'}/>
        {isAccoutnCreate && 
          <>
            <TextInput style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} placeholder='password'/>
            <TextInput style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 20}} placeholder='confirm password'/>
          </>
        }
        {!isAccoutnCreate && <Text style={{marginTop: 12, textAlign: 'center', fontSize: 10, color: '#1E8FFF', alignSelf: 'flex-end'}}>forgot password?</Text>}
        {isAccoutnCreate && 
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
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 30}} onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: 'white', fontWeight: '700'}}>
          {isAccoutnCreate ? 'CREATE ACCOUNT' : 'LOGIN'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 30}} onPress={() => props.navigation.navigate('Login')}>
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
        </TouchableOpacity>
        {!isAccoutnCreate && 
          <>
            <Text style={{marginTop: 32, textAlign: 'center', fontSize: 13}}>Don't have account?</Text>
            <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 12}} onPress={() => setIsAccountCreate(true)}>
              <Text style={{color: 'white', fontWeight: '700'}}>
              create a account
              </Text>
            </TouchableOpacity>
          </>
        }
        <Text style={{marginTop: 16, textAlign: 'center', fontSize: 10, color: '#1E8FFF'}}>Proceed as a guest</Text>
      </View>
    </ScrollView>
  );
}

export default Login;
