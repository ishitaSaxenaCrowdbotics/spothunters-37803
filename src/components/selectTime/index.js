import React, { forwardRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { colors, commonStyles } from '../../styles';
import { CustomButton } from '../customButton';
import FloatingTextInput from '../floatingTextInput';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { parkingSearchRequest } from '../../utils/service';
import MonthPicker from 'react-native-month-year-picker';
import { convertTime12to24 } from '../../utils';
import { DatePickerIOS } from 'react-native';

const SelectTime = (props) => {

    const [isSelected, setSelected] = useState(props?.type || 'Hourly')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [month, setMonth] = useState(new Date())
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
            value={toggleCheckBox[index].isSelected}
            onValueChange={(newValue) => {
              let temp = toggleCheckBox.map((product) => {
                console.log('product ', product)
                if (item.id === product.id) {
                  return { ...product, isSelected: newValue };
                }
                return product;
              });
              setToggleCheckBox(temp);
            }}/>
            <Text style={[commonStyles.text_xs_thick, commonStyles.textAlignVerticalCenter, commonStyles.marginRight8]}>{item.title}</Text>
        </>
      )
    }

    const onValueChange = (event, newDate) => {
        const selectedDate = newDate || month 
        console.log('selectedDate: ', selectedDate.getFullYear())       
        setIsOpenMonthPicker(false);
        setMonth(selectedDate);
      }

    const applyFilter = async() => {
      if(props?.isBooking){
        let data = null
        if (isSelected === 'Hourly'){
          data = `${startdate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`
        } else if (isSelected === 'Daily'){
          data = startDate.toLocaleDateString()
        } else if (isSelected === 'Weekly'){
          data = `${startdate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
        } else if (isSelected === 'Montly'){
          data = month
        }
        props?.selectTime(data)
        props.setModal(false)
      } else {
        const startdate = convertTime12to24(startDate.toLocaleTimeString());
        const enddate = convertTime12to24(endDate.toLocaleTimeString());
        const day = toggleCheckBox.filter((item) => item.isSelected).map((item) => item.value)
        let availability = null
          availability = isSelected
        const reqData = {
          places_working_time__day: day,
          places_working_time__end_time__lte: enddate,
          places_working_time__start_time__gte: startdate,
          availability: availability
        }
        props.setModal(false)
        // const resp1 = await dispatch(parkingSearchRequest(reqData))
        // console.log('resp1, :', resp1)
      }
    }

    const onPresTab = type => {
      setSelected(type)
      if (type === 'Hourly'){
        setStartDate(new Date())
        setEndDate(new Date())
      } else if(type === 'Monthly'){
        availability = 'Monthly'
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

    console.log('startDate: ', startDate.toLocaleDateString())
    console.log('endDate: ', endDate.toLocaleDateString())
    console.log('props?.type: ', props?.type === 'Daily' || 'test')
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
                { props?.type !== 'Hourly' ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Hourly' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Hourly')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Hourly' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Hourly</Text>
                  </TouchableOpacity>
                }
                { props?.type !== 'Monthly' ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Monthly' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Monthly')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Monthly' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Monthly</Text>
                  </TouchableOpacity>
                }
                { props?.type !== 'Weekly' ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Weekly' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Weekly')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Weekly' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Weekly</Text>
                  </TouchableOpacity>
                }
                { props?.type !== 'Daily' ||
                  <TouchableOpacity style={{backgroundColor: isSelected === 'Daily' ? colors.base:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, flex: 1}} onPress={() => onPresTab('Daily')}>
                      <Text style={[commonStyles.text_big, isSelected === 'Daily' ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>Daily</Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={{flexDirection: 'column'}}>
                {isSelected === 'Hourly' &&
                  <TouchableOpacity onPress={() => setOpen({isOpen: true, type: 'startDate'})} >
                    <FloatingTextInput
                          label='Start Time*'
                          editable={false}
                          value={startDate.toLocaleTimeString()}/>
                  </TouchableOpacity>
                }
                {isSelected === 'Hourly' &&
                  <TouchableOpacity onPress={() => setOpen({isOpen: true, type: 'endDate'})}>
                    <FloatingTextInput
                          label='End Time*'
                          style={commonStyles.marginTop16}
                          editable={false}
                          value={endDate.toLocaleTimeString()}/>
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
                open={open.isOpen}
                mode={isSelected === 'Hourly' ? 'time' : 'date'}
                date={(open.type === 'startDate' || open.type === 'Daily'|| open.type === 'Weekly') ? startDate : endDate}
                onConfirm={(date) => {
                  if(open.type === 'startDate' || open.type === 'Daily'|| open.type === 'Weekly'){
                    setStartDate(date)
                    var newDate = new Date(date);
                    newDate.setDate(date.getDate() + 7)
                    setEndDate(newDate)
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
                  minimumDate={new Date()}
                  maximumDate={new Date(2025, 5)}
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
                label={props?.isBooking ? 'Select Time' : 'Apply'} />
            </View>
          </TouchableOpacity>
        </View>
    </Modal>
  );
}

export default SelectTime;
