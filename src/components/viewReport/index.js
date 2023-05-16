import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '../../styles';
import { styles } from './styles';
import { calcTotalTime, formatTime } from '../../utils';

const ViewReport = props => {

  return (
    <>
    <View style={[styles.container, {width: props?.fullView ? null : 305}]}>
    <View style={{flexDirection: 'row'}}>
        <View style={commonStyles.flex1}>
            <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                {props?.item?.start.split('T')[0]}
            </Text>
            <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginTop8]}>
                {`Booking ID: ${props?.item?.id} `}
            </Text>
        </View>
        <View style={[commonStyles.flex1, commonStyles.justifyContentCenter, {alignItems: 'flex-end'}]}>
            <Text style={[commonStyles.text_big_thick, props?.item?.payment ? commonStyles.greenTextColor : commonStyles.redTextColor]}>
                {`$${props?.item?.fare} ${props?.item?.payment ? 'Paid' : 'Pending'}`}
            </Text>
        </View>
    </View>
    <View style={[commonStyles.flexRow, commonStyles. justifyContentBetween, commonStyles.marginTop16]}>
        <View>
            <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                In time
            </Text>
            <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                {formatTime(props?.item?.start)}
            </Text>
        </View>
        <View>
            <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                out time 
            </Text>
            <Text style={[commonStyles.text_xs_bold,commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                {formatTime(props?.item?.end)}
            </Text>
        </View>
        <View>
            <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                Total Time
            </Text>
            <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                {calcTotalTime(props?.item?.start, props?.item?.end)}
            </Text>
        </View>
    </View>
    </View>
</>
  );
}

export default ViewReport;
