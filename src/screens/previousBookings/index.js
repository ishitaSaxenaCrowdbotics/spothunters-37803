import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import PreviousBooking from '../../components/previousBooking';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../styles';
import styles from './styles';

const PreviousBookings = (props) => {

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    const [searchText, setSearchText] = useState('')

    const renderItemPrev = () => {
        return(<PreviousBooking fullView />) 
    }

    let rememberMe = useSelector(state => state?.app?.rememberMe)
    console.log('rememberMe: ', rememberMe)
  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={commonStyles.justifyContentCenter}>
            <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.fullWidth, commonStyles.alignItemsCenter, commonStyles.paddingHorizontal16, commonStyles.marginTop10]}>
                <FloatingTextInput
                    style={{width: '78%'}}
                    value={searchText}
                    onChangeText={(value) => setSearchText(value)}
                    label='Search Here...'/>
                <TouchableOpacity style={styles.settingButton}>
                    <Image source={require('../../assets/settingIcon.png')} />
                </TouchableOpacity>
            </View>
            <FlatList 
                nestedScrollEnabled
                data={data}
                style={commonStyles.fullWidth}
                showsVerticalScrollIndicator={true}
                renderItem={renderItemPrev}
                keyExtractor={(item, index) => `${item.id}-${index}`}/>
        </ScrollView>
    </SafeAreaView>
  );
}

export default PreviousBookings;
