import React from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Profile from '../screens/profile';
import ChangePassword from '../screens/changPassword';
import InviteFriends from '../screens/inviteFriends';
import SendFeedback from '../screens/sendFeedback';

function CustomDrawerContent(props) {
  return (
    <>
      <DrawerContentScrollView style={{ display: 'flex' }} {...props}>
        <DrawerItem
          label={'Profile'}
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          label={'Change Password'}
          onPress={() => {
            props.navigation.navigate('ChangePassword');
          }}
        />
        <DrawerItem
          label={'Invite Friends'}
          onPress={() => {
            props.navigation.navigate('InviteFriends');
          }}
        />
        <DrawerItem
          label={'Support/ Send Feedback'}
          onPress={() => {
            props.navigation.navigate('SendFeedback');
          }}
        />
      </DrawerContentScrollView>
      <View style={{ height: 50, marginTop: 'auto' }}>
        <TouchableOpacity
          onPress={() => {
            // dispatch(logout())
            //   .unwrap()
            //   .then(r => {
            //     props.navigation.replace('login');
            //   })
            //   .catch(e => {
            //     if (typeof e === 'object') Alert.alert('Error!', e.message);
            //     else Alert.alert('Error!', e);
            //   });
          }}
          style={{
            marginTop: 'auto',
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 15,
            alignItems: 'center'
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const Drawer = createDrawerNavigator();
const ShopNav = createStackNavigator();
const Shop = props => {
  return (
    <>
      <ShopNav.Navigator>
        <ShopNav.Screen name="Login" component={Login} />
      </ShopNav.Navigator>
    </>
  );
};
const MainNav = props => {
  return (
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        initialRouteName="Profile"
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: null,
          drawerIcon: null
        }}
      >
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
        <Drawer.Screen name="InviteFriends" component={InviteFriends} />
        <Drawer.Screen name="SendFeedback" component={SendFeedback} />
        <Drawer.Screen
          name="Profile"
          component={Shop}
          options={{
            headerShown: false
          }}
        />
      </Drawer.Navigator>
  );
};

export default Shop;
