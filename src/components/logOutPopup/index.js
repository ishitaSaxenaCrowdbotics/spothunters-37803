import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../utils/service';
import { removeAuthData } from '../../utils';
import { reset } from '../../state/actions';

export const LogoutPopup = (props) => {

    const dispatch = useDispatch()
    const onLogout = async () => {
        const resp = await dispatch(logoutRequest())
            removeAuthData()
            dispatch(reset())
            props.navigation.reset({routes:[{name: 'Login'}]})
        console.log('resp: ', resp)
        if(resp.status){
            Alert.alert('loggged out successfully')
            props.onClose()
            removeAuthData()
            dispatch(reset())
            props.navigation.reset({routes:[{name: 'Login'}]})
        }
    }

    return(
        <Modal 
            transparent
            visible={props.visible}>
            <View style={{
                flex:1, 
                backgroundColor: '#000000CC'
                }}>
                <TouchableOpacity activeOpacity={1} style={{flex:1, justifyContent: 'center', alignItems: 'center'}} onPress={props.onClose}>
                    <View style={{backgroundColor: 'white', borderRadius: 8, padding: 24}}>
                        <Text style={{fontWeight: '600', fontSize: 20, textAlign: 'center'}}>
                            Log out
                        </Text>
                        <Text style={{fontWeight: '400', fontSize: 14, textAlign: 'center', marginTop: 24}}>
                            Your password has been reset successfully 
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: 24, justifyContent: 'space-between'}}>
                        <TouchableOpacity style={{backgroundColor: '#1E8FFF', borderRadius: 24, alignItems: 'center', flex: 1,  padding: 10, marginRight: 20}} onPress={props.onClose}>
                            <Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderRadius: 24, borderColor: '#1E8FFF', padding: 10, alignItems: 'center', borderWidth: 1, flex: 1}} onPress={onLogout}>
                            <Text style={{color: '#1E8FFF', fontSize: 14, fontWeight: '600'}}>
                                Log out
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}