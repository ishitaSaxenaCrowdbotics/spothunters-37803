import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, FlatList, Dimensions, Alert, ActivityIndicator, Modal } from 'react-native';
import { CustomButton } from '../../components/customButton';
import { colors, commonStyles } from '../../styles';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import { calculateTotalHours, convertToMeterToMiles } from '../../utils';
import SelectTime from '../../components/selectTime';
import { CreateAccountPopup } from '../../components/createAccountPopUp';
import { LogoutPopup } from '../../components/logOutPopup';
import { bookSpotRequest, updatePaymentStatusRequest } from '../../utils/service';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    useApplePay,
    useGooglePay,
    useStripe,
    presentGooglePay
  } from "@stripe/stripe-react-native";
import { fetchPaymentSheetParams, get_paymentIntent } from '../../../modules/payments/api';
import { localOptions, styles } from '../../../modules/payments/options';
import { StripeProvider } from "@stripe/stripe-react-native";
import style from './styles';
import { PaymentPopup } from '../../components/paymentPopup';

const ParkingDetails = (props) => { 

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const dispatch = useDispatch()
    const [iscreateAccountModal, setCreateAccountModal] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [tabSelected, setTabSelected] = useState(2)
    const [loading, setLoading] = useState()
    const [gPayinitialized, setGPayInitialized] = useState(false);
    const [isPaymentModal, setIsPaymentModal] = useState(2)
    let parkingPlace = useSelector(state => state?.app?.parkingPlace)
    let userData = useSelector(state => state?.app?.userData)
    let filters = useSelector(state => state?.app?.filters)
    console.log('filters: ', filters)
    const {
        merchantName,
        enableGooglePay,
        enableApplePay,
        merchantCountryCode,
        stripeTestEnv,
        merchantCurrency
      } = localOptions;

    const numofHours = calculateTotalHours(filters?.start, filters?.end) * filters?.day?.length
    console.log('diff: ', numofHours)
    const parkingFare = parkingPlace?.availability === 'Hourly' ? numofHours * parseFloat(parkingPlace?.price?.toFixed(2)) : parkingPlace?.price?.toFixed(2)
    const commission = parkingFare * parseFloat(parkingPlace?.commission)?.toFixed(2) * .01
    const total_price = parseFloat(commission) + parseFloat(parkingFare)

    const bookingData = () => {
        if (filters?.availability === 'Monthly'){
            return moment(filters?.month).format("MMMM, YYYY")
        } else if (filters?.availability === 'Daily'){
            return moment(filters?.start*1000).format("YYYY-MM-DD")
        } else if (filters?.availability === 'Weekly'){
            return moment(filters?.start*1000).format("YYYY-MM-DD") + ' - ' + moment(filters?.end*1000).format("YYYY-MM-DD")
        } else {
            return moment(filters?.start*1000).format("YYYY-MM-DD, HH:MM:SS") + ' - ' + moment(filters?.end*1000).format("YYYY-MM-DD, HH:MM:SS") + ', ' + filters?.day
        }
    }

    const dist = convertToMeterToMiles(getDistance(
        {longitude: props.route.params?.origin?.longitude, latitude: props.route.params?.origin?.latitude}, 
        {longitude: parkingPlace?.long, latitude: parkingPlace?.lat}))?.toFixed(1)

    const renderItem = ({item}) => {
        return(
            <View style={{backgroundColor: '#E9E9E9', padding: 8, marginRight: 16, flexDirection: 'row', marginBottom: 8}}>
                <Text style={[commonStyles.text_xxs_thick, { marginRight: 2}]}>{item?.name}</Text>
                <Icon name="send" type='feather' size={15} color={colors.black} />
            </View>
        )
    }

    const renderImages = ({item}) => {
        return(
               <Image source={{uri: item?.image}} style={{width: Dimensions.get("window").width*0.8, marginRight: 5, borderRadius: 8}} />
        )
    }

    const updatePaymentStatus = async (id, paymentIntent) => {
        // let paymentIntent = await get_paymentIntent();
        // console.log('paymentIntent: ', paymentIntent)
        const reqBody = {
            payment: true,
            payment_stipe_id: paymentIntent,
            paid_amount: (parkingPlace?.is_payment_available && tabSelected === 1) ? commission?.toFixed(2) : total_price.toFixed(2)
        }
        console.log('reqBody: ', reqBody)
        const resp = await dispatch(updatePaymentStatusRequest(reqBody, id))
        console.log('resp: ', resp)
        if(resp?.id){
            setLoading(false)
            props.navigation.navigate('Confirmation', {id, parkingPlaceName: parkingPlace?.name, placeAdd: parkingPlace?.address, paid: resp?.paid_amount * 100, inTime: filters?.start, outTime: filters?.end, availability: filters?.availability})
        } else {
            setLoading(false)
        }
    }

    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer } =
          await fetchPaymentSheetParams((parkingPlace?.is_payment_available && tabSelected === 1) ? commission?.toFixed(2) : total_price.toFixed(2));
        const { error } = await initPaymentSheet({
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          merchantDisplayName: merchantName,
          applePay: false,
          googlePay: enableGooglePay,
          merchantCountryCode: merchantCountryCode,
          testEnv: stripeTestEnv // use test environment
        });
        __DEV__ && console.log(error);
        if (!error) {
        //   setLoading(true);
        }
        return paymentIntent
    };
    
      // Pay Through Credit Card
      const openPaymentSheet = async (id) => {
        const paymentIntent = await initializePaymentSheet();
        const { error } = await presentPaymentSheet({ clientSecret: localOptions.stripeSecretKey });
    
        if (error) {
            setLoading(false)
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            updatePaymentStatus(id, paymentIntent)
        //   Alert.alert("Success", "Your order is confirmed!");

        }
    };

    const bookNow = async () => {
        setIsPaymentModal(false)
        setLoading(true)
        const req = {
            "place": parkingPlace?.id,
            end: filters?.availability === 'Monthly' ? moment(filters?.month).format("YYYY-MM-DDThh:mm:ss") + 'Z' : moment(filters?.end*1000).format("YYYY-MM-DDThh:mm:ss") + 'Z',
            start: filters?.availability === 'Monthly' ? moment(filters?.month).format("YYYY-MM-DDThh:mm:ss") + 'Z' : moment(filters?.start*1000).format("YYYY-MM-DDThh:mm:ss") + 'Z',
            "fare": parkingPlace?.price?.toFixed(2),
            "paid_amount": (parkingPlace?.is_payment_available && tabSelected === 1) ? commission?.toFixed(2) : total_price.toFixed(2),
            "days": filters?.day?.toString(),
            "payment": false,
            "payment_mode": "Cash"
        }
        console.log('req: ', req)
        const resp = await dispatch(bookSpotRequest(req))
        console.log('resp: ', resp)
        if(resp?.status){
            if(userData?.is_guest){
                setModalVisible(false)
                setCreateAccountModal(true)
                setLoading(false)
            } else {
                // setModalVisible(false)
                console.log('stripe: ', resp?.data?.id)
                openPaymentSheet(resp?.data?.id)
                // props.navigation.navigate('Payments')
                // props.navigation.reset({routes:[{name: 'Confirmation'}]})
            }
        } else {
            setLoading(false)
        }
    }

    if (enableGooglePay) {
        // Google Pay related config
        const { initGooglePay } = useGooglePay();
    
        useEffect(() => {
          async function initialize() {
            const { error } = await initGooglePay({
              testEnv: stripeTestEnv,
              merchantName: merchantName,
              countryCode: merchantCountryCode,
              billingAddressConfig: {
                format: "FULL",
                isPhoneNumberRequired: true,
                isRequired: false
              },
              existingPaymentMethodRequired: false,
              isEmailRequired: true
            });
    
            if (error) {
              Alert.alert(error.code, error.message);
              return;
            }
            setGPayInitialized(true);
          }
          if (Platform.OS === "android") {
            initialize();
          }
        }, [initGooglePay]);
    }
    
    const payGoogle = async () => {
        bookNow()
        setIsPaymentModal(false)
        const { paymentIntent } = await fetchPaymentSheetParams((parkingPlace?.is_payment_available && tabSelected === 1) ? commission?.toFixed(2) : total_price.toFixed(2))
        const { error } = await presentGooglePay({
            clientSecret: paymentIntent,
            currencyCode: merchantCurrency
        });

        if (error) {
            Alert.alert(error.code, error.message);
            return;
        }
        Alert.alert("Success", "The SetupIntent was confirmed successfully.");
    };

      // Apple Pay related config
    const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay({
        onShippingMethodSelected: (shippingMethod) => {
        __DEV__ && console.log("shippingMethod", shippingMethod);
        // Update cart summary based on selected shipping method.
        },
        onShippingContactSelected: (shippingContact) => {
        __DEV__ && console.log("shippingContact", shippingContact);
        // Make modifications to cart here e.g. adding tax.
        // handler(cart);
        }
    });

    const payApple = async () => {
        bookNow()
        setIsPaymentModal(false)
        console.log('apple pay: ')
    const { error, paymentMethod } = await presentApplePay({
        cartItems: [{ label: merchantName, amount: '60' }],
        country: merchantCountryCode,
        currency: merchantCurrency,
        requiredShippingAddressFields: ["emailAddress", "phoneNumber", "name"],
        requiredBillingContactFields: ["phoneNumber", "name"],
        jcbEnabled: true
    });

    console.log('paymentMethod: ', )

    if (error) {
        Alert.alert(error.code, error.message);
    } else {
        __DEV__ && console.log(JSON.stringify(paymentMethod, null, 2));
        const { paymentIntent } = await fetchPaymentSheetParams((parkingPlace?.is_payment_available && tabSelected === 1) ? commission?.toFixed(2) : total_price.toFixed(2));

        const { error: confirmApplePayError } = await confirmApplePayPayment(
        paymentIntent
        );

        if (confirmApplePayError) {
        Alert.alert(confirmApplePayError.code, confirmApplePayError.message);
        } else {
        Alert.alert("Success", "The payment was confirmed successfully!");
        }
    }
    };

  return (
      <SafeAreaView style={{backgroundColor: '#FBFBFB', flex: 1}}>
          <StripeProvider
        publishableKey={localOptions.stripePublishKey}
        merchantIdentifier={localOptions.merchantIdentifier}
      >
          <>
          
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
            <View style={{height: 170}} >
                <FlatList 
                    data={parkingPlace?.places_image}
                    horizontal
                    nestedScrollEnabled
                    renderItem={renderImages}
                    keyExtractor={(item, index) => `${item.id}-${index}`}/>
            </View>
            <View style={{margin: 16}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginRight: 20, flex: 0.80}}>
                        <Text style={[commonStyles.text_large_thick, {color: '#151313', marginBottom: 8}]}>
                            {parkingPlace?.name}
                        </Text>
                        <Text style={[commonStyles.text_xs, {color: '#6A6A6A'}]}>
                            {parkingPlace?.address}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 0.2, alignItems: 'center'}}>
                        <Icon name="map-pin" type='font-awesome' size={25} color={colors.black} />
                        <Text style={[commonStyles.text_xs, {color: '#6A6A6A'}]}>
                            {dist} mi
                        </Text>
                    </View>
                </View>
                <Text style={[commonStyles.text_small_thick, {marginVertical: 25}]}>Amenities</Text>
                <FlatList 
                    numColumns={4}
                    nestedScrollEnabled
                    data={parkingPlace?.place_amenity}
                    showsVerticalScrollIndicator={true}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item.id}-${index}`}/>
                <Text style={[commonStyles.text_small_thick, commonStyles.marginVertical12]}>Parking Type : {parkingPlace?.availability}</Text>
                <Text>{bookingData()}</Text>
                {parkingPlace?.is_payment_available && 
                        <View style={[commonStyles.flexRow, commonStyles.paddingVertical16, commonStyles.fullWidth, commonStyles.justifyContentBetween]}>
                            <TouchableOpacity style={[commonStyles.flex1, commonStyles.marginRight20, commonStyles.padding8, {backgroundColor: tabSelected === 1 ? colors.base : colors.COLOR_FBFBFB}]} onPress={() => setTabSelected(1)}>
                                <Text style={[tabSelected === 1 ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>{`Pay Reservation Fee $${commission?.toFixed(2)}`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.flex1, commonStyles.padding8, {backgroundColor: tabSelected === 2 ? colors.base : colors.COLOR_FBFBFB}]} onPress={() => setTabSelected(2)}>
                                <Text style={[tabSelected === 2 ? commonStyles.whiteTextColor : commonStyles.blackTextColor]}>{`Pay Full Fare $${total_price.toFixed(2)}`}</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </ScrollView>
        <View style={{paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[commonStyles.text_xs_bold, {textAlign: 'center'}]}>
                   {`Parking Fare: $${parkingFare}`}
                </Text>
                <Text style={[commonStyles.text_xs_bold, {textAlign: 'center'}]}>
                    {`Reservation Fee: $${commission?.toFixed(2)}`}
                </Text>
                <Text style={[commonStyles.text_xs_bold, {textAlign: 'center'}]}>
                    {`Total Fee: $${total_price.toFixed(2)}`}
                </Text>
            </View>
            <View style={{flex: 0.5}}>
                {loading ? <ActivityIndicator color={colors.base} size={'large'}/>
                    : 
                    <>
                        <CustomButton label={`Pay ${(parkingPlace?.is_payment_available && tabSelected === 1) ? `$${commission?.toFixed(2)}` : `$${total_price.toFixed(2)}`}`} isPrimaryButton onPress={() => setModalVisible(true)} />
                    </>
                }
            </View>
        </View>
        </>
        </StripeProvider>
        <CreateAccountPopup isModal={iscreateAccountModal} setModal={setCreateAccountModal} navigation={props.navigation}/>
        <LogoutPopup
            visible={modalVisible} 
            header='Booking Confirmation'
            subHeader='Are you sure you want to book?'
            primaryButton='Yes'
            navigation={props.navigation} 
            onLogout={() => {
                setModalVisible(false)
                setIsPaymentModal(true)
            }}
            onClose={() => setModalVisible(false)} />
        <PaymentPopup
        visible={isPaymentModal} 
        navigation={props.navigation}
        bookNow={bookNow}
        payGoogle={payGoogle}
        gPayinitialized={gPayinitialized}
        enableGooglePay={enableGooglePay}
        onClose={() => setIsPaymentModal(false)}
        isApplePaySupported={isApplePaySupported}
        payApple={payApple}
        enableApplePay={enableApplePay} />
    </SafeAreaView>
  );
}

export default ParkingDetails;
