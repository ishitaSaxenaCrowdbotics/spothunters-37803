import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import PreviousBooking from '../../components/previousBooking';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from '../../styles';
import styles from './styles';
import { previousBookingRequest, upcomingBookingRequest } from '../../utils/service';

const BookingsList = (props) => {

    const [searchText, setSearchText] = useState('')
    const [loadingUp, setLoadingUp] = useState(false)
    const [loadingPrev, setLoadingPrev] = useState(false)
    const dispatch = useDispatch()
    let upcomingBookings = useSelector(state => state?.app?.upcomingBookings)
    let prevBookings = useSelector(state => state?.app?.prevBookings)

    const getBookingData = async () => {
        if (props?.route?.params?.upcoming) {
            setLoadingUp(true)
            const res2 = await dispatch(upcomingBookingRequest())
            if (res2?.count > 0){
                setLoadingUp(false)
                console.log('resp1: ', res2)
            } else {
                setLoadingUp(false)
            }
        } else {
            setLoadingPrev(true)
            const resp1 = await dispatch(previousBookingRequest())
            if (resp1?.count > 0){
                console.log('resp: ', resp1)
                setLoadingPrev(false)
            } else {
                setLoadingPrev(false)
            }
        }
    }

    useEffect(() => {
        getBookingData()
    }, [])

    const renderItemPrev = ({item}) => {
        return(<PreviousBooking fullView item={item} />) 
    }
    const renderItem = ({item}) => {
        return(<UpcomingBooking navigation={props.navigation} fullView item={item}/>)
    }

    const onSearch = async (value) => { 
        setSearchText(value)
        setLoadingPrev(true)
        const resp1 = await dispatch(previousBookingRequest(value))
        if (resp1?.count > 0){
            console.log('resp: ', resp1)
            setLoadingPrev(false)
        } else {
            setLoadingPrev(false)
        }
    }
    
  return (
      <SafeAreaView style={styles.container}>
        {!props?.route?.params?.upcoming &&
            <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.fullWidth, commonStyles.alignItemsCenter, commonStyles.paddingHorizontal16, commonStyles.marginTop10]}>
                <FloatingTextInput
                    style={{width: '78%'}}
                    value={searchText}
                    onChangeText={(value) => onSearch(value)}
                    placeholder='Search Here...'
                    label='Search Here...'/>
                <TouchableOpacity style={styles.settingButton}>
                    <Image source={require('../../assets/settingIcon.png')} />
                </TouchableOpacity>
            </View>
        }
            {props?.route?.params?.upcoming ? 
                <FlatList 
                    nestedScrollEnabled
                    data={upcomingBookings?.results}
                    style={commonStyles.fullWidth}
                    showsVerticalScrollIndicator={true}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    refreshControl={
                        <RefreshControl
                          refreshing={loadingUp}
                          onRefresh={getBookingData}
                        />}/> :
                <FlatList 
                    nestedScrollEnabled
                    data={prevBookings?.results}
                    style={commonStyles.fullWidth}
                    showsVerticalScrollIndicator={true}
                    renderItem={renderItemPrev}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    refreshControl={
                        <RefreshControl
                          refreshing={loadingPrev}
                          onRefresh={getBookingData}
                        />}/>
            }
    </SafeAreaView>
  );
}

export default BookingsList;
