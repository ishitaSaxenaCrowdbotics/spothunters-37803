import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChangePassword = (props) => {

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
      }}>
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
