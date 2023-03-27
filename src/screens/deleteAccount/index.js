import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import { reset } from '../../state/actions';
import { removeAuthData } from '../../utils';
import { deleteAccountRequest } from '../../utils/service';

const DeleteAccount = (props) => {

    const [isDeleted, setIsDeleted] = useState(false)
    const dispatch = useDispatch()
    const onDelete = async () => {
        const resp = await dispatch(deleteAccountRequest())
        console.log('resp: ', resp)
        if(resp.status){
            Alert.alert('Account deleted successfully')
            removeAuthData()
            dispatch(reset())
            setIsDeleted(true)
            props.navigation.reset({routes:[{name: 'Login'}]})
        }
    }

  return (
    <View style={{ flex: 1, backgroundColor: '#FBFBFB', paddingTop: 32 }}>
        {isDeleted ? 
            <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16}}> 
                <Image source={require('../../assets/checkSquare.png')} />
                <Text style={{fontSize: 20, fontWeight: '600', marginTop: 16}}>
                    Delete successfully! 
                </Text>
                <Text style={{fontSize: 14, fontWeight: '400', marginTop: 24}}>
                    Your account has been delete successfully 
                </Text>
                <CustomButton 
                        isPrimaryButton
                        style={{marginTop: 24, width: '100%'}} 
                        label={'Create account'} />
            </View>
            : <>
                <View style={{paddingHorizontal: 34}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                        Are you sure you want to delete account?
                    </Text>
                    <Text style={{fontSize: 12, fontWeight: '400', marginTop: 8}}>
                        Clients on Demand, LLC, (“Clients on Demand,” “we,” “us,” “our”) is committed to protecting both the personal as well as business information you share and/or store with us. This Privacy Policy applies to transactions and activities and data gathered through the Clients on Demand Website and interaction you may have with its related Social Media accounts. Please review this Privacy Policy periodically as we may revise it without notice.
                        Generally, we may collect and use personal information for many purposes, including, but not limited to: billing, product and service fulfillment, understanding customer needs, providing a better website, improving products and services, and communicating with c
                    </Text>
                </View>
                <View style={{flexDirection: 'row', position: 'absolute', bottom: 8, justifyContent: 'center', marginHorizontal: 16, marginTop: 16}}>
                    <CustomButton
                        style={{flex: 1, marginRight: 20}} 
                        onPress={onDelete}
                        label={'Yes delete'}/>
                    <CustomButton 
                        isPrimaryButton
                        style={{flex: 1, marginRight: 20}} 
                        onPress={onDelete}
                        label={'Cancel'} />
                </View>
            </>
        }
    </View>
  );
}

export default DeleteAccount;
