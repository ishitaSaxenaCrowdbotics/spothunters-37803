import { getDistance } from 'geolib';
import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import { useDispatch } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
import { CustomButton } from '../../components/customButton';
import { colors, commonStyles } from '../../styles';
import { convertToMeterToMiles } from '../../utils';
import { parkingSearchByIDRequest } from '../../utils/service';
import { styles } from './styles';

export const MapParkingSpotItem = (props) => {

  const dispatch = useDispatch()

  const dist = getDistance(
    {longitude: props?.defaultOrigin?.longitude, latitude: props?.defaultOrigin?.latitude}, 
    {longitude: props?.item?.long, latitude: props?.item?.lat})

  const onHandleParkingDetail = async () => {
    const resp = await dispatch(parkingSearchByIDRequest(props?.item?.id))
    console.log('resp: ', resp)
    props.navigation.navigate('ParkingDetails', {id: props?.item?.id, origin: props?.defaultOrigin})
  }

  return (
    <>
        <View style={styles.container}>
              <Image source={{uri: props?.item?.places_image[0]?.image}} style={styles.subContainer} />
            <View style={commonStyles.flex1}>
                <View>
                    <Text style={[commonStyles.text_small_thick, commonStyles.lightBlackTextColor]}>
                      {props?.item?.name}
                    </Text>
                    <View style={[styles.textContainer, commonStyles.alignItemsCenter]}>
                      <Icon name="map-pin" type='font-awesome' size={25} color={colors.black} />
                      <Text style={[commonStyles.text_xs, commonStyles.marginLeft8, commonStyles.darkGreyTextColor, commonStyles.marginRight8]}>
                        {convertToMeterToMiles(dist).toFixed(1)}mi
                      </Text>
                      <Icon name="location-sharp" type='ionicon' size={25} color={colors.black} />
                      <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.flexShrink1]}>
                        {props?.item?.address}
                      </Text>
                    </View>
                </View>
              <View style={[styles.textContainer, commonStyles.justifyContentBetween]}>
                  <TouchableOpacity >
                      <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor]}>
                        $ {props?.item?.price.toFixed(2)}
                      </Text>
                  </TouchableOpacity>
                  <CustomButton textStyle={commonStyles.text_xs_thick} style={commonStyles.padding8} label={'BOOK PARKING'} isPrimaryButton onPress={onHandleParkingDetail} />
              </View>
            </View>
        </View>
    </>
  );
}

export const ListParkingSpotItem = (props) => {

  const dispatch = useDispatch()

  const renderItem = ({item}) => {
    return(
        <View style={styles.itemContainer}>
            <Text style={[commonStyles.text_xxs_thick, styles.marginRight2]}>{item.name}</Text>
            <Icon name="send" type='feather' size={15} color={colors.black} />
        </View>
    )
  }

  const renderImages = ({item}) => {
    return(
           <Image source={{uri: item?.image}} style={{width: Dimensions.get("window").width*0.80, marginRight: 5, borderRadius: 8}} />
    )
  }

  const onHandleParkingDetail = async() => {
    const resp = await dispatch(parkingSearchByIDRequest(props?.item?.id))
    console.log('resp: ', resp)
    props.navigation.navigate('ParkingDetails', {id: props?.item?.id, origin: props?.defaultOrigin})
  }

  const dist = getDistance(
    {longitude: props?.defaultOrigin?.longitude, latitude: props?.defaultOrigin?.latitude}, 
    {longitude: props?.item?.long, latitude: props?.item?.lat})

  return (
    <>
        <View style={styles.listItemContainer}>
            <Image source={{uri: props?.item?.places_image[0]?.image}} style={styles.listSubContainer}/>
            <View style={commonStyles.flexRow}>
              <View style={commonStyles.flex8}>
                  <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                      {props?.item?.name}
                  </Text>
                  <View style={[commonStyles.flexRow, commonStyles.marginTop8, commonStyles.alignItemsCenter]}>
                      <Icon name="location-sharp" type='ionicon' size={25} color={colors.black} />
                      <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                          {props?.item?.address}
                      </Text>
                  </View>
              </View>
              <View style={[commonStyles.flex2, commonStyles.justifyContentBetween]}>
                <View style={[commonStyles.flexRow, commonStyles.alignItemsCenter]}>
                    <Icon name="map-pin" type='font-awesome' size={25} color={colors.black} containerStyle={commonStyles.marginRight8} />
                    <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                        {convertToMeterToMiles(dist).toFixed(1)}mi
                    </Text>
                </View>
                <View style={styles.hourlyContainer}>
                      <Text style={[commonStyles.text_xxs, commonStyles.blackTextColor]}>{props?.item?.availability}</Text>
                    </View>
              </View>
            </View>
            <Text style={[commonStyles.text_small_thick, commonStyles.marginVertical12]}>Amenities</Text>
              <FlatList
              numColumns={4}
              nestedScrollEnabled
              data={props?.item?.place_amenity}
              showsVerticalScrollIndicator={true}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}/>
            <View style={commonStyles.divider} />
            <View style={[commonStyles.flexRow, commonStyles. justifyContentBetween, commonStyles.alignItemsCenter]}>
                <View style={[commonStyles.alignItemsCenter, commonStyles.flex2]}>
                    <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor]}>
                      $ {props?.item?.price.toFixed(2)}
                    </Text>
                </View>
                <CustomButton style={[commonStyles.flex8, commonStyles.paddingVertical8]} textStyle={commonStyles.text_xs_thick} label={'BOOK PARKING'} isPrimaryButton onPress={onHandleParkingDetail} />
            </View>
        </View>
    </>
  );
}
