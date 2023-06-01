import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'react-native-elements'
import Maps from '../../../modules/maps';
import { autoCompleteStyles } from '../../../modules/maps/styles';
import { ListParkingSpotItem } from '../../components/parkingSpots';
import { colors, commonStyles } from '../../styles';
import { parkingSearchListRequest, parkingSearchRequest } from '../../utils/service';
import { useDispatch, useSelector } from 'react-redux';
import SelectTime from '../../components/selectTime';
import Geolocation from 'react-native-geolocation-service'
import { PERMISSIONS, request } from 'react-native-permissions';
import { toUnixTime } from '../../utils';
import moment from 'moment';
import { filters } from '../../state/actions';

const ParkingSpotsHome = (props) => {
    
    const [inputValue, setInputValue] = useState("");
    const [isMapView, setMapView] = useState(false)
    const [isBTPrice, setBTPrice] = useState(false)
    const [isMostWeighted, setMostWeighted] = useState(false)
    const [isClosest, setClosest] = useState(false)
    const [isAirport, setAirport] = useState(false)
    const [isModal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectTime, setSelectTime] = useState('')
    const [defaultOrigin, setDefaultOrigin] = useState({
        latitude: 28.6107092000000000,
        longitude: 77.1943697000000000,
        title: "",
        description: ""
    });

    let filterData = useSelector(state => state?.app?.filters)

    const bookingData = () => {
        if(filterData?.availability){
            console.log('chnged1 filterData: ', filterData)
            var timestemp = new Date(filterData?.start*1000);
            console.log('chnged1 filterData dated ate: ', filterData?.start)
            console.log('chnged1 filterData date: ', timestemp)
            if (filterData?.availability === 'Monthly'){
                setSelectTime(filterData?.availability + ': ' + moment(filterData?.month).format("MMMM, YYYY"))
            } else if (filterData?.availability === 'Daily'){
                setSelectTime(filterData?.availability + ': ' + moment(filterData?.start*1000).format("YYYY-MM-DD"))
            } else if (filterData?.availability === 'Weekly'){
                setSelectTime(filterData?.availability + ': ' + moment(filterData?.start*1000).format("YYYY-MM-DD") + ' - ' + moment(filterData?.end*1000).format("YYYY-MM-DD"))
            } else {
                setSelectTime(filterData?.availability + ': ' + moment(filterData?.start*1000).format("YYYY-MM-DD, HH:MM:SS") + ' - ' + moment(filterData?.end*1000).format("YYYY-MM-DD, HH:MM:SS") + ', ' + filterData?.day)
            }
        }
    }

    useEffect(() => {
        bookingData()
        console.log('chnged filterData: ', filterData)
    },[filterData])

    const renderItemPrev = ({item}) => {
        return (<ListParkingSpotItem navigation={props.navigation} item={item} defaultOrigin={defaultOrigin} />)
    }

    const onHandleListView = flag => {
        setMapView(flag)
    }

    const dispatch = useDispatch()
    let parkingSearchList = useSelector(state => state?.app?.parkingSearchList)

    const getCurrentLocation = async () => {
        try {
            if(Platform.OS === 'ios'){
                const locationPermissionStatus = await Geolocation.requestAuthorization("always")
                console.log('locationPermissionStatus: ', locationPermissionStatus)
                Geolocation.setRNConfiguration({
                    skipPermissionRequests: false,
                   authorizationLevel: 'always',
                 });
                Geolocation.getCurrentPosition(
                    (position) => {
                    setDefaultOrigin({
                            latitude: position?.coords?.latitude,
                            longitude: position?.coords?.longitude
                        });
                    },
                    (error) => {
                    // See error code charts below.
                    console.log('vbnm', error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                request(
                    Platform.select({
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    })
                ).then(res => {
                    console.log('permission: ', res)
                    if (res == "granted") {
                    Geolocation.getCurrentPosition(
                        (position) => {
                        setDefaultOrigin({
                                latitude: position?.coords?.latitude,
                                longitude: position?.coords?.longitude
                            });
                        },
                        (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                    } else {
                    // console.log("Location is not enabled");
                    }
                });
                }
            } catch (error) {
              console.log("location set error:", error);
            }
            
    }

    useEffect(() => {
        getParkingPlaces()
        getCurrentLocation()
    }, [])

    const getParkingPlaces = async () => {
        const nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        console.log('nextDate: ', nextDate)
        dispatch(filters({
            end: toUnixTime(nextDate.getFullYear(), nextDate.getMonth()+1, nextDate.getDate(), nextDate.getHours(), nextDate.getMinutes(), nextDate.getSeconds()),
            start: toUnixTime(nextDate.getFullYear(), nextDate.getMonth()+1, nextDate.getDate(), nextDate.getHours(), nextDate.getMinutes(), nextDate.getSeconds()),
            availability: 'Daily', 
          }))
        setLoading(true)
        const reqData = {
            end: toUnixTime(nextDate.getFullYear(), nextDate.getMonth()+1, nextDate.getDate(), nextDate.getHours(), nextDate.getMinutes(), nextDate.getSeconds()),
            start: toUnixTime(nextDate.getFullYear(), nextDate.getMonth()+1, nextDate.getDate(), nextDate.getHours(), nextDate.getMinutes(), nextDate.getSeconds()),
            availability: 'Daily'
          }
        const resp = await dispatch(parkingSearchListRequest(reqData)) 
        console.log('resp: ', resp)
        if(resp){
            setLoading(false)
        }
    }

    let reqData = {}
    const handleFilter = async(type) => {
        setLoading(true)
        reqData = {
            best_price: isBTPrice,
            weighted: isMostWeighted,
            closest: !isClosest ? '' : `${defaultOrigin.latitude},${defaultOrigin.longitude}`,
            is_airport: isAirport
        }

        if(type === 'price') {
            setBTPrice(!isBTPrice)
            // reqData = {...reqData,
            //         best_price: !isBTPrice}
            reqData.best_price= !isBTPrice
        } else if(type === 'mostweighted') {
            setMostWeighted(!isMostWeighted)
            // reqData = {...reqData,
            reqData.weighted= !isMostWeighted
            // }
        } else if(type === 'closest') {
            setClosest(!isClosest)
            // reqData = {...reqData,
            reqData.closest= isClosest ? '' : `${defaultOrigin.latitude},${defaultOrigin.longitude}`
            // }
        } else if(type === 'airport') {
            setAirport(!isAirport)
            // reqData = {...reqData,
            reqData.is_airport= !isAirport
            // }
        }
        console.log('req: ', reqData)
        const resp1 = await dispatch(parkingSearchListRequest(reqData))
        console.log('resp1: ', resp1)
        if(resp1){
            setLoading(false)
        }
    }

    const goBack = () => {
        props?.navigation.goBack();
    }

    const getAddressHandle = async (address) => {
        setInputValue("");
        console.log(address)
        const latitude = address.geometry.location.lat;
        const longitude = address.geometry.location.lng;
        setDefaultOrigin({
            ...defaultOrigin,
            latitude: latitude,
            longitude: longitude,
        });
        const resp = await dispatch(parkingSearchListRequest({g_location: latitude+','+longitude}))
        console.log('resp: ', resp)
        if(resp){
            setLoading(false)
        }
    }

  return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{ zIndex: 1, height: inputValue ? '100%' : 85, justifyContent: 'space-between', position: isMapView ? 'absolute' : null, width: '100%', marginTop: 30}}>
            <View style={{flexDirection: 'row', flex: 0.7, alignItems: inputValue ? 'flex-start' : 'center'}}>
                <TouchableOpacity onPress={goBack} style={[commonStyles.justifyContentCenter, commonStyles.alignItemsCenter]}>
                    <Icon name="chevron-back" type='ionicon' size={24} color={colors.black} containerStyle={commonStyles.marginHorizontal16} />
                </TouchableOpacity>
                <GooglePlacesAutocomplete
                    placeholder='Search location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={"default"}
                    fetchDetails={true}
                    textInputProps={{
                    onChangeText: (text) => setInputValue(text)
                    }}
                    onPress={(data, details = null) => getAddressHandle(details)}
                    styles={autoCompleteStyles}
                    query={{
                    key: 'AIzaSyA1S6jipglBXWIlzsw_lXx5bktRQCmfpNA',
                    language: "en"
                    }}
                />
                <TouchableOpacity onPress={getCurrentLocation} style={{flex: 0.2, alignSelf: inputValue ? 'flex-start' : 'center'}}>
                    <Icon name="gps-fixed" type='material' size={25} color={'black'} />
                </TouchableOpacity>
                {!inputValue && <TouchableOpacity onPress={() => setModal(true)} style={{flex: 0.2, alignSelf: 'center'}}>
                    <Icon name="time-outline" type='ionicon' size={25} color={'black'}/>
                </TouchableOpacity>}
            </View>
            {!inputValue && <View style={{flexDirection: 'row', paddingHorizontal: 16, flex: 0.3}}>
                <TouchableOpacity style={{backgroundColor: isBTPrice ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40, marginRight: 10}} onPress={() => handleFilter('price')} disabled={isAirport}>
                    <Text style={commonStyles.text_xs_thick}>best price</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: isMostWeighted ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40, marginRight: 10}} onPress={() => handleFilter('mostweighted')} disabled={isAirport}>
                    <Text style={commonStyles.text_xs_thick}>most weighted</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: isClosest ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40, marginRight: 10}} onPress={() => handleFilter('closest')} disabled={isAirport}>
                    <Text style={commonStyles.text_xs_thick}>Closest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: isAirport ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40}} onPress={() => handleFilter('airport')}>
                    <Text style={commonStyles.text_xs_thick}>airport</Text>
                </TouchableOpacity>
            </View>}
        </View>
        {isMapView ? 
        <Maps handleListView={() => onHandleListView(false)} showSearchInput={true} navigation={props.navigation} markedLocations={parkingSearchList} />
        : 
        <>
        {loading ? <ActivityIndicator style={{marginTop: 50}} size="large" color={colors.base} /> : 
        <>
        <Text style={{paddingHorizontal: 16,  marginTop: 10}}>{selectTime ? selectTime : `Daily: ${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}`}</Text>
        <View style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, marginTop: 5 }}>
            <Text style={[commonStyles.text_xs_thick, {textAlignVertical: 'center'}]}>
                {parkingSearchList?.count} parking spots near you
            </Text>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => onHandleListView(true)}>
            <Icon name="map-outline" type='ionicon' size={25} color={colors.base} />
            <Text style={[commonStyles.text_xs, {color: '#1E8FFF', marginLeft: 8}]}>Map View</Text>
            </TouchableOpacity>
        </View>
        {parkingSearchList?.length > 0 ?
        <FlatList
            data={parkingSearchList}
            showsVerticalScrollIndicator={true}
            renderItem={renderItemPrev}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getParkingPlaces}
                />
            }
        /> : 
        <View style={{justifyContent: 'center', height:'70%', alignItems: 'center'}}>
            <Text style={commonStyles.text_big_bold}>no results found...</Text>
        </View>}
        </>
        }
        </>
        }
        <SelectTime isModal={isModal} setModal={setModal} setLoading={setLoading}/>
    </SafeAreaView>
  );
}

export default ParkingSpotsHome;
