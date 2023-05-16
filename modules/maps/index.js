import React, { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity, Image, Platform, Text, FlatList, SafeAreaView } from "react-native";
import { styles, autoCompleteStyles } from "./styles";
// @ts-ignore
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Callout, Marker } from "react-native-maps";
import PropTypes from "prop-types";
import { PERMISSIONS, request } from "react-native-permissions";
import Geolocation from 'react-native-geolocation-service'
import { MapParkingSpotItem,  } from '../../src/components/parkingSpots'
import { colors, commonStyles } from "../../src/styles";
import SvgUri from "react-native-svg-uri";
import { color } from "react-native-elements/dist/helpers";
import { getDistance } from 'geolib';
import { convertToMeterToMiles } from "../../src/utils";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { parkingSearchListRequest } from "../../src/utils/service";
import { MapMarker } from '../../src/components/mapMarker'

const Maps = ({navigation, handleListView, origin, enableDirections = true, showSearchInput = true, markerImage, originTitle, originDescription, apiKey='AIzaSyA1S6jipglBXWIlzsw_lXx5bktRQCmfpNA', onNavigationStart, onNavigationError, getDuration, markerColor, getDestinationAddress, strokeColor, strokeWidth, onLatLngChange, markerImageStyle = {}, mainContainerStyle = {}, markedLocations=[], onDragEnd, onDrag, onDragStart }) => {
  // const [mapRef, setMapRef] = useState(null);
  const [defaultOrigin, setDefaultOrigin] = useState({
    latitude: 28.6107092000000000,
    longitude: 77.1943697000000000,
    title: "",
    description: ""
  });
  const [inputValue, setInputValue] = useState("");
  const [destination, setDestination] = useState();
  const [isDirection, setIsDirection] = useState(false);
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE = defaultOrigin.latitude;
  const LONGITUDE = defaultOrigin.longitude;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]

  const mapRef = React.createRef();

  const dispatch = useDispatch()
  let parkingSearchList = useSelector(state => state?.app?.parkingSearchList)

  const getParkingPlaces = async () => {
      const resp = await dispatch(parkingSearchListRequest())
      console.log('resp: ', resp)
      if(resp.id){
          Alert.alert('feedback sent')
      }
  }

  const getCurrentLocation = () => {
    try {
      if(Platform.OS === 'ios'){
        Geolocation.requestAuthorization("always")
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
    handleAnimate({ latitude: defaultOrigin?.latitude, longitude: defaultOrigin?.longitude });
  },[mapRef])

  useEffect(() => {
    getParkingPlaces()
    getCurrentLocation()
    // if (origin) {
    //   setDefaultOrigin({
    //     ...defaultOrigin,
    //     latitude: origin?.latitude,
    //     longitude: origin?.longitude,
    //     title: originTitle || "",
    //     description: originDescription || ""
    //   });
    // }
  }, []);

  const onMapPress = async (e) => {
    const coords = e.nativeEvent.coordinate;
    if (onLatLngChange) {
      onLatLngChange(coords);
    }

    if (isDirection) {
      setDestination({ latitude: coords.latitude, longitude: coords.longitude, title: "", description: "" });
    } else {
      setDefaultOrigin({ ...defaultOrigin, latitude: coords.latitude, longitude: coords.longitude });
    }
  };

  const handleOnReady = (result) => {
    mapRef.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20
      }
    });
    if (getDistance) {
      getDistance(result.distance);
    }
    if (getDuration) {
      getDuration(result.duration);
    }
  };

  const handleDirections = () => {
    setIsDirection(!isDirection);
  };

  const getAddressHandle = (address) => {
    setInputValue("");
    if (onLatLngChange) {
      onLatLngChange(address.geometry.location);
    }
    const title = address.name;
    const description = address.formatted_address;
    const latitude = address.geometry.location.lat;
    const longitude = address.geometry.location.lng;
    if (isDirection) {
      setDestination({
        ...destination,
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description
      });
      if (getDestinationAddress) {
        getDestinationAddress({ address: description, location: address.geometry.location });
      }
    } else {
      setDefaultOrigin({
        ...defaultOrigin,
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description
      });
    }
    handleAnimate({ latitude: latitude, longitude: longitude });
  };

  const handleAnimate = (coords) => {
    mapRef?.current?.animateCamera({
      center: coords,
      pitch: 90
    });
  };

  const handleOnStart = (params) => {
    if (onNavigationStart) {
      onNavigationStart(params);
    }
  };

  const handleOnError = (errorMessage) => {
    if (onNavigationError) {
      onNavigationError(errorMessage);
    }
  };

  const setOriginAddress = async (latlng, locTitle) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.latitude},${latlng.longitude}&key=${apiKey}`;
    try {
      const resp = await fetch(url);
      const respJson = await resp.json();
      const address = respJson.results[0].formatted_address;
      const [title, ...desc] = address.split(",");
      const description = desc.join(",");
      if (locTitle === "origin") {
        setDefaultOrigin({ ...defaultOrigin, title: title, description: description });
      } else {
        setDestination({ ...destination, title: title, description: description });
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleDragOrigin = (e) => {
    const coords = e.nativeEvent.coordinate;
    setDefaultOrigin({ ...defaultOrigin, latitude: coords.latitude, longitude: coords.longitude, title: "", description: "" });
    if (onLatLngChange) {
      onLatLngChange(coords);
    }
    if (onDragEnd) {
      onDragEnd(coords);
    }
  };

  const handleDragDest = (e) => {
    const coords = e.nativeEvent.coordinate;
    setDestination({ ...destination, latitude: coords.latitude, longitude: coords.longitude, title: "", description: "" });
    if (onLatLngChange) {
      onLatLngChange(coords);
    }
    if (onDragEnd) {
      onDragEnd(coords);
    }
  };

  const handleOnDrag = () => {
    if (onDrag) {
      onDrag();
    }
  };

  const handleOnDragStart = () => { 
    if (onDragStart) {
      onDragStart();
    }
  };

  const renderItem = ({item}) => {
    return(<MapParkingSpotItem navigation={navigation}  item={item} defaultOrigin={defaultOrigin} selectLocation={selectLocation} />)
  }

  const selectLocation = (region) => {
    mapRef?.current?.animateToRegion( {
      latitude: region?.latitude,
      longitude: region?.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
  }, 100);
  };

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={[styles.view, mainContainerStyle]}>
        <MapView
          initialRegion={{
            latitude: defaultOrigin.latitude,
            longitude: defaultOrigin.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          ref={mapRef}
          onPress={onMapPress}
          style={styles.map}
        >
          {markedLocations && markedLocations.map((item, index) =>
            {
              const dist = getDistance(
                {longitude: defaultOrigin.longitude, latitude: defaultOrigin.latitude}, 
                {longitude: item.long, latitude: item.lat})
            return(
            <Marker
            // onMarkerPress={() => console.log('pressed')}
              onMar
              key={index}
              coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.long) }}
              title={item?.title}
              description={item?.description}
              pinColor={markerColor}
            >
              {/* <Callout> */}
                <MapMarker dist={dist} item={item} navigation={navigation}  origin={defaultOrigin}/>
              {/* </Callout> */}
            </Marker>)
            })}

          <Marker
            key={1}
            draggable
            coordinate={{ latitude: defaultOrigin.latitude, longitude: defaultOrigin.longitude }}
            title={defaultOrigin?.title}
            description={defaultOrigin?.description}
            pinColor={markerColor || null}
            onPress={() => setOriginAddress(defaultOrigin, "origin")}
            onDrag={() => handleOnDrag()}
            onDragStart={() => handleOnDragStart()}
            onDragEnd={(e) => handleDragOrigin(e)}
          >
          </Marker>
          {destination && (
            <Marker
              key={2}
              draggable
              coordinate={destination}
              title={destination?.title}
              description={destination?.description}
              pinColor={markerColor || null}
              onPress={() => setOriginAddress(destination, "destination")}
              onDrag={() => handleOnDrag()}
              onDragStart={() => handleOnDragStart()}
              onDragEnd={(e) => handleDragDest(e)}

            >
              {markerImage && (
                <Image
                  source={{ uri: markerImage }}
                  style={[styles.marker, markerImageStyle]}
                />
              )}
            </Marker>
          )}
          {destination && <MapViewDirections
            origin={{ latitude: defaultOrigin.latitude, longitude: defaultOrigin.longitude }}
            waypoints={[
              { latitude: defaultOrigin.latitude, longitude: defaultOrigin.longitude },
              { latitude: destination?.latitude, longitude: destination?.longitude }
            ]}
            destination={{ latitude: destination?.latitude, longitude: destination?.longitude }}
            apikey={apiKey}
            strokeWidth={strokeWidth || 4}
            strokeColor={strokeColor || "hotpink"}
            optimizeWaypoints={true}
            onStart={(params) => handleOnStart(params)}
            onReady={(result) => handleOnReady(result)}
            onError={(errorMessage) => handleOnError(errorMessage)}
            resetOnChange={false}
          />}
        </MapView>
        <TouchableOpacity style={{position: "absolute", bottom: 190,zIndex: 990, backgroundColor: '#333232', alignItems: 'center', alignSelf: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, flexDirection: 'row'}} onPress={handleListView}>
            {/* <SvgUri
            width={21}
            height={24}
            source={require('../../src/assets/listView.svg')} /> */}
            <Icon name='view-agenda-outline' type='material-community' color={colors.white} size={24} />
            <Text style={{fontSize: 12, fontWeight: '600', color:'white', marginLeft: 10}}>List View</Text>
        </TouchableOpacity>
        <FlatList
          nestedScrollEnabled
          horizontal
          style={{ position: "absolute",bottom:40,zIndex: 990,borderRadius: 30}}
          data={parkingSearchList}
          showsVerticalScrollIndicator={true}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}/>
      </View>
    </SafeAreaView>
  );
};

Maps.propTypes = {
  origin: PropTypes.object,
  originTitle: PropTypes.string,
  originDescription: PropTypes.string,
  enableDirections: PropTypes.bool,
  apiKey: PropTypes.string,
  onNavigationStart: PropTypes.func,
  onNavigationError: PropTypes.func,
  getDistance: PropTypes.func,
  getDuration: PropTypes.func,
  getDestinationAddress: PropTypes.func,
  showSearchInput: PropTypes.bool,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  markerColor: PropTypes.string,
  markerImage: PropTypes.string,
  markerImageStyle: PropTypes.object,
  mainContainerStyle: PropTypes.object,
  onLatLngChange: PropTypes.func,
  markedLocations: PropTypes.array,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
};
export default Maps
