import React, { useState } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { CustomButton } from '../../components/customButton';
import { colors, commonStyles } from '../../styles';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import { convertToMeterToMiles } from '../../utils';
import SelectTime from '../../components/selectTime';
import { CreateAccountPopup } from '../../components/createAccountPopUp';

const ParkingDetails = (props) => { 

    const [isModal, setModal] = useState(false)
    const [timeData, setTimeData] = useState()
    const [iscreateAccountModal, setCreateAccountModal] = useState(false)
    let parkingPlace = useSelector(state => state?.app?.parkingPlace)
    let userData = useSelector(state => state?.app?.userData)
    let filters = useSelector(state => state?.app?.filters)
    console.log('filters: ', filters)

    const bookingData = () => {
        if (filters.availability === 'Monthly'){
            return filters.month
        } else if (filters.availability === 'Daily'){
            return new Date(filters.startDate)?.toLocaleDateString()
        } else if (filters.availability === 'Weekly'){
            return new Date(filters.startDate)?.toLocaleDateString() + ' - ' + new Date(filters.endDate)?.toLocaleDateString()
        } else {
            return filters.startDate + ' - ' + filters.endDate + ', ' + filters.day
        }
    }

    const dist = convertToMeterToMiles(getDistance(
        {longitude: props.route.params?.origin?.longitude, latitude: props.route.params?.origin?.latitude}, 
        {longitude: parkingPlace?.long, latitude: parkingPlace?.lat}))?.toFixed(1)

    const renderItem = ({item}) => {
        return(
            <View style={{backgroundColor: '#E9E9E9', padding: 8, marginRight: 16, flexDirection: 'row', marginBottom: 8}}>
                <Text style={[commonStyles.text_xxs_thick, { marginRight: 2}]}>{item.name}</Text>
                <Icon name="send" type='feather' size={15} color={colors.black} />
            </View>
        )
    }

    const renderImages = ({item}) => {
        return(
               <Image source={{uri: item?.image}} style={{width: Dimensions.get("window").width*0.8, marginRight: 5, borderRadius: 8}} />
        )
    }

    const selectTime = type => {
        setTimeData(type)
    }

    const bookNow = () => {
        console.log('userData: ', userData)
        if(userData?.is_guest){
            setCreateAccountModal(true)
        } else {
            props.navigation.navigate('Payment')
        }
    }

  return (
      <SafeAreaView style={{backgroundColor: '#FBFBFB', flex: 1}}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
            <View style={{height: 170}} >
                <FlatList 
                    data={parkingPlace?.places_image}
                    horizontal
                    nestedScrollEnabled
                    renderItem={renderImages}
                    keyExtractor={(item, index) => `${item.id}-${index}`}/>
            </View>
            <View style={{margin: 16}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginRight: 20, flex: 0.80}}>
                        <Text style={[commonStyles.text_large_thick, {color: '#151313', marginBottom: 8}]}>
                            {parkingPlace?.name}
                        </Text>
                        <Text style={[commonStyles.text_xs, {color: '#6A6A6A'}]}>
                            {parkingPlace?.address}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 0.2, alignItems: 'center'}}>
                        <Icon name="directions" type='font-awesome-5' size={40} color={colors.base} />
                        <Text style={[commonStyles.text_xs, {color: '#6A6A6A'}]}>
                            {dist} mi
                        </Text>
                    </View>
                </View>
                <Text style={[commonStyles.text_small_thick, {marginVertical: 25}]}>Amenities</Text>
                <FlatList 
                    numColumns={4}
                    nestedScrollEnabled
                    data={parkingPlace?.place_amenity}
                    showsVerticalScrollIndicator={true}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item.id}-${index}`}/>
                <Text style={[commonStyles.text_small_thick, commonStyles.marginVertical12]}>Parking Type : {parkingPlace?.availability}</Text>
                <Text>{bookingData()}</Text>
            </View>
        </ScrollView>
        <View style={{paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[commonStyles.text_xs_bold, {textAlign: 'center'}]}>
                    $ {parkingPlace?.price?.toFixed(2)}
                </Text>
            </View>
            <View style={{flex: 0.5}}>
                <CustomButton label={'Book Spot'} isPrimaryButton onPress={bookNow} />
            </View>
        </View>
        <SelectTime isModal={isModal} setModal={setModal} isBooking type={parkingPlace?.availability} selectTime={selectTime} />
        <CreateAccountPopup isModal={iscreateAccountModal} setModal={setCreateAccountModal} navigation={props.navigation}/>
    </SafeAreaView>
  );
}

export default ParkingDetails;
