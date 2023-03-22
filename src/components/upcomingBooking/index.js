import React, { forwardRef } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UpcomingBooking = forwardRef((props, ref) => {

  return (
    <>
        <View style={{
            backgroundColor: 'white',
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 15,
            marginVertical: 10,
            marginHorizontal: 16,
            width: 305,
            elevation: 5}}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.8}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: '#151313'}}>
                    NCP Car Park Manchester
                </Text>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', marginTop: 8}}>
                    Rental ID: 1234567789
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Image source={require('../../assets/marker.png')} style={{marginRight: 8, width: 24, height: 24}} />
                    <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A'}}>
                        Toronto, Canada
                    </Text>
                </View>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
                <Image source={require('../../assets/markerButton.png')} />
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A'}}>
                    2 km
                </Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
            <View>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', textAlign: 'center', marginBottom: 5}}>
                    In time
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000000', textAlign: 'center'}}>
                    10:00AM
                </Text>
            </View>
            <View>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', textAlign: 'center', marginBottom: 5}}>
                    out time 
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000000', textAlign: 'center'}}>
                    5:00 PM
                </Text>
            </View>
            <View>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', textAlign: 'center', marginBottom: 5}}>
                    Paid
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000000', textAlign: 'center'}}>
                    $8.00
                </Text>
            </View>
        </View>
        <View style={{backgroundColor: '#6A6A6A', height: 1, width: '100%', marginVertical: 8}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity>
                <Text style={{fontSize: 12, fontWeight: '500', color: '#1E8FFF'}}>
                    Modify
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#1E8FFF', borderRadius: 37, paddingVertical: 6,  width: 113}} onPress={() => props.navigation.navigate('qrCode')}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/qrCodeIcon.png')} />
                <Text style={{fontSize: 12, fontWeight: '500', color: 'white', marginLeft: 5}}>
                    View QR
                </Text>
                </View>
            </TouchableOpacity>
        </View>
        </View>
    </>
  );
})

export default UpcomingBooking;
