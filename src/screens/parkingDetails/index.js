import React, { useState } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { CustomButton } from '../../components/customButton';
import { colors, commonStyles } from '../../styles';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import { calculateTotalHours, convertToMeterToMiles } from '../../utils';
import SelectTime from '../../components/selectTime';
import { CreateAccountPopup } from '../../components/createAccountPopUp';
import { LogoutPopup } from '../../components/logOutPopup';
import { bookSpotRequest } from '../../utils/service';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ParkingDetails = (props) => { 

    const dispatch = useDispatch()
    const [iscreateAccountModal, setCreateAccountModal] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [tabSelected, setTabSelected] = useState(2)
    let parkingPlace = useSelector(state => state?.app?.parkingPlace)
    let userData = useSelector(state => state?.app?.userData)
    let filters = useSelector(state => state?.app?.filters)
    console.log('filters: ', filters)

    const bookingData = () => {
        if (filters?.availability === 'Monthly'){
            return moment(filters?.month).format("MMMM, YYYY")
        } else if (filters?.availability === 'Daily'){
            return moment(filters?.start*1000).format("YYYY-MM-DD")
        } else if (filters?.availability === 'Weekly'){
            return moment(filters?.start*1000).format("YYYY-MM-DD") + ' - ' + moment(filters?.end*1000).format("YYYY-MM-DD")
        } else {
            return moment(filters?.start*1000).format("YYYY-MM-DD, HH:MM:SS") + ' - ' + moment(filters?.end*1000).format("YYYY-MM-DD, HH:MM:SS") + ', ' + filters?.day
        }
    }

    const dist = convertToMeterToMiles(getDistance(
        {longitude: props.route.params?.origin?.longitude, latitude: props.route.params?.origin?.latitude}, 
        {longitude: parkingPlace?.long, latitude: parkingPlace?.lat}))?.toFixed(1)

    const renderItem = ({item}) => {
        return(
            <View style={{backgroundColor: '#E9E9E9', padding: 8, marginRight: 16, flexDirection: 'row', marginBottom: 8}}>
                <Text style={[commonStyles.text_xxs_thick, { marginRight: 2}]}>{item?.name}</Text>
                <Icon name="send" type='feather' size={15} color={colors.black} />
            </View>
        )
    }

    const renderImages = ({item}) => {
        return(
               <Image source={{uri: item?.image}} style={{width: Dimensions.get("window").width*0.8, marginRight: 5, borderRadius: 8}} />
        )
    }

    const bookNow = async () => {

        console.log('enddate: ', filters?.endDate)
        const req = {
            "place": parkingPlace?.id,
            end: filters?.availability === 'Monthly' ? moment(filters?.month).format("YYYY-MM-DDThh:mm:ss") + 'Z' : moment(filters?.endDate).format("YYYY-MM-DDThh:mm:ss") + 'Z',
            start: filters?.availability === 'Monthly' ? moment(filters?.month).format("YYYY-MM-DDThh:mm:ss") + 'Z' : moment(filters?.startDate).format("YYYY-MM-DDThh:mm:ss") + 'Z',
            "fare": parkingPlace?.price?.toFixed(2),
            "days": filters?.day?.toString(),
            "payment": false,
            "payment_mode": "Cash"
        }

        console.log('req: ', req)

        const resp = await dispatch(bookSpotRequest(req))
        console.log('resp: ', resp)
        if(resp?.status){
            if(userData?.is_guest){
                setModalVisible(false)
                setCreateAccountModal(true)
            } else {
                props.navigation.reset({routes:[{name: 'Confirmation'}]})
            }
        }
    }

    const numofHours = calculateTotalHours(filters?.start, filters?.end) * filters?.day.length
    console.log('diff: ', numofHours)
    const parkingFare = parkingPlace?.availability === 'Hourly' ? numofHours * parseFloat(parkingPlace?.price?.toFixed(2)) : parkingPlace?.price?.toFixed(2)
    const commission = parkingFare * parseFloat(parkingPlace?.commission?.toFixed(2)) * .01
    const total_price = parseFloat(commission?.toFixed(2)) + parseFloat(parkingFare?.toFixed(2))

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
                        <Icon name="map-pin" type='font-awesome' size={25} color={colors.black} />
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
                {parkingPlace?.is_payment_available && 
                        <View style={[commonStyles.flexRow, commonStyles.paddingVertical16, commonStyles.fullWidth, commonStyles.justifyContentBetween]}>
                            <TouchableOpacity style={[commonStyles.flex1, commonStyles.marginRight20, commonStyles.padding8, {backgroundColor: tabSelected === 1 ? colors.base : colors.COLOR_FBFBFB}]} onPress={() => setTabSelected(1)}>
                                <Text style={[tabSelected === 1 ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>{`Pay Reservation Fee $${commission?.toFixed(2)}`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.flex1, commonStyles.padding8, {backgroundColor: tabSelected === 2 ? colors.base : colors.COLOR_FBFBFB}]} onPress={() => setTabSelected(2)}>
                                <Text style={[tabSelected === 2 ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>{`Pay Full Fare $${total_price.toFixed(2)}`}</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </ScrollView>
        <View style={{paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[commonStyles.text_xs_bold, {textAlign: 'center'}]}>
                   {`Parking Fare: $${parkingFare.toFixed(2)}`}
                </Text>
                <Text style={[commonStyles.text_xs_bold, {textAlign: 'center'}]}>
                    {`Reservation Fee: $${commission?.toFixed(2)}`}
                </Text>
                <Text style={[commonStyles.text_xs_bold, {textAlign: 'center'}]}>
                    {`Total Fee: $${total_price.toFixed(2)}`}
                </Text>
            </View>
            <View style={{flex: 0.5}}>
                <CustomButton label={`Pay ${(parkingPlace?.is_payment_available && tabSelected === 1) ? `$${commission?.toFixed(2)}` : `$${total_price.toFixed(2)}`}`} isPrimaryButton onPress={() => setModalVisible(true)} />
            </View>
        </View>
        <CreateAccountPopup isModal={iscreateAccountModal} setModal={setCreateAccountModal} navigation={props.navigation}/>
        <LogoutPopup
            visible={modalVisible} 
            header='Booking Confirmation'
            subHeader='Are you sure you want to book?'
            primaryButton='Yes'
            navigation={props.navigation} 
            onLogout={bookNow}
            onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}

export default ParkingDetails;
