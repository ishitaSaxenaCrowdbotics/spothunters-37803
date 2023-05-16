import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import PreviousBooking from '../../components/previousBooking';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import { useDispatch, useSelector } from 'react-redux';
import { colors, commonStyles } from '../../styles';
import styles from './styles';
import { previousBookingRequest, upcomingBookingRequest } from '../../utils/service';

const Home = (props) => {

    const [loadingUp, setLoadingUp] = useState(true)
    const [loadingPrev, setLoadingPrev] = useState(true)

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    const dispatch = useDispatch()

    let userData = useSelector(state => state?.app?.userData)
    let upcomingBookings = useSelector(state => state?.app?.upcomingBookings)
    let prevBookings = useSelector(state => state?.app?.prevBookings)

    const renderItem = ({item}) => {
        return(<UpcomingBooking navigation={props.navigation} item={item} getBookingData={getBookingData}/>)
    }
    const renderItemPrev = ({item}) => {
        return(<PreviousBooking item={item} />) 
    }

    const getBookingData = async (isLoad) => {
        if(isLoad){
            setLoadingUp(true)
            setLoadingPrev(true)
        }
        const resp1 = await dispatch(previousBookingRequest())
        if (resp1?.count > 0){
            console.log('prev resp: ', resp1)
            setLoadingPrev(false)
        } else {
            setLoadingPrev(false)
        }
        const res2 = await dispatch(upcomingBookingRequest())
        if (res2?.count > 0){
            setLoadingUp(false)
            console.log('upcoming resp1: ', res2)
        } else {
            setLoadingUp(false)
        }
    }

    console.log('upcoming upcomingBookings: ', upcomingBookings)

    useEffect(() => {
        getBookingData()
    }, [])

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={commonStyles.justifyContentCenter}
        refreshControl={
            <RefreshControl
              refreshing={loadingUp || loadingPrev}
              onRefresh={() => getBookingData(true)}
            />
        }>
            <View style={styles.subContainer}>
                <Text style={commonStyles.text_xl_thick}>
                    My Bookings
                </Text>
                { upcomingBookings?.length > 0 && <TouchableOpacity onPress={() => props.navigation.navigate('BookListing', {screen: 'BookingsList', params: {upcoming: true}})}>
                    <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                        Show All
                    </Text>
                </TouchableOpacity>}
            </View>
            {loadingUp ? <ActivityIndicator style={{marginTop: 50}} size="large" color={colors.base} /> : 
                <>{ upcomingBookings?.length > 0 ?
                    <FlatList 
                        nestedScrollEnabled
                        horizontal
                        data={upcomingBookings}
                        showsVerticalScrollIndicator={true}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${item.id}-${index}`}/> : <View style={commonStyles.alignItemsCenter}><Text style={commonStyles.text_large}>no results found...</Text></View>
                    }
                </>
            }
            {!userData?.is_guest &&
                <>
                    <View style={styles.subContainer}>
                        <Text style={commonStyles.text_xl_thick}>
                            Previous Reservations
                        </Text>
                        { prevBookings?.length > 0 && <TouchableOpacity onPress={() => props.navigation.navigate('BookListing', {screen: 'BookingsList'})}>
                            <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                                Show All
                            </Text>
                        </TouchableOpacity>}
                    </View>
                    {loadingPrev ? <ActivityIndicator style={{marginTop: 50}} size="large" color={colors.base} /> : 
                       <>{ prevBookings?.length > 0 ?
                       <FlatList 
                            nestedScrollEnabled
                            horizontal
                            data={prevBookings}
                            showsVerticalScrollIndicator={true}
                            renderItem={renderItemPrev}
                            keyExtractor={(item, index) => `${item.id}-${index}`}/> : <View style={commonStyles.alignItemsCenter}><Text style={commonStyles.text_large}>no results found...</Text></View>
                        }
                        </>
                    }
                </>
            }
        </ScrollView>
        <View style={[commonStyles.paddingHorizontal8, commonStyles.paddingVertical16, commonStyles.whiteBackground]}>
                <CustomButton label={'Book New Parking'} isPrimaryButton onPress={() => props.navigation.navigate('booking')} />
        </View>
    </SafeAreaView>
  );
}

export default Home;
