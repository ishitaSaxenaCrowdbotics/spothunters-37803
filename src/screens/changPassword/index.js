import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChangePassword = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
      }}>
        <View style={{flexDirection: 'row', marginTop: 44, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={require('../../assets/backButton.png')} />
          </TouchableOpacity>
          <Text style={{marginLeft: 24, fontSize: 16, fontWeight: '600'}}>Change password</Text> 
        </View>
        <TextInput style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 24}} placeholder={props.route.params.isChangePassword ? 'Current Password' : 'Email ID *'}/>
        {props.route.params.isChangePassword && 
          <>
            <TextInput style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 16}} placeholder='New Password'/>
            <TextInput style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey',marginTop: 16}} placeholder='Confirm New Password'/>
           </>
        }
      <TouchableOpacity style={{borderRadius: 24, backgroundColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 16}} onPress={() => {}}>
          <Text style={{color: 'white', fontWeight: '700'}}>
            {props.route.params.isChangePassword ? 'UPDATE PASSWORD' : 'RESET PASSWORD'}
          </Text>
        </TouchableOpacity>
    </View>
  );
}

export default ChangePassword;
