import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/customButton';
import { reset } from '../../state/actions';
import { colors, commonStyles } from '../../styles';
import { removeAuthData } from '../../utils';
import { deleteAccountRequest } from '../../utils/service';
import styles from './styles';
import { Icon } from 'react-native-elements';

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
    <SafeAreaView style={commonStyles.flex1}>
        <View style={styles.container}>
            {true ? 
                <View style={[commonStyles.justifyContentCenter, commonStyles.alignItemsCenter, commonStyles.paddingHorizontal16]}> 
                    {/* <Image source={require('../../assets/checkSquare.png')} /> */}
                    <Icon name="checkmark-circle-outline" type='ionicon' size={100} color={'#00AF54'} />
                    <Text style={[commonStyles.text_xl_bold, commonStyles.marginTop16]}>
                        Delete successfully! 
                    </Text>
                    <Text style={[commonStyles.text_small, commonStyles.marginTop24]}>
                        Your account has been delete successfully 
                    </Text>
                    <CustomButton 
                            isPrimaryButton
                            style={[commonStyles.fullWidth, commonStyles.marginTop24]} 
                            label={'Create account'} />
                </View>
                : <>
                    <View style={styles.paddingHorizontal34}>
                        <Text style={commonStyles.text_large_thick}>
                            Are you sure you want to delete account?
                        </Text>
                        <Text style={[commonStyles.text_xs, commonStyles.marginTop8]}>
                            Clients on Demand, LLC, (“Clients on Demand,” “we,” “us,” “our”) is committed to protecting both the personal as well as business information you share and/or store with us. This Privacy Policy applies to transactions and activities and data gathered through the Clients on Demand Website and interaction you may have with its related Social Media accounts. Please review this Privacy Policy periodically as we may revise it without notice.
                            Generally, we may collect and use personal information for many purposes, including, but not limited to: billing, product and service fulfillment, understanding customer needs, providing a better website, improving products and services, and communicating with c
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            style={[commonStyles.flex1, commonStyles.marginRight20]} 
                            onPress={onDelete}
                            label={'Yes delete'}/>
                        <CustomButton 
                            isPrimaryButton
                            style={[commonStyles.flex1, commonStyles.marginRight20]} 
                            onPress={() => {}}
                            label={'Cancel'} />
                    </View>
                </>
            }
        </View>
    </SafeAreaView>
  );
}

export default DeleteAccount;
