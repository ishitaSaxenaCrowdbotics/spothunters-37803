import React, { forwardRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { colors, commonStyles } from '../../styles';
import { CustomButton } from '../customButton';
import FloatingTextInput from '../floatingTextInput';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { modifySpotRequest, parkingSearchListRequest } from '../../utils/service';
import MonthPicker from 'react-native-month-year-picker';
import { convertTime12to24, toUnixTime } from '../../utils';
import { DatePickerIOS } from 'react-native';
import { filters } from '../../state/actions';
import moment from 'moment';

const SelectTime = (props) => {

    const [isSelected, setSelected] = useState(props?.type || 'Hourly')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [month, setMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1))
    const [open, setOpen] = useState({isOpen: false, type: ''})
    const [isOpenMonthPicker, setIsOpenMonthPicker] = useState(false)
    const data = [{title: 'Mon', id: 1, value: 'Monday', isSelected: false},{title: 'Tues', id: 2, value: 'Tuesday', isSelected: false},{title: 'Wed', id: 3, value: 'Wednesday', isSelected: false},{title: 'Thurs', id: 4, value: 'Thursday', isSelected: false},{title: 'Fri', id: 5, value: 'Friday', isSelected: false},{title: 'Sat', id: 6, value: 'Saturday', isSelected: false},{title: 'Sun', id: 7, value: 'Sunday', isSelected: false}]
    const [toggleCheckBox, setToggleCheckBox] = useState(data)
    const dispatch = useDispatch()
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const renderItem = ({item, index}) => {
      return(
        <>
          <CheckBox 
          style={{marginLeft: 5, marginVertical: 5}}
            value={toggleCheckBox[index].isSelected}
            onValueChange={(newValue) => {
              let temp = toggleCheckBox.map((product) => {
                if (item.id === product.id) {
                  return { ...product, isSelected: newValue };
                }
                return product;
              });
              setToggleCheckBox(temp);
            }}/>
            <Text style={[commonStyles.text_xs_thick, commonStyles.textAlignVerticalCenter, commonStyles.marginHorizontal8, {alignSelf: 'center'}]}>{item.title}</Text>
        </>
      )
    }

    const onValueChange = (event, newDate) => {
        const selectedDate = newDate || month      
        setIsOpenMonthPicker(false);
        setMonth(selectedDate);
      }

    const applyFilter = async() => {
      if(props?.isBooking){
        let availability = null
        availability = isSelected
        const req = {
            place: props?.data?.place?.id,
            end: availability === 'Monthly' ? moment(month).format("YYYY-MM-DDThh:mm:ss") + 'Z' : moment(endDate).format("YYYY-MM-DDThh:mm:ss") + 'Z',
            start: availability === 'Monthly' ? moment(month).format("YYYY-MM-DDThh:mm:ss") + 'Z' : moment(startDate).format("YYYY-MM-DDThh:mm:ss") + 'Z',
        }
        console.log('req: ', req)
        const resp = await dispatch(modifySpotRequest(req, props?.data?.id))
        if(resp?.status){
          props?.getBookingData()
          props.setModal(false)
        } else {
          props.setModal(false)
        }
        console.log('resp: ', resp)
      } else {
        props?.setLoading(true)
        const day = toggleCheckBox.filter((item) => item.isSelected).map((item) => item.value)
        let availability = null
        availability = isSelected
        console.log('availability: ', availability)
        const reqData = {
          day: availability === 'Hourly' ? day : '',
          end: toUnixTime(endDate.getFullYear(), endDate.getMonth()+1, endDate.getDate(), endDate.getHours(), endDate.getMinutes(), endDate.getSeconds()),
          start: availability === 'Monthly' ? toUnixTime(month.getFullYear(), month.getMonth()+1, 1, 11, 30, 0) : toUnixTime(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds()),
          availability: availability
        }
        dispatch(filters({
          end: toUnixTime(endDate.getFullYear(), endDate.getMonth()+1, endDate.getDate(), endDate.getHours(), endDate.getMinutes(), endDate.getSeconds()),
          start: availability === 'Monthly' ? toUnixTime(month.getFullYear(), month.getMonth()+1, 1, 11, 30, 0) : toUnixTime(startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds()),
          availability: availability, 
          month: `${monthNames[month.getMonth()]}, ${month.getFullYear()}`, 
          day
        }))

          console.log('hourly: ', startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds())

        props.setModal(false)
        const resp1 = await dispatch(parkingSearchListRequest(reqData))
        if(resp1){
          props?.setLoading(false)
        }
        console.log('resp1, :', resp1)
      }
    }

    const onPresTab = type => {
      setSelected(type)
      if (type === 'Hourly'){
        setStartDate(new Date())
        setEndDate(new Date())
      } else if(type === 'Monthly'){
        setMonth(new Date(new Date().getFullYear(), new Date().getMonth() + 1))
      } else if(type === 'Weekly'){
        setStartDate(new Date())
        var newDate = new Date()
        newDate.setDate(newDate.getDate() + 7)
        setEndDate(newDate)
      } else if(type === 'Daily'){
        setStartDate(new Date())
        setEndDate(new Date())
      }
    }

  return (
    <Modal
      visible={props.isModal}
      statusBarTranslucent={true}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => props.setModal(false)}>
        <View style={{
          flex:1, 
          backgroundColor: '#000000CC'
          }}>
          <TouchableOpacity activeOpacity={1}  onPress={() => props.setModal(false)} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{padding: 32, backgroundColor: 'white', justifyContent: 'center', position: 'absolute', bottom: 0, right: 0, left: 0}}>
              <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign]}>Select Time</Text>
              <Text style={[commonStyles.text_big, commonStyles.marginTop30]}>Parking type</Text>
              <View style={{flexDirection: 'row', marginVertical: 30}}>
                { (props?.type !== 'Hourly' && props?.isBooking) ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Hourly' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Hourly')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Hourly' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Hourly</Text>
                  </TouchableOpacity>
                }
                { (props?.type !== 'Daily' && props?.isBooking) ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Daily' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Daily')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Daily' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Daily</Text>
                  </TouchableOpacity>
                }
                { (props?.type !== 'Weekly' && props?.isBooking) ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Weekly' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Weekly')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Weekly' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Weekly</Text>
                  </TouchableOpacity>
                }
                { (props?.type !== 'Monthly' && props?.isBooking) ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Monthly' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Monthly')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Monthly' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Monthly</Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={{flexDirection: 'column'}}>
                {isSelected === 'Hourly' &&
                  <TouchableOpacity onPress={() => setOpen({isOpen: true, type: 'startDate'})} >
                    <FloatingTextInput
                          label='Start Time*'
                          editable={false}
                          value={startDate.toLocaleString()}/>
                  </TouchableOpacity>
                }
                {isSelected === 'Hourly' &&
                  <TouchableOpacity onPress={() => setOpen({isOpen: true, type: 'endDate'})}>
                    <FloatingTextInput
                          label='End Time*'
                          style={commonStyles.marginTop16}
                          editable={false}
                          value={endDate.toLocaleString()}/>
                  </TouchableOpacity>
                }
                {isSelected === 'Monthly' &&
                  <TouchableOpacity onPress={() => setIsOpenMonthPicker(true)}>
                    <FloatingTextInput
                          label='Select Month*'
                          editable={false}
                          value={`${monthNames[month.getMonth()]}, ${month.getFullYear()}`}/>
                  </TouchableOpacity>}
                {isSelected === 'Daily' &&
                  <TouchableOpacity onPress={() => setOpen({isOpen: true, type: 'Daily'})}>
                    <FloatingTextInput
                          label='Select Date*'
                          editable={false}
                          value={startDate.toLocaleDateString()}/>
                  </TouchableOpacity>}
                {isSelected === 'Weekly' &&
                  <TouchableOpacity onPress={() => setOpen({isOpen: true, type: 'Weekly'})}>
                    <FloatingTextInput
                          label='Select Date*'
                          editable={false}
                          value={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}/>
                  </TouchableOpacity>}
              </View>
              <DatePicker 
                modal
                is24hourSource="locale"
                locale="en"
                minimumDate={isSelected !== 'Hourly' ? new Date() : null}
                open={open.isOpen}
                mode={isSelected === 'Hourly' ? 'datetime' : 'date'}
                date={(open.type === 'startDate' || open.type === 'Daily'|| open.type === 'Weekly') ? startDate : endDate}
                onConfirm={(date) => {
                  if(open.type === 'Weekly'){
                    setStartDate(date)
                    var newDate = new Date(date);
                    newDate.setDate(date.getDate() + 7)
                    setEndDate(newDate)
                  } else if(open.type === 'startDate' || open.type === 'Daily') {
                    setStartDate(date)
                  } else {
                    setEndDate(date)
                  }
                  setOpen(false)
                }}
                onCancel={() => {
                setOpen(false)
                }} />
              {isOpenMonthPicker && (
                <MonthPicker
                  onChange={onValueChange}
                  value={month}
                  minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1)}
                  locale="en"
                />
              )}
              {isSelected === 'Hourly' &&
              <>
                <Text style={[commonStyles.text_small_thick, commonStyles.marginTop20]}>Recurring parking</Text>
                <View style={[commonStyles.divider, {marginVertical: 5}]}/>
                <FlatList
                  numColumns={4}
                  data={data}
                  showsVerticalScrollIndicator={true}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => `${item.id}-${index}`} />
              </>
              }
              <CustomButton
                onPress={applyFilter}
                isPrimaryButton
                style={commonStyles.marginTop24} 
                label={props?.isBooking ? 'Select' : 'Apply'} />
            </View>
          </TouchableOpacity>
        </View>
    </Modal>
  );
}

export default SelectTime;
