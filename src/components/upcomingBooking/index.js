import React, { forwardRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Linking, Platform } from 'react-native';
import { colors, commonStyles } from '../../styles';
import { styles } from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'
import QrCode from '../qrCode';
import { convertToMeterToMiles, formatTime } from '../../utils';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service'
import { getDistance } from 'geolib';
import SelectTime from '../selectTime';

const UpcomingBooking = forwardRef((props, ref) => {

    const [isModal, setModal] = useState(false)
    const [isTimeModal, setTimeModal] = useState(false)
    const [defaultOrigin, setDefaultOrigin] = useState();

    useEffect(() => {
        getCurrentLocation()
    },[])
    
    const openQrCode = () => {
        setModal(true)
    }

    const qrCode = {
        inTime: formatTime(props?.item?.start),
        endTime: formatTime(props?.item?.end),
        price: `$${props?.item?.fare}`,
        bookingID: props?.item?.id
    }

    const getCurrentLocation = async () => {
        try {
            if(Platform.OS === 'ios'){
                const locationPermissionStatus = await Geolocation.requestAuthorization("always")
                console.log('locationPermissionStatus: ', locationPermissionStatus)
                Geolocation.setRNConfiguration({
                    skipPermissionRequests: false,
                   authorizationLevel: 'always',
                 });
                Geolocation.getCurrentPosition(
                    (position) => {
                    setDefaultOrigin({
                            latitude: position?.coords?.latitude,
                            longitude: position?.coords?.longitude
                        });
                    },
                    (error) => {
                    // See error code charts below.
                    console.log('cvbhjkl', error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                request(
                    Platform.select({
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    })
                    ).then(res => {
                        if (res == "granted") {
                        Geolocation.getCurrentPosition(
                            (position) => {
                            setDefaultOrigin({
                                    latitude: position?.coords?.latitude,
                                    longitude: position?.coords?.longitude
                                });
                            },
                            (error) => {
                            console.log(error.code, error.message);
                            },
                            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                        );
                        } else {
                        }
                    });
                }
            } catch (error) {
              console.log("location set error:", error);
            }
      }

      
    const dist = () => defaultOrigin?.longitude && convertToMeterToMiles(getDistance(
        {longitude: defaultOrigin?.longitude, latitude: defaultOrigin?.latitude}, 
        {longitude: props?.item?.place?.lat, latitude: props?.item?.place?.long}))?.toFixed(1)

    const onDirection = () => {
        Linking.canOpenURL(`https://www.google.com/maps/dir/${defaultOrigin?.latitude},${defaultOrigin?.longitude}/${parseFloat(props?.item?.place?.lat)},${parseFloat(props?.item?.place?.long)}/`).then(supported => {
            if (supported) {
                Linking.openURL(`https://www.google.com/maps/dir/${defaultOrigin?.latitude},${defaultOrigin?.longitude}/${parseFloat(props?.item?.place?.lat)},${parseFloat(props?.item?.place?.long)}/`);
            } else {
                console.log("Don't know how to open URI: ");
            }
        });
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
            {defaultOrigin?.longitude &&
            <TouchableOpacity style={[commonStyles.flex2, commonStyles.alignItemsCenter]} onPress={onDirection}>
                <Icon name="directions" type='font-awesome-5' size={40} color={colors.base} />
                {/* <Image source={require('../../assets/markerButton.png')} /> */}
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                    {`${dist()}mi`}
                </Text>
            </TouchableOpacity>}
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
            <TouchableOpacity onPress={() => setTimeModal(true)}>
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
        <SelectTime isModal={isTimeModal} setModal={setTimeModal} isBooking type={props?.item?.place?.availability} data={props?.item} getBookingData={props?.getBookingData} />
    </>
  );
})

export default UpcomingBooking;
