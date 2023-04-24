import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import ChangePassword from '../screens/changPassword';
import Home from '../screens/home';
import InviteFriends from "../screens/inviteFriends";
import DeleteAccount from "../screens/deleteAccount";
import SendFeedback from "../screens/sendFeedback";
import { DrawerHeader } from '../components/drawerHeader';
import { LogoutPopup } from '../components/logOutPopup';
import termsAndConditions from '../../modules/terms-and-conditions';
import privacyPolicy from '../../modules/privacy-policy';
import ParkingCompHome from '../screens/parkingCompHome';
import ParkingDetails from '../screens/parkingDetails';
import { useSelector } from 'react-redux';
import PreviousBookings from '../screens/previousBookings';
import UpcomingBookings from '../screens/upcomingBooking';
import ParkingSpotsHome from '../screens/parkingSpotsHome'
import { colors, commonStyles } from '../styles';
import { Icon } from 'react-native-elements'
import Payment from '../screens/payment';
import Login from '../screens/login';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../components/header';
import ViewReports from '../screens/viewReports';

function CustomDrawerContent(props) {
    const [modalVisible, setModalVisible] = useState(false)
    let userData = useSelector(state => state?.app?.userData)

  return (
    <>
    <View style={{marginLeft: 24, marginVertical: 30, flexDirection: 'row', justifyContent: 'space-between', marginRight: 30}}>
        <Text style={commonStyles.text_small}>{userData?.email}</Text>
        <TouchableOpacity onPress={() => {
            props.navigation.closeDrawer()
        }}>
            <Icon name="cross" type='entypo' size={25} color={colors.black} />
            {/* <SvgUri
                width={15}
                height={15}
                source={require('../assets/cross_icon.svg')}
                /> */}
        </TouchableOpacity>
    </View>
      <DrawerContentScrollView style={{ display: 'flex', marginLeft: 8 }} {...props}>
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="home-sharp" type='ionicon' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/home.svg')}
                //     />
                )}
            label={'Home'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                userData?.user_type === 2 ? props.navigation.navigate('Home') : props.navigation.navigate('ParkingCompHome')
            }}
        />
        {userData?.user_type === 2 &&
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="ios-share-social-sharp" type='ionicon' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/inviteFriends.svg')}
                //     />
                )}
            label={'Invite Friends'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.closeDrawer()
                props.navigation.navigate('Invite Friends');
            }}
        />}
        {!userData?.is_guest &&
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="ios-lock-closed" type='ionicon' size={25} color={colors.black} />
                
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/change_password.svg')}
                //     />
                )}
            label={'Change Password'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Change Password', {isChangePassword: true});
            }}
        />}
         {!userData?.is_guest && userData?.user_type === 2 &&
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="ios-wallet" type='ionicon' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/manage_payments.svg')}
                //     />
                )}
            label={'Manage Payments'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Invite Friends');
            }}
        />}
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="file-text-o" type='font-awesome' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/privacy_policy.svg')}
                //     />
                )}
            label={'Privacy Policy'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Privacy Policy');
            }}
        />
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="folder-open-outline" type='ionicon' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/term_condition.svg')}
                //     />
                )}
            label={'Terms and Conditions'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Terms And Conditions');
            }}
        />
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="send" type='feather' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/send_icon.svg')}
                //     />
                )}
            label={'Feedback'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Feedback');
            }}
        />
         {!userData?.is_guest &&
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="account-remove" type='material-community' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/delete_account.svg')}
                //     />
                )}
            label={'Delete the account'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Delete Account');
            }}
        />}
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="account-remove" type='material-community' size={25} color={colors.black} />
                // <SvgUri
                //     width={size}
                //     height={size}
                //     source={require('../assets/delete_account.svg')}
                //     />
                )}
            label={'View Reports'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('ViewReports');
            }}
        />
      </DrawerContentScrollView>
      <View style={{ height: 50, marginTop: 'auto', marginBottom: 24 }}>
        <TouchableOpacity
          onPress={() => { setModalVisible(true) }}
          style={{
            marginTop: 'auto',
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 24,
            alignItems: 'center'
          }}
        >
            <Icon name="ios-arrow-undo-circle" type='ionicon' size={35} color={colors.base} />
            
                {/* <SvgUri
                        width={14}
                        height={14}
                        source={require('../assets/logout.svg')}
                        /> */}
          <Text style={[commonStyles.text_large_thick, {color: '#1E8FFF'}]}>Logout</Text>
        </TouchableOpacity>
      </View>
      <LogoutPopup visible={modalVisible} onClose={() => setModalVisible(false)} navigation={props.navigation} />
    </>
  );
}

const BookNav = createStackNavigator();
const Booking = props => {
  return (
    <>
      <BookNav.Navigator
        screenOptions={({ navigation, route }) => {
          return {
            headerTitle: route.name,
            headerLeft: () => <Header navigation={navigation} />
          };
        }}
      >
        <BookNav.Screen name='ParkingSpotsHome' component={ParkingSpotsHome}/>
        <BookNav.Screen name='ParkingDetails' component={ParkingDetails}/>
        <Drawer.Screen name='Payment' component={Payment}/>
        <Drawer.Screen name='Login' component={Login}/>
      </BookNav.Navigator>
    </>
  );
};

const Drawer = createDrawerNavigator();
const MainNav = props => {
    let userData = useSelector(state => state?.app?.userData)
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName={userData?.user_type === 3 ? 'ParkingCompHome' : "Home"}
        screenOptions={({ navigation, route }) => {
            return {
              headerStyle: { backgroundColor: '#FBFBFB' },
              headerTitle: route.name === 'ParkingCompHome' ? 'Home' : route.name,
              headerLeft: () => <DrawerHeader navigation={navigation} />
            };
          }}>
        {userData?.user_type === 3 && <Drawer.Screen name='ParkingCompHome' component={ParkingCompHome} />}
        {userData?.user_type === 2 && <Drawer.Screen name='Home' component={Home}/>}
        <Drawer.Screen name="Change Password" component={ChangePassword} />
        <Drawer.Screen name="Invite Friends" component={InviteFriends} />
        <Drawer.Screen name="Feedback" component={SendFeedback} />
        <Drawer.Screen name="Terms And Conditions" component={termsAndConditions.navigator} />
        <Drawer.Screen name="Privacy Policy" component={privacyPolicy.navigator} />
        <Drawer.Screen name='Delete Account' component={DeleteAccount} />
        <Drawer.Screen name='PreviousBookings' component={PreviousBookings}/>
        <Drawer.Screen name='UpcomingBookings' component={UpcomingBookings}/>
        <Drawer.Screen name='ViewReports' component={ViewReports}/>
        <Drawer.Screen
          name="booking"
          component={Booking}
          options={{
            headerShown: false
          }}/>
      </Drawer.Navigator>
  );
};

export default MainNav;
