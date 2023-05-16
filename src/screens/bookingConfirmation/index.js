import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { commonStyles } from '../../styles';
import { Icon } from 'react-native-elements'
import { formatTime } from '../../utils';
import { CustomButton } from '../../components/customButton';
import { getQr } from "../../utils/service";

const BookingConfirmation = (props) => {

    const [qr, setQr] = useState(null);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        setIsLoader(true);
        getQr({ text: 'ishita' })
          .then(res => res.json())
          .then(res => {
            setIsLoader(false);
            console.log('res')
            setQr(res.qrcode);
          })
          .catch(e => {
            setIsLoader(false);
            console.log(e);
          });
      }, [])

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{height: 180, backgroundColor: '#00AF541A', margin: 16, padding: 12}}>
            <Icon name="ios-receipt-outline" type='ionicon' size={42} color={'#00AF54'} style={[commonStyles.alignSelfStart]}/>
            <Text style={[commonStyles.text_big, commonStyles.marginTop12]}>Booking Confirmed</Text>
            <Text style={[commonStyles.text_xs, commonStyles.marginTop12, {lineHeight: 16}]}>We have booked your spot for the selected date as selected facility Please arrive at the facilfacility in due date and show the below QR code at the counter spot</Text>
        </View>
        <View style={[ commonStyles. justifyContentBetween, commonStyles.marginTop8, commonStyles.paddingHorizontal30]}>
            <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                NCP Car Park Manchester
            </Text>
            <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginTop8]}>
                {`Rental ID: 123`}
            </Text>
            <View style={[commonStyles.flexRow, commonStyles.marginTop8, commonStyles.alignItemsCenter]}>
                {/* <Image source={require('../../assets/marker.png')} style={[commonStyles.marginRight8, commonStyles.size24]} /> */}
                <Icon name="location-sharp" type='ionicon' size={25} color={'black'} />
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                    Toronto, Canada
                </Text>
            </View>
        </View>
        <View style={[commonStyles.flexRow, commonStyles. justifyContentBetween, commonStyles.marginTop16, commonStyles.paddingHorizontal30]}>
            <View>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    In time
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    fghjkl
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    Out time 
                </Text>
                <Text style={[commonStyles.text_xs_bold,commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    fghjkl
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>

                    Paid
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    $45
                </Text>
            </View>
        </View>
        {/* <View style={{alignSelf: "center"}}>
            {qr && <Image source={{ uri: `data:image/png;base64,${qr}` }} style={{height: 140, width: 140}} />}
        </View> */}
        <View style={[commonStyles.paddingHorizontal8, commonStyles.paddingVertical16, commonStyles.whiteBackground, {position: 'absolute', bottom: 0, right: 0, left: 0}]}>
                <CustomButton label={'Book New Parking'} onPress={() => props.navigation.navigate('booking')} />
        </View>
    </SafeAreaView>
  );
}

export default BookingConfirmation;
