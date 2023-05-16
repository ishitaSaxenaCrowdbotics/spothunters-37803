import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { screens } from "@screens";
import { modules, reducers, hooks, initialRoute } from "./modules";
import { connectors } from "@store";
import { GlobalOptionsContext } from "@options";
import SplashScreen from "./src/screens/splashScreen";
import OnBoarding from "./src/screens/onBoarding";
import Login from "./src/screens/login";
import termsAndConditions from "./modules/terms-and-conditions";
import privacyPolicy from "./modules/privacy-policy";
import SpotHunterReducer from "./src/state/reducers";
import TutorialScreen from "./src/screens/tutorialScreen";
import { Header } from "./src/components/header";
import ProceedAsGuest from "./src/screens/proceedAsGuest";
import MainNav from "./src/navigation";
import Home from "./src/screens/home";
import ChangePassword from "./src/screens/changPassword";
import EmailVerification from "./src/screens/emailVerification";
import { DrawerHeader } from "./src/components/drawerHeader";
// import { slice } from "./modules/social-login/auth";

const Stack = createStackNavigator(); 

const getNavigation = (modules, screens, initialRoute) => {
  
  const Navigation = () => {
    const screenOptions = {
      headerShown: true
    };
    return <NavigationContainer>
        <Stack.Navigator initialRouteName={'SplashScreen'} screenOptions={screenOptions}>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name='OnBoarding' component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='MainNav' component={MainNav} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={Home} 
            options={({ navigation, route }) => {
              return {
                headerStyle: { backgroundColor: '#FBFBFB' },
                headerTitle: route.name,
                headerLeft: () => <DrawerHeader navigation={navigation} />
              };
            }} />
          <Stack.Screen name='TermsAndConditions' component={termsAndConditions.navigator} 
            options={({ navigation, route }) => {
              return {
                headerStyle: { backgroundColor: '#FBFBFB' },
                headerTitle: 'Terms And Conditions',
                headerTitleAlign: 'center',
                headerLeft: () => <Header navigation={navigation} />
              };
            }} />
          <Stack.Screen name='PrivacyPolicy' component={privacyPolicy.navigator} 
            options={({ navigation, route }) => {
              return {
                headerStyle: { backgroundColor: '#FBFBFB' },
                headerTitle: 'Privacy Policy',
                headerTitleAlign: 'center',
                headerLeft: () => <Header navigation={navigation} />
              };
            }} />
          
          <Stack.Screen name='TutorialScreen' component={TutorialScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ProceedAsGuest' component={ProceedAsGuest} 
            options={({ navigation, route }) => {
              return {
                headerStyle: { backgroundColor: '#FBFBFB' },
                headerTitle: 'Proceed As Guest',
                headerTitleAlign: 'center',
                headerLeft: () => <Header navigation={navigation} />
              };
            }}
          />
          <Stack.Screen name='ChangePassword' component={ChangePassword} 
            options={({ navigation, route }) => {
              return {
                headerStyle: { backgroundColor: '#FBFBFB' },
                headerTitle: route.params.name,
                headerTitleAlign: 'center',
                headerLeft: () => <Header navigation={navigation} />
              };
            }} />
          <Stack.Screen name='EmailVerification' component={EmailVerification} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>;
  };

  return Navigation;
};

const getStore = globalState => {
  // const appReducer = createReducer(globalState, _ => {
  //   return globalState;
  // });
  const reducer = combineReducers({
    // app: appReducer,
    // auth_requests: auth_requests,
    // auth: slice.reducer,
    app: SpotHunterReducer,
    ...reducers,
    ...connectors
  });
  return configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
  });
};

const App = () => {
  const global = useContext(GlobalOptionsContext);
  const Navigation = getNavigation(modules, screens, initialRoute);
  const store = getStore(global);
  let effects = {};
  hooks.map(hook => {
    effects[hook.name] = hook.value();
  });
  return <Provider store={store}>
      <Navigation />
    </Provider>;
};

export default App;