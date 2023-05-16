import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity } from 'react-native';
import ViewReport from '../../components/viewReport';
import { colors, commonStyles } from '../../styles';
import { styles } from './styles';
import { Icon } from 'react-native-elements'
import { CustomButton } from '../../components/customButton';
import { managePaymentRequest } from '../../utils/service';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime } from '../../utils';
import moment from 'moment';

const ManagePayment = (props) => {

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    let managePayment = useSelector(state => state?.app?.managePayment)
    const dispatch = useDispatch()

    const getmanagePayment = async () => {
        const resp = await dispatch(managePaymentRequest()) 
        console.log('resp: ', resp)   
    }
    useEffect(() => {
        getmanagePayment()
    },[])

    const renderItem = ({item}) => {
        return(
            <View style={[styles.container]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={commonStyles.flex1}>
                        <Text style={[commonStyles.text_xs, commonStyles.lightBlackTextColor]}>
                            {item?.place?.name}
                        </Text>
                        <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginTop8]}>
                        {item?.id}
                        </Text>
                    </View>
                    <View style={[commonStyles.flex1, commonStyles.justifyContentCenter, {alignItems: 'flex-end'}]}>
                        <Text style={[commonStyles.text_xs, commonStyles.greenTextColor]}>
                            {`$${item?.fare}`}
                        </Text>
                        <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginTop8]}>
                            {moment(item?.created).format('YYYY-MM-DD')}
                        </Text>
                    </View>
                    <TouchableOpacity style={[commonStyles.marginLeft15]}>
                        <Icon name="download" type='antdesign' size={25} color={colors.base} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

  return (
      <SafeAreaView style={{backgroundColor: colors.COLOR_FBFBFB,
        flex: 1}}>
        <FlatList 
            nestedScrollEnabled
            data={managePayment}
            showsVerticalScrollIndicator={true}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}/>
        <View style={[commonStyles.paddingHorizontal16, commonStyles.paddingVertical16, commonStyles.whiteBackground, commonStyles.flexRow, commonStyles.justifyContentBetween]}>
            <Text style={[commonStyles.text_large, commonStyles.textAlignVerticalCenter]}>Download full report</Text>
            <CustomButton label={'Download'} isPrimaryButton onPress={() => props.navigation.navigate('booking')} style={{flex: 0.6}} />
        </View>
    </SafeAreaView>
  );
}

export default ManagePayment;
