import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { colors, commonStyles } from '../../styles';
import { calcTotalTime, formatTime, utils } from '../../utils';
import { checkInRequest } from '../../utils/service';
import { styles } from './styles';

const ParkingCompReservation = (props) => {

  const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

  const onCheckInPress = async (item) => {
    if(!item?.verified){
      setLoading(true)
      const resp1 = await dispatch(checkInRequest(item?.id))
      if (resp1?.status){
          console.log('prev resp: ', resp1)
          setLoading(false)
          props?.getBookingData()
      } else {
          setLoading(false)
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subContainer}>
                <Text style={[commonStyles.text_xs, commonStyles.lightGreyTextColor]}>
                  {`Res ID: ${props?.item?.id} `}
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.lightGreyTextColor]}>
                  {props?.item?.start.split('T')[0]}
                </Text>
        </View>
        <View style={[styles.subContainer, commonStyles.marginTop16]}>
            <View>
                <Text style={[commonStyles.text_xs_bold, commonStyles.marginBottom5, commonStyles.blackTextColor]}>
                    In time
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                  {formatTime(props?.item?.start)}
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs_bold,commonStyles.marginBottom5, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    out time 
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign]}>
                  {formatTime(props?.item?.end)}
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    Total Time
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.rightTextAlign]}>
                  {calcTotalTime(props?.item?.start, props?.item?.end)}
                </Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center'}}>
                <Text style={[commonStyles.text_large_thick, commonStyles.blackTextColor, commonStyles.marginRight8]}>
                  {`$${props?.item?.fare} ${props?.item?.payment_mode ? 'Paid' : 'Unpaid'}`}
                </Text>
            <TouchableOpacity style={{backgroundColor: props.item?.verified ? colors.base : 'white', borderRadius: 37, paddingVertical: 5,  width: 113, borderWidth: 1, borderColor: props.item?.verified ? 'white' : '#1E8FFF'}} onPress={() => onCheckInPress(props?.item)}>
                <Text style={[commonStyles.text_xs_thick, {color: props.item?.verified ? colors.white : '#1E8FFF', marginLeft: 5, textAlign: 'center'}]}>
                  { props.item?.verified ? 'Checked in' : 'Check in'}
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default ParkingCompReservation;
