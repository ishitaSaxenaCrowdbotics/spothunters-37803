import { getDistance } from 'geolib';
import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
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
    props.navigation.navigate('Parking Details', {id: props?.item?.id, origin: props?.defaultOrigin})
  }

  const onItemPress = () => {
    props?.selectLocation({
      latitude: parseFloat(props?.item?.lat),
      longitude: parseFloat(props?.item?.long)
    })
  }

  return (
    <>
        <TouchableOpacity style={[styles.container, {height: 120}]} onPress={onItemPress}>
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
                      <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.flexShrink1]} ellipsizeMode='tail' numberOfLines={1}>
                        {props?.item?.address}
                      </Text>
                    </View>
                </View>
              <View style={[styles.textContainer, commonStyles.justifyContentBetween]}>
                  <TouchableOpacity >
                      <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor]}>
                        {`$ ${props?.item?.price.toFixed(2)} ${props?.item?.availability === 'Hourly' ? '/hr' : ''} `}
                      </Text>
                  </TouchableOpacity>
                  <CustomButton textStyle={commonStyles.text_xs_thick} style={commonStyles.padding8} label={'Book Parking'} isPrimaryButton onPress={onHandleParkingDetail} />
              </View>
            </View>
        </TouchableOpacity>
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

  const onHandleParkingDetail = async() => {
    const resp = await dispatch(parkingSearchByIDRequest(props?.item?.id))
    console.log('resp: ', resp)
    props.navigation.navigate('Parking Details', {id: props?.item?.id, origin: props?.defaultOrigin})
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
                      {`$ ${props?.item?.price.toFixed(2)}${props?.item?.availability === 'Hourly' ? '/hr' : ''} `}
                    </Text>
                </View>
                <CustomButton style={[commonStyles.flex8, commonStyles.paddingVertical8]} textStyle={commonStyles.text_xs_thick} label={'Book Parking'} isPrimaryButton onPress={onHandleParkingDetail} />
            </View>
        </View>
    </>
  );
}
