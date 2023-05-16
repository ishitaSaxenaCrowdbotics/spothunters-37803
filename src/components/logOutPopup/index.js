import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from '../../styles';
import { styles } from './styles';

export const LogoutPopup = (props) => {

    return(
        <Modal 
            transparent
            visible={props.visible}
            onRequestClose={props?.onClose}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.centerContainer} onPress={props.onClose}>
                    <View style={styles.subContainer}>
                        <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign]}>
                            {props?.header}
                        </Text>
                        <Text style={[commonStyles.text_small, styles.headerText]}>
                            {props?.subHeader}
                        </Text>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={props.onClose}>
                            <Text style={[commonStyles.text_small_bold, commonStyles.whiteTextColor]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logOutButton} onPress={props?.onLogout}>
                            <Text style={[commonStyles.text_small_bold, commonStyles.blueTextColor]}>
                                {props?.primaryButton}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}