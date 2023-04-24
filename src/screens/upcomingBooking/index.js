import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import PreviousBooking from '../../components/previousBooking';
import UpcomingBooking from '../../components/upcomingBooking';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../styles';
import styles from './styles';

const UpcomingBookings = (props) => {

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]

    const renderItem = () => {
        return(<UpcomingBooking navigation={props.navigation} fullView/>)
    }
    let rememberMe = useSelector(state => state?.app?.rememberMe)
    console.log('sfse: ', rememberMe)
  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={commonStyles.justifyContentCenter}>
            <FlatList 
                nestedScrollEnabled
                data={data}
                style={commonStyles.fullWidth}
                showsVerticalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}/>
        </ScrollView>
    </SafeAreaView>
  );
}

export default UpcomingBookings;
