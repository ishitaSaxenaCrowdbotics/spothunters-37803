import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, commonStyles } from '../../styles';
import { styles } from './styles';

const ViewReport = props => {

  return (
    <>
    <View style={[styles.container, {width: props?.fullView ? null : 305}]}>
    <View style={{flexDirection: 'row'}}>
        <View style={commonStyles.flex1}>
            <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                01 Jan, 23
            </Text>
            <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginTop8]}>
                Booking ID: 1234567789
            </Text>
        </View>
        <View style={[commonStyles.flex1, commonStyles.justifyContentCenter, {alignItems: 'flex-end'}]}>
            <Text style={[commonStyles.text_big_thick, commonStyles.greenTextColor]}>
                $ 10 Paid
            </Text>
        </View>
    </View>
    <View style={[commonStyles.flexRow, commonStyles. justifyContentBetween, commonStyles.marginTop16]}>
        <View>
            <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                In time
            </Text>
            <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                10:00AM
            </Text>
        </View>
        <View>
            <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                out time 
            </Text>
            <Text style={[commonStyles.text_xs_bold,commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                5:00 PM
            </Text>
        </View>
        <View>
            <Text style={[commonStyles.text_xs,commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                Total Time
            </Text>
            <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles.centerTextAlign]}>
                5:00 PM
            </Text>
        </View>
    </View>
    </View>
</>
  );
}

export default ViewReport;
