import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import ParkingCompReservation from '../../components/parkingCompReservation';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import styles from './styles';
import { commonStyles } from '../../styles';

const ParkingCompHome = (props) => {

    const data = [{id: 1},{id: 2, checked: true},{id: 3},{id: 4},{id: 5}]
    const renderItem = ({ item, index }) => {
        return(<ParkingCompReservation navigation={props.navigation} item={item}/>)
    }

  return (
      <SafeAreaView style={styles.container}>
            <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.fullWidth, commonStyles.paddingHorizontal16, commonStyles.marginTop10]}>
                <FloatingTextInput
                    style={commonStyles.fullWidth}
                    label='Search'
                    icon={require('../../assets/search_icon.svg')} />
            </View>
            <FlatList 
                data={data}
                showsVerticalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}/>
        <View style={[commonStyles.paddingHorizontal8, commonStyles.paddingVertical16, commonStyles.whiteBackground]}>
                <CustomButton label={'View Reports'} isPrimaryButton />
        </View>
    </SafeAreaView>
  );
}

export default ParkingCompHome;
