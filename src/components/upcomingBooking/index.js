import React, { forwardRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, commonStyles } from '../../styles';
import { styles } from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'
import QrCode from '../qrCode';

const UpcomingBooking = forwardRef((props, ref) => {

    const [isModal, setModal] = useState(false)

    const openQrCode = () => {
        setModal(true)
    }

  return (
    <>
        <View style={[styles.container, {width: props?.fullView ? null : 305}]}>
        <View style={{flexDirection: 'row'}}>
            <View style={commonStyles.flex8}>
                <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                    NCP Car Park Manchester
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginTop8]}>
                    Rental ID: 1234567789
                </Text>
                <View style={[commonStyles.flexRow, commonStyles.marginTop8, commonStyles.alignItemsCenter]}>
                    {/* <Image source={require('../../assets/marker.png')} style={[commonStyles.marginRight8, commonStyles.size24]} /> */}
                    <Icon name="location-sharp" type='ionicon' size={25} color={'black'} />
                    <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                        Toronto, Canada
                    </Text>
                </View>
            </View>
            <View style={[commonStyles.flex2, commonStyles.alignItemsCenter]}>
                <Icon name="directions" type='font-awesome-5' size={40} color={colors.base} />
                {/* <Image source={require('../../assets/markerButton.png')} /> */}
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                    2 km
                </Text>
            </View>
        </View>
        <View style={[commonStyles.flexRow, commonStyles. justifyContentBetween, commonStyles.marginTop16]}>
            <View>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    In time
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    10:00AM
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    out time 
                </Text>
                <Text style={[commonStyles.text_xs_bold,commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    5:00 PM
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>

                    Paid
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    $8.00
                </Text>
            </View>
        </View>
        <View style={commonStyles.divider} />
        <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.alignItemsCenter]}>
            <TouchableOpacity >
                <Text style={[commonStyles.text_xs_thick, commonStyles.blueTextColor]}>
                    Modify
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qrCodeContainer} onPress={openQrCode}>
                <View style={[commonStyles.flexRow, commonStyles.justifyContentCenter, commonStyles.alignItemsCenter]}>
                {/* <Image source={require('../../assets/qrCodeIcon.png')} /> */}
                <Icon name="qr-code-2" type='material' size={25} color={colors.white} />
                <Text style={[commonStyles.text_xs_thick, commonStyles.whiteTextColor, commonStyles.marginLeft5]}>
                    View QR
                </Text>
                </View>
            </TouchableOpacity>
        </View>
        </View>
        <QrCode isModal={isModal} setModal={setModal} data={'data'} />
    </>
  );
})

export default UpcomingBooking;
