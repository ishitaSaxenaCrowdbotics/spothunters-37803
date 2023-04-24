import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, commonStyles } from '../../styles';
import SvgUri from 'react-native-svg-uri';
import { convertToMeterToMiles } from "../../utils";
import { parkingSearchByIDRequest } from '../../utils/service';
import { useDispatch } from 'react-redux';

export const MapMarker = (props) => {

  console.log('marker props: ', props)
  const dispatch = useDispatch()

  const onHandleParkingDetail = async () => {
    const resp = await dispatch(parkingSearchByIDRequest(props?.item?.id))
    console.log('resp: ', resp)
    props.navigation.navigate('ParkingDetails', {id: props?.item?.id, origin: props?.origin})
  }

  return (
    <TouchableOpacity onPress={onHandleParkingDetail}>
     <SvgUri
                width={52}
                height={61}
                source={require('../../assets/unselectedMarker.svg')}
                />              
              <Text style={[commonStyles.text_xxs_thick, {position: 'absolute', bottom: 35, zIndex: 1, left: 12, color: colors.white}]}>{convertToMeterToMiles(props?.dist).toFixed(1)}mi</Text>
              <Text style={[commonStyles.text_xxs_thick, {position: 'absolute', bottom: 10, left: 13, color: colors.base}]}>${props?.item?.price}</Text>
    </TouchableOpacity>
  );
}