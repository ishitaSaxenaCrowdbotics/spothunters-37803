import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import ParkingCompReservation from '../../components/parkingCompReservation';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import styles from './styles';
import { colors, commonStyles } from '../../styles';
import { ParkingCompHomeRequest } from '../../utils/service';
import { useDispatch, useSelector } from 'react-redux';

const ParkingCompHome = (props) => {

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    let bookings = useSelector(state => state?.app?.parkingCompHome)
    
    const getBookingData = async (isLoad) => {
        setLoading(true)
        const resp1 = await dispatch(ParkingCompHomeRequest())
        if (resp1?.count > 0){
            console.log('prev resp: ', resp1)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBookingData()
    },[])
    
    const renderItem = ({ item, index }) => {
        return(<ParkingCompReservation navigation={props.navigation} item={item} getBookingData={getBookingData}/>)
    }

    const onSearch = async (value) => { 
        setSearch(value)
        setLoading(true)
        const resp1 = await dispatch(ParkingCompHomeRequest(value))
        if (resp1?.count > 0){
            console.log('prev resp: ', resp1)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

  return (
      <SafeAreaView style={styles.container}>
            <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.fullWidth, commonStyles.paddingHorizontal16, commonStyles.marginTop10]}>
                <FloatingTextInput
                    style={commonStyles.fullWidth}
                    label='Search'
                    icon={require('../../assets/search_icon.svg')}
                    value={search}
                    onChangeText={(value) => onSearch(value)} />
            </View>
            {loading ? <ActivityIndicator style={{marginTop: 50}} size="large" color={colors.base} /> : 
            <>{ bookings?.results?.length > 0 ?
            <FlatList 
                data={bookings?.results}
                showsVerticalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}/>: <View style={commonStyles.alignItemsCenter}><Text style={commonStyles.text_large}>no results found...</Text></View>
            }
            </>
            }
        <View style={[commonStyles.paddingHorizontal8, commonStyles.paddingVertical16, commonStyles.whiteBackground]}>
                <CustomButton label={'View Reports'} isPrimaryButton />
        </View>
    </SafeAreaView>
  );
}

export default ParkingCompHome;
