import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, commonStyles } from '../../styles';
import { CustomButton } from '../customButton';

export const CreateAccountPopup = (props) => {
    return(
        <Modal
      visible={props.isModal}
      statusBarTranslucent={true}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => props.setModal(false)}>
        <View style={{
          flex:1, 
          backgroundColor: '#000000CC'
          }}>
          <TouchableOpacity activeOpacity={1}  onPress={() => props.setModal(false)} style={{flex:1, justifyContent: 'center',malignItems: 'center'}}>
            <View style={{padding: 32, backgroundColor: 'white', justifyContent: 'center', position: 'absolute', bottom: 0, right: 0, left: 0}}>
            <TouchableOpacity onPress={() => props.setModal(false)}>
                <Icon name="close-outline" type='ionicon' size={25} color={colors.black} style={commonStyles.alignSelfEnd} />
            </TouchableOpacity>
            <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign]}>Create an account</Text>
            <Text style={[commonStyles.text_large_bold, commonStyles.marginTop30]}>Benefits of having the account</Text>
            <Text style={[commonStyles.text_xs, commonStyles.marginTop16]}>
                Clients on Demand, LLC, (“Clients on Demand,” “we,” “us,” “our”) is committed to protecting both the personal as well as business information you share and/or store with us. This Privacy Policy applies to transactions and activities and data gathered through the Clients on Demand Website and interaction you may have with its related Social Media accounts. Please review this Privacy Policy periodically as we may revise it without notice.
                Generally, we may collect and use personal information for many purposes, including, but not limited to: billing, product and service fulfillment, understanding customer needs, providing a better website, improving products and services, and communicating with customers and potential customers regarding our products and services with third-party products and services.
            </Text>
            <View style={[commonStyles.flexRow, commonStyles.fullWidth]}>
                <CustomButton
                    onPress={() => props.navigation.navigate('Payment')}
                    style={[commonStyles.marginTop24, commonStyles.flex1, commonStyles.marginRight8]} 
                    label={'Cancel'} />
                <CustomButton
                    onPress={() => props.navigation.navigate('Login', {isSignup: true})}
                    isPrimaryButton
                    style={[commonStyles.marginTop24, commonStyles.flex1, commonStyles.marginLeft8]} 
                    label={'Sign-Up'} />
            </View>
            </View>
          </TouchableOpacity>
        </View>
    </Modal>
    )
}