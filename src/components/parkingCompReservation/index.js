import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { commonStyles } from '../../styles';
import { utils } from '../../utils';
import { styles } from './styles';

const ParkingCompReservation = (props) => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subContainer}>
                <Text style={[commonStyles.text_xs, commonStyles.lightGreyTextColor]}>
                  Res ID: 13246896
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.lightGreyTextColor]}>
                  1  jan 23
                </Text>
        </View>
        <View style={[styles.subContainer, commonStyles.marginTop16]}>
            <View>
                <Text style={[commonStyles.text_xs_bold, commonStyles.marginBottom5, commonStyles.blackTextColor]}>
                    In time
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                    10:00AM
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs_bold,commonStyles.marginBottom5, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                    out time 
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign]}>
                    5:00 PM
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    Total Time
                </Text>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.rightTextAlign]}>
                    5:00 PM
                </Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center'}}>
                <Text style={[commonStyles.text_large_thick, commonStyles.blackTextColor, commonStyles.marginRight8]}>
                  $10 Paid
                </Text>
            <TouchableOpacity style={{backgroundColor: props.item?.checked ? '#DDDDDD' : 'white', borderRadius: 37, paddingVertical: 5,  width: 113, borderWidth: 1, borderColor: props.item?.checked ? 'white' : '#1E8FFF'}} onPress={() => {}}>
                <Text style={[commonStyles.text_xs_thick, {color: props.item?.checked ? '#0F8849' : '#1E8FFF', marginLeft: 5, textAlign: 'center'}]}>
                  { props.item?.checked ? 'Checked' : 'Checked in'}
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default ParkingCompReservation;
