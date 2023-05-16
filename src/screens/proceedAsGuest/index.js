import React, { useState } from 'react';
import { View, Text, Alert, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import FloatingTextInput from '../../components/floatingTextInput';
import { commonStyles } from '../../styles';
import { proceedGuestRequest } from '../../utils/service';
import styles from './styles';

const ProceedAsGuest = (props) => {

  const [emailId, setEmailId] = useState('')
  const [mob, setMob] = useState('')

  const dispatch = useDispatch()

  const proceesGuest = async () => {
    const reqData = {
      email: emailId,
      phone: mob
    }
    const resp1 = await dispatch(proceedGuestRequest(reqData))
      if (resp1?.status){
        // props.navigation.navigate('MainNav')
        props.navigation.navigate('EmailVerification', {email: emailId, isGuest: true})
      } else {
        Alert.alert('Something went wrong')
      }
  }

  return (
    <SafeAreaView style={commonStyles.flex1}>
    <View style={styles.container}>
      <Text style={[commonStyles.text_small, commonStyles.marginTop24]}>
        To proceed as a guest, kindly provide your email address and mobile number
      </Text>
      <FloatingTextInput
        label='Email ID *'
        placeholder='someone@gmail.com'
        value={emailId}
        onChangeText={(value) => setEmailId(value)}/>
      <FloatingTextInput
      label='mobile number *'
      placeholder='+999999999999'
      value={mob}
      onChangeText={(value) => setMob(value)}/>
        <CustomButton
          onPress={proceesGuest}
          isPrimaryButton
          style={commonStyles.marginTop24} 
          label={'Proceed'} />
    </View>
    </SafeAreaView>
  );
}

export default ProceedAsGuest;
