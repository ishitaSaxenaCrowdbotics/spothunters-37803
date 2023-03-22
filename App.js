import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";
import { screens } from "@screens";
import { modules, reducers, hooks, initialRoute } from "./modules";
import { connectors } from "@store";
import { GlobalOptionsContext } from "@options";
import SplashScreen from "./src/screens/splashScreen";
import OnBoarding from "./src/screens/onBoarding";
import Login from "./src/screens/login";
import termsAndConditions from "./modules/terms-and-conditions";
import privacyPolicy from "./modules/privacy-policy";
import ChangePassword from "./src/screens/changPassword";
import Home from "./src/screens/home";
import PreviousBooking from "./src/components/previousBooking";
import UpcomingBooking from "./src/components/upcomingBooking";
import qrCode from "./modules/qr-code";
import SpotHunterReducer from "./src/state/reducers";
import TutorialScreen from "./src/screens/tutorialScreen";
import EmailVerification from "./src/screens/emailVerification";

const Stack = createStackNavigator();

const getNavigation = (modules, screens, initialRoute) => {
  const Navigation = () => {
    const screenOptions = {
      headerShown: true
    };
    return <NavigationContainer>
        <Stack.Navigator initialRouteName={SplashScreen} screenOptions={screenOptions}>
          {/* {routes} */}
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name='OnBoarding' component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='TermsAndConditions' component={termsAndConditions.navigator} options={{ headerShown: false }} />
          <Stack.Screen name='PrivacyPolicy' component={privacyPolicy.navigator} options={{ headerShown: false }} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='TutorialScreen' component={TutorialScreen} options={{ headerShown: false }} />
          <Stack.Screen name='PreviousBooking' component={PreviousBooking} options={{ headerShown: false }} />
          <Stack.Screen name='qrCode' component={qrCode.navigator} options={{ headerShown: false }} />
          <Stack.Screen name='EmailVerification' component={EmailVerification} options={{ headerShown: false }} />
          {/* <Stack.Screen name='UpcomingBooking' component={UpcomingBooking} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name='socialLogin' component={login.} options={{ headerShown: false }} /> */}
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