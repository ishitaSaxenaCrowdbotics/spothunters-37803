import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert
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
import { useSelector, useDispatch } from 'react-redux';
import BookingsList from '../screens/BookingList';
import ParkingSpotsHome from '../screens/parkingSpotsHome'
import { colors, commonStyles } from '../styles';
import { Icon } from 'react-native-elements'
import Payment from '../screens/payment';
import Login from '../screens/login';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../components/header';
import ViewReports from '../screens/viewReports';
import BookingConfirmation from '../screens/bookingConfirmation';
import { logoutRequest } from '../utils/service';
import { removeAuthData } from '../utils';
import { reset } from '../state/actions';
import ManagePayment from '../screens/managePayments';

function CustomDrawerContent(props) {
    const [modalVisible, setModalVisible] = useState(false)
    let userData = useSelector(state => state?.app?.userData)
    console.log('tokens navi: ', userData)

    const dispatch = useDispatch()
    const onLogout = async () => {
        const resp = await dispatch(logoutRequest())
            removeAuthData()
            dispatch(reset())
            props.navigation.reset({routes:[{name: 'Login'}]})
        console.log('resp: ', resp)
        if(resp.status){
            Alert.alert('loggged out successfully')
            setModalVisible(false)
            removeAuthData()
            dispatch(reset())
            props.navigation.reset({routes:[{name: 'Login'}]})
        }
    }

  return (
    <SafeAreaView style={commonStyles.flex1}>
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
                )}
            label={'Manage Payments'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Manage Payment');
            }}
        />}
        <DrawerItem
            icon={({focused, color, size}) => (
                <Icon name="file-text-o" type='font-awesome' size={25} color={colors.black} />
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
                )}
            label={'Delete the account'}
            labelStyle={[commonStyles.text_large, { color: '#1A1D1E'}]}
            onPress={() => {
                props.navigation.navigate('Delete Account');
            }}
        />}
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
      <LogoutPopup 
        visible={modalVisible} 
        header='Log out'
        subHeader='Do you want to log out?'
        primaryButton='Log out'
        navigation={props.navigation} 
        onLogout={onLogout} />
    </SafeAreaView>
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
        <BookNav.Screen name='ParkingSpotsHome' component={ParkingSpotsHome} options={{ headerShown: false }}/>
        <BookNav.Screen name='Parking Details' component={ParkingDetails}/>
        <BookNav.Screen name='Payment' component={Payment}/>
        <BookNav.Screen name='Login' component={Login}/>
        <BookNav.Screen name='Confirmation' component={BookingConfirmation}/>
      </BookNav.Navigator>
    </>
  );
};

const BookList = createStackNavigator();
const BookListing = props => {
  return (
    <>
      <BookList.Navigator
        screenOptions={({ navigation, route }) => {
          return {
            headerTitle: route.name,
            headerLeft: () => <Header navigation={navigation} />
          };
        }}
      >
        <Drawer.Screen name='BookingsList' component={BookingsList}/>
      </BookList.Navigator>
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
              headerTitle: route.name === 'ParkingCompHome' || route.name === 'Home' ? `Hi, ${userData?.name}` : route.name,
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
        <Drawer.Screen name='BookListing' component={BookListing} options={{ headerShown: false }}/>
        <Drawer.Screen name='ViewReports' component={ViewReports}/>
        <Drawer.Screen name='Manage Payment' component={ManagePayment}/>
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
