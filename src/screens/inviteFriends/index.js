import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { inviteFriendRequest } from '../../utils/service';

const InviteFriends = (props) => {

  const [emailID, setEmailId] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async () => {
    const resp = await dispatch(inviteFriendRequest({email: 'ishita_saxena.nga@crowdbotics.com', link: 'msg'}))
    console.log('resp: ', resp)
    if(resp.status){
      Alert.alert('link sent')
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FBFBFB', paddingHorizontal: 16, paddingTop: 5 }}>
      <Text style={{fontSize: 14, fontWeight: '400'}}>
        Share this link with your friends
      </Text>
      <FloatingTextInput
        editable={false}
        label='App Id'
        style={{marginTop: 20}} 
        value={'https://apps.apple.com/in/app'}/>
      <TouchableOpacity style={{borderRadius: 24, borderColor: '#1E8FFF', padding: 10, alignItems: 'center', marginTop: 16, borderWidth: 1}}>
        <Text style={{color: '#1E8FFF', fontWeight: '700'}}>
          Copy link to share
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 14, fontWeight: '400', textAlign: 'center', marginTop: 24}}>
        Or
      </Text>
      <Text style={{fontSize: 14, fontWeight: '400', marginTop: 24}}>
        Invite friends to join SpotHunters Via Emails
      </Text>
      <FloatingTextInput
        label='Email ID *'
        style={{marginTop: 20}} 
        value={emailID}
        onChangeText={(value) => setEmailId(value)}/>
      <CustomButton
          onPress={onSubmit}
          isPrimaryButton
          style={{marginTop: 16}} 
          label={'Send Link'} />
    </View>
  );
}

export default InviteFriends;
