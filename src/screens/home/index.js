import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import { LogoutPopup } from '../../components/logOutPopup';
import PreviousBooking from '../../components/previousBooking';
import UpcomingBooking from '../../components/upcomingBooking';
import FloatingTextInput from '../../components/floatingTextInput';
import { CustomButton } from '../../components/customButton';

const Home = (props) => {

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    const renderItem = () => {
        return(<UpcomingBooking navigation={props.navigation}/>)
    }
    const renderItemPrev = () => {
        return(<PreviousBooking />)
    }

    const [modalVisible, setModalVisible] = useState(false)

  return (
      <SafeAreaView style={{backgroundColor: '#FBFBFB', flex: 1}}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', paddingHorizontal: 16, marginTop: 10}}>
                <FloatingTextInput
                    style={{width: '78%'}}
                    label='Search Here...'
                    placeholder='dfghjk' />
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
                <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 20}}>
                    <TouchableOpacity style={{marginRight: 10}} onPress={() => props.navigation.navigate('InviteFriends')}>
                        <Text>
                            Invite Friends
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 10}}
                        onPress={() => {
                            setModalVisible(true)  
                        }}>
                        <Text>
                            LogOut Popup
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 10}}
                        onPress={() => props.navigation.navigate('DeleteAccount')}>
                        <Text>
                            DeleteAccount
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 10}}
                        onPress={() => props.navigation.navigate('SendFeedback')}>
                        <Text>
                            FeedBack
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 20}}>
                    <TouchableOpacity style={{marginRight: 10}}
                        onPress={() => props.navigation.navigate('ChangePassword', {name: 'Change Password', isChangePassword: true})}>
                        <Text>
                            changepassword
                        </Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
        <View style={{paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'white'}}>
                <CustomButton label={'BOOK NEW PARKING'} isPrimaryButton />
        </View>
        <LogoutPopup visible={modalVisible} onClose={() => setModalVisible(false)} navigation={props.navigation} />
    </SafeAreaView>
  );
}

export default Home;
