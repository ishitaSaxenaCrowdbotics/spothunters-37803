import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, ActivityIndicator, Modal } from 'react-native';
import ParkingCompReservation from '../../components/parkingCompReservation';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import styles from './styles';
import { colors, commonStyles } from '../../styles';
import { ParkingCompHomeRequest } from '../../utils/service';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';

const ParkingCompHome = (props) => {

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [isModal, setIsModal] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [isStartDateOpen, setIsStartDateOpen] = useState(false)
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

    const onSearch = async (value, isFilter) => { 
        !isFilter && setSearch(value)
        setLoading(true)
        let rqData
        if(isFilter){
            setIsModal(false)
            rqData = {
                date: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
            }
        } else {
            rqData = {
                search: value
              }
        }
        const resp1 = await dispatch(ParkingCompHomeRequest(rqData))
        if (resp1?.count > 0){
            console.log('prev resp: ', resp1)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

  return (
      <SafeAreaView style={styles.container}> 
            <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.fullWidth, commonStyles.paddingHorizontal16]}>
                <FloatingTextInput
                    style={{flex: 1, marginTop: 0, marginRight: 10}}
                    label='Search'
                    placeholder='Search'
                    icon={require('../../assets/search_icon.svg')}
                    value={search}
                    onChangeText={(value) => onSearch(value)} />
                <TouchableOpacity style={commonStyles.justifyContentCenter} onPress={() => setIsModal(true)}>
                    <Icon name='filter' type='ionicon' />
                </TouchableOpacity>
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
                <CustomButton label={'View Reports'} isPrimaryButton onPress={() => props.navigation.navigate('ViewReports')} />
        </View>
        <Modal
            transparent
            visible={isModal}
            transparent={true}
            statusBarTranslucent={true}
            onRequestClose={() => setIsModal(false)}>
            <View style={styles.modalContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.centerContainer} onPress={() => setIsModal(false)}>
                    <View style={[styles.subContainer]}>
                        <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign]}>
                          Set Filters
                        </Text>
                        <View style={[commonStyles.flexRow]}>
                          <TouchableOpacity onPress={() => setIsStartDateOpen(true)} style={commonStyles.fullWidth} >
                            <FloatingTextInput
                                style={commonStyles.fullWidth}
                                label='Start Time*'
                                editable={false}
                                value={startDate.toDateString()}/>
                          </TouchableOpacity>
                          <DatePicker 
                            modal
                            is24hourSource="locale"
                            locale="en"
                            open={isStartDateOpen}
                            mode={'date'}
                            date={startDate}
                            onConfirm={(date) => {
                              setStartDate(date)
                            }}
                            onCancel={() => {
                              setIsStartDateOpen(false)
                            }} />
                        </View>
                        <View style={[commonStyles.flexRow, commonStyles.fullWidth, commonStyles.marginTop15]}>
                          <CustomButton label={'Cancel'} onPress={() => setIsModal(false)} style={[commonStyles.marginRight8, commonStyles.flex1]} />
                          <CustomButton label={'Apply'} isPrimaryButton onPress={() => onSearch('', true)} style={commonStyles.flex1} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    </SafeAreaView>
  );
}

export default ParkingCompHome;
