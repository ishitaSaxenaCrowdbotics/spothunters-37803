import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import PreviousBooking from '../../components/previousBooking';
import UpcomingBooking from '../../components/upcomingBooking';

const Home = (props) => {

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    const renderItem = () => {
        return(<UpcomingBooking navigation={props.navigation}/>)
    }
    const renderItemPrev = () => {
        return(<PreviousBooking />)
    }

  return (
      <SafeAreaView style={{backgroundColor: '#FBFBFB', flex: 1}}>
          <View style={{marginTop: 40, paddingHorizontal: 16}}>
              <Image source={require('../../assets/backButton.png')} />
          </View>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', paddingHorizontal: 16}}>
                <TextInput 
                    style={{backgroundColor: 'white', borderRadius: 15, padding: 15, width: '78%'}}
                    placeholder='Search Here...' />
                <TouchableOpacity style={{width: 55, height: 54, backgroundColor: '#1E8FFF', alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
                    <Image source={require('../../assets/settingIcon.png')} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 25, alignItems: 'center', paddingHorizontal: 16}}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    My Booking
                </Text>
                <TouchableOpacity>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 25, alignItems: 'center', paddingHorizontal: 16}}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    Previous Reservations
                </Text>
                <TouchableOpacity>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>
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
        </ScrollView>
        <View style={{paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'white'}}>
            <TouchableOpacity style={{backgroundColor: '#1E8FFF', paddingVertical: 12, paddingHorizontal: 32, marginHorizontal: 16, borderRadius: 24, alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
                    BOOK NEW PARKING
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default Home;
