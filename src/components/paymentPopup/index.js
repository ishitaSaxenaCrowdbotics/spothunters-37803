import React from 'react';
import { Alert, Dimensions, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from '../../styles';
import { CustomButton } from '../customButton';
import { styles } from './styles';
import { GooglePayButton, ApplePayButton } from "@stripe/stripe-react-native";

export const PaymentPopup = (props) => {
    const deviceWidth = Dimensions.get("window").width;

    return(
        <Modal 
            transparent
            visible={props.visible}
            onRequestClose={props?.onClose}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.centerContainer} onPress={props.onClose}>
                    <View style={styles.subContainer}>
                    <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign, commonStyles.marginVertical25]}>
                          Select Payment Method
                        </Text>
                        <View style={[commonStyles.justifyContentCenter]}>
                          <CustomButton label='Pay with card' isPrimaryButton onPress={props?.bookNow}/>
                            {Platform.OS === "android" && props?.enableGooglePay && (
                                <GooglePayButton
                                    disabled={!props?.gPayinitialized}
                                    style={[
                                    styles.payButton,
                                    { width: deviceWidth / 2.5, height: 52, marginTop: 25 }
                                    ]}
                                    type="pay"
                                    onPress={props?.payGoogle}
                                />
                            )}
                            {props?.enableApplePay && props?.isApplePaySupported && (
                                <ApplePayButton
                                    onPress={() => console.log('tesing')}
                                    type="plain"
                                    borderRadius={4}
                                    style={[
                                        styles.payButton,
                                        { width: deviceWidth / 2.5, height: 52, marginTop: 25 }
                                        ]}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}