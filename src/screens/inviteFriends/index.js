import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { inviteFriendRequest } from '../../utils/service';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { commonStyles } from '../../styles';
import styles from './styles';

const InviteFriends = (props) => {

  const [emailID, setEmailId] = useState('')
  const [appID, setappID] = useState('https://apps.apple.com/in/app')
  const dispatch = useDispatch()

  const onSubmit = async () => {
    const resp = await dispatch(inviteFriendRequest({email: emailID, link: appID}))
    console.log('resp: ', resp)
    if(resp.status){
      Alert.alert('link sent')
    }
  }

  const onCopy = () => {
    Clipboard.setString(appID);
    Toast.show({
      type: 'info',
      text1: 'Copied',
      text2: 'The link has been copied',
      visibilityTime: 3000
    });
  }

  const onLoginValidate = () => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(emailID){
      return false
    }
    return true
  }

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.container}>
        <Text style={commonStyles.text_small}>
          Share this link with your friends
        </Text>
        <FloatingTextInput
          disabled
          label='App Id' 
          style={commonStyles.marginTop20}
          value={appID}
          onChangeText={() => setappID(appID)}/>
        <CustomButton label={'Copy link to share'} style={commonStyles.marginTop16} onPress={onCopy} />
        <Text style={[commonStyles.text_small, commonStyles.centerTextAlign, commonStyles.marginTop24]}>
          Or
        </Text>
        <Text style={[commonStyles.text_small, commonStyles.marginTop24]}>
          Invite friends to join Spot Hunters Via Email
        </Text>
        <FloatingTextInput
          label='Email ID *'
          placeholder='someone@gmail.com'
          style={commonStyles.marginTop20} 
          value={emailID}
          onChangeText={(value) => setEmailId(value)}/>
        <CustomButton
            onPress={onSubmit}
            isPrimaryButton
            disabled={onLoginValidate()}
            style={commonStyles.marginTop16} 
            label={'Send Link'} />
        <Toast />
      </View>
    </SafeAreaView>
  );
}

export default InviteFriends;
