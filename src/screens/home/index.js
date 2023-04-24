import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import PreviousBooking from '../../components/previousBooking';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../styles';
import styles from './styles';

const Home = (props) => {

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    const [searchText, setSearchText] = useState('')

    let userData = useSelector(state => state?.app?.userData)

    const renderItem = () => {
        return(<UpcomingBooking navigation={props.navigation}/>)
    }
    const renderItemPrev = () => {
        return(<PreviousBooking />) 
    }

    let rememberMe = useSelector(state => state?.app?.rememberMe)
    console.log('sfse: ', rememberMe)
  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={commonStyles.justifyContentCenter}>
            <View style={styles.subContainer}>
                <Text style={commonStyles.text_xl_thick}>
                    My Bookings
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('UpcomingBookings')}>
                    <Text style={commonStyles.text_xs}>
                        Show All
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList 
            nestedScrollEnabled
                horizontal
                data={data}
                showsVerticalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}/>
            {!userData?.is_guest &&
                <>
                    <View style={styles.subContainer}>
                        <Text style={commonStyles.text_xl_thick}>
                            Previous Reservations
                        </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('PreviousBookings')}>
                            <Text style={commonStyles.text_xs}>
                                Show All
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                    nestedScrollEnabled
                        horizontal
                        data={data}
                        showsVerticalScrollIndicator={true}
                        renderItem={renderItemPrev}
                        keyExtractor={(item, index) => `${item.id}-${index}`}/>
                </>
            }
        </ScrollView>
        <View style={[commonStyles.paddingHorizontal8, commonStyles.paddingVertical16, commonStyles.whiteBackground]}>
                <CustomButton label={'BOOK NEW PARKING'} isPrimaryButton onPress={() => props.navigation.navigate('booking')} />
        </View>
    </SafeAreaView>
  );
}

export default Home;
