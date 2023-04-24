import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'react-native-elements'
import Maps from '../../../modules/maps';
import { autoCompleteStyles } from '../../../modules/maps/styles';
import { ListParkingSpotItem } from '../../components/parkingSpots';
import { colors, commonStyles } from '../../styles';
import { parkingSearchRequest } from '../../utils/service';
import { useDispatch, useSelector } from 'react-redux';
import SelectTime from '../../components/selectTime';
import Geolocation from 'react-native-geolocation-service'
import { PERMISSIONS, request } from 'react-native-permissions';

const ParkingSpotsHome = (props) => {
    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    const [isMapView, setMapView] = useState(false)
    const [isBTPrice, setBTPrice] = useState(false)
    const [isMostWeighted, setMostWeighted] = useState(false)
    const [isClosest, setClosest] = useState(false)
    const [isAirport, setAirport] = useState(false)
    const [isModal, setModal] = useState(false)
    const [defaultOrigin, setDefaultOrigin] = useState({
        latitude: 28.6107092000000000,
        longitude: 77.1943697000000000,
        title: "",
        description: ""
      });

    const renderItemPrev = ({item}) => {
        return (<ListParkingSpotItem navigation={props.navigation} item={item} defaultOrigin={defaultOrigin} />)
    }

    const onHandleListView = flag => {
        setMapView(flag)
    }

    const dispatch = useDispatch()
    let parkingSearchList = useSelector(state => state?.app?.parkingSearchList)
    console.log('parkingSearchList: ', parkingSearchList)

    const getCurrentLocation = () => {
        try {
            request(
                Platform.select({
                  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                })
              ).then(res => {
                if (res == "granted") {
                  Geolocation.getCurrentPosition(
                    (position) => {
                      console.log(position);
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
            } catch (error) {
              console.log("location set error:", error);
            }
    }

    useEffect(() => {
        getParkingPlaces()
        getCurrentLocation()
    }, [])

    const getParkingPlaces = async () => {
        const resp = await dispatch(parkingSearchRequest())
        console.log('resp: ', resp)
    }

    const handleFilter = async(type) => {
        let reqData = null
        if(type === 'price') {
            setBTPrice(!isBTPrice)
        } else if(type === 'mostweighted') {
            setMostWeighted(!isMostWeighted)
        } else if(type === 'closest') {
            setClosest(!isClosest)
        } else if(type === 'airport') {
            setAirport(!isAirport)
            reqData = {
                is_airport: !isAirport,
            }
        }
        const resp1 = await dispatch(parkingSearchRequest(reqData))
        console.log('resp1: ', resp1)
    }

  return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{ zIndex: 1, height: 85, justifyContent: 'space-between', position: isMapView ? 'absolute' : null, width: '100%'}}>
            <View style={{flexDirection: 'row', top: 10}}>
                <GooglePlacesAutocomplete
                    placeholder='Search location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={"default"}
                    fetchDetails={true}
                    // textInputProps={{
                    // onChangeText: (text) => setInputValue(text)
                    // }}
                    // onPress={(data, details = null) => getAddressHandle(details)}
                    styles={autoCompleteStyles}
                    query={{
                    key: 'AIzaSyAzo9Xzk5QwuAixqF8Kxdxp1zgMfL2DtKA',
                    language: "en"
                    }}
                />
                <TouchableOpacity onPress={getCurrentLocation} style={{flex: 0.2, alignSelf: 'center'}}>
                    <Icon name="gps-fixed" type='material' size={25} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(true)} style={{flex: 0.2, alignSelf: 'center'}}>
                    <Icon name="time-outline" type='ionicon' size={25} color={'black'}/>
                </TouchableOpacity>
                </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
                <TouchableOpacity style={{backgroundColor: isBTPrice ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40, marginRight: 10}} onPress={() => handleFilter('price')}>
                    <Text style={commonStyles.text_xs_thick}>best price</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: isMostWeighted ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40, marginRight: 10}} onPress={() => handleFilter('mostweighted')}>
                    <Text style={commonStyles.text_xs_thick}>most weighted</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: isClosest ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40, marginRight: 10}} onPress={() => handleFilter('closest')}>
                    <Text style={commonStyles.text_xs_thick}>Closest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: isAirport ? colors.COLOR_F8D247:'#EDEEF1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40}} onPress={() => handleFilter('airport')}>
                    <Text style={commonStyles.text_xs_thick}>airport</Text>
                </TouchableOpacity>
            </View>
        </View>
        {isMapView ? 
        <Maps handleListView={() => onHandleListView(false)} showSearchInput={true} navigation={props.navigation} markedLocations={parkingSearchList?.results} />
        : 
        <>
        <View style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, marginTop: 10 }}>
            <Text style={[commonStyles.text_xs_thick, {textAlignVertical: 'center'}]}>
                {parkingSearchList?.count} parking spots near you
            </Text>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => onHandleListView(true)}>
            <Icon name="map-outline" type='ionicon' size={25} color={colors.base} />
            <Text style={[commonStyles.text_xs, {color: '#1E8FFF', marginLeft: 8}]}>Map View</Text>
            </TouchableOpacity>
        </View>
        {parkingSearchList?.results?.length > 0 ?
        <FlatList
            data={parkingSearchList?.results}
            showsVerticalScrollIndicator={true}
            renderItem={renderItemPrev}
            keyExtractor={(item, index) => `${item.id}-${index}`}
        /> : 
        <View style={{justifyContent: 'center', height:'70%', alignItems: 'center'}}>
            <Text style={commonStyles.text_big_bold}>no results found...</Text>
        </View>}
        </>
        }
        <SelectTime isModal={isModal} setModal={setModal} />
    </SafeAreaView>
  );
}

export default ParkingSpotsHome;
