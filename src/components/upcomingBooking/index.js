import React, { forwardRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, commonStyles } from '../../styles';
import { styles } from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'
import QrCode from '../qrCode';
import { calcTotalTime, formatTime } from '../../utils';

const UpcomingBooking = forwardRef((props, ref) => {

    const [isModal, setModal] = useState(false)

    const openQrCode = () => {
        setModal(true)
    }

    const qrCode = {
        inTime: formatTime(props?.item?.start),
        endTime: formatTime(props?.item?.end),
        price: `$${props?.item?.fare}`,
        bookingID: props?.item?.id
    }

  return (
    <>
        <View style={[styles.container, {width: props?.fullView ? null : 305}]}>
        <View style={{flexDirection: 'row'}}>
            <View style={commonStyles.flex8}>
                <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                    {props?.item?.place?.name}
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginTop8]}>
                    {`Rental ID: ${props?.item?.id}`}
                </Text>
                <View style={[commonStyles.flexRow, commonStyles.marginTop8, commonStyles.alignItemsCenter]}>
                    {/* <Image source={require('../../assets/marker.png')} style={[commonStyles.marginRight8, commonStyles.size24]} /> */}
                    <Icon name="location-sharp" type='ionicon' size={25} color={'black'} />
                    <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                        {props?.item?.place?.address}
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
                    {formatTime(props?.item?.start)}
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    Out time 
                </Text>
                <Text style={[commonStyles.text_xs_bold,commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    {formatTime(props?.item?.end)}
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>

                    Paid
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    ${props?.item?.fare}
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
        <QrCode isModal={isModal} setModal={setModal} data={JSON.stringify(qrCode)} />
    </>
  );
})

export default UpcomingBooking;
