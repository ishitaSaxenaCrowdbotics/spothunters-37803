import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../utils/service';
import { removeAuthData } from '../../utils';
import { reset } from '../../state/actions';
import { commonStyles } from '../../styles';
import { styles } from './styles';

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
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.centerContainer} onPress={props.onClose}>
                    <View style={styles.subContainer}>
                        <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign]}>
                            Log out
                        </Text>
                        <Text style={[commonStyles.text_small, styles.headerText]}>
                            Do you want to log out?
                        </Text>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={props.onClose}>
                            <Text style={[commonStyles.text_small_bold, commonStyles.whiteTextColor]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logOutButton} onPress={onLogout}>
                            <Text style={[commonStyles.text_small_bold, commonStyles.blueTextColor]}>
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