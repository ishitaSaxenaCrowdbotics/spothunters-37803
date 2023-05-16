import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, ActivityIndicator, TouchableOpacity, Modal, Switch } from 'react-native';
import styles from './styles';
import ViewReport from '../../components/viewReport';
import { colors, commonStyles } from '../../styles';
import { Text } from 'react-native';
import { reportRequest } from '../../utils/service';
import { useDispatch, useSelector } from 'react-redux';
import FloatingTextInput from '../../components/floatingTextInput';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import { CustomButton } from '../../components/customButton';

const ViewReports = (props) => {

    const dispatch = useDispatch()
    let reportList = useSelector(state => state?.app?.reportList)
    const [search, setSearch] = useState()
    const [isModal, setIsModal] = useState(false)
    const [isLastMonth, setLastMonth] = useState(false)
    const [isLastWeek, setLastWeek] = useState(false)
    const [isStartDateOpen, setIsStartDateOpen] = useState(false)
    const [isEndDateOpen, setIsEndDateOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [loading, setLoading] = useState(true)

    const getReports = async () => {
      setLoading(true)
      const resp1 = await dispatch(reportRequest())
      if (resp1?.count > 0){
        console.log('prev resp: ', resp1)
        setLoading(false)
    } else {
        setLoading(false)
    }
      console.log('resp report: ', resp1)
    }

    const onSearch = async (value, isFilter) => { 
      !isFilter && setSearch(value)
      setLoading(true)
      let rqData
      if(isFilter){
        setIsModal(false)
        rqData = {
          start_date: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(),
          end_date: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate(),
          last_week: isLastWeek,
          last_month: isLastMonth
        }
      } else {
        rqData = {
          search: value
        }
      }
      const resp1 = await dispatch(reportRequest(rqData))
      if (resp1?.count > 0){
          console.log('prev resp: ', resp1)
          setLoading(false)
      } else {
          setLoading(false)
      }
    }

    useEffect(() => {
      getReports()
    },[])

    const renderItem = ({item}) => {
        return(<ViewReport navigation={props.navigation} fullView item={item}/>)
    }

    const total = (reportList?.results?.reduce((total,currentItem) =>  total = total + parseFloat(currentItem.fare) , 0 ))?.toFixed(2)

  return (
      <SafeAreaView style={{backgroundColor: colors.COLOR_FBFBFB,
        flex: 1}}>
          <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.fullWidth, commonStyles.paddingHorizontal16]}>
                <FloatingTextInput
                    style={{flex: 1, marginTop: 0, marginRight: 10}}
                    label='Search'
                    placeholder='Search'
                    value={search}
                    onChangeText={(value) => onSearch(value)} />
                <TouchableOpacity style={commonStyles.justifyContentCenter} onPress={() => setIsModal(true)}>
                  <Icon name='filter' type='ionicon' />
                </TouchableOpacity>
            </View>
          {loading ? <ActivityIndicator style={{marginTop: 50}} size="large" color={colors.base} /> : 
            <FlatList 
                nestedScrollEnabled
                data={reportList?.results}
                showsVerticalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}/>
          }
        <View style={[commonStyles.paddingHorizontal16, commonStyles.paddingVertical16, commonStyles.whiteBackground, commonStyles.flexRow, commonStyles.justifyContentBetween]}>
          <Text style={[commonStyles.text_large, commonStyles.textAlignVerticalCenter]}>Total price for the parking place</Text>
          <Text style={[commonStyles.text_xxl, commonStyles.textAlignVerticalCenter]}>{`$ ${total}`}</Text>
        </View>
        <Modal
            transparent
            visible={isModal}
            transparent={true}
            statusBarTranslucent={true}
            onRequestClose={() => setIsModal(false)}>
            <View style={styles.modalContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.centerContainer} onPress={() => setIsModal(false)}>
                    <View style={[styles.subContainer]}>
                        <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign]}>
                          Set Filters
                        </Text>
                        <View style={[commonStyles.flexRow, commonStyles.justifyContentCenter]}>
                          <TouchableOpacity onPress={() => setIsStartDateOpen(true)} style={{marginRight: 10}} >
                            <FloatingTextInput
                                  label='Start Time*'
                                  editable={false}
                                  value={startDate.toDateString()}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setIsEndDateOpen(true)} >
                            <FloatingTextInput
                                  label='End Time*'
                                  editable={false}
                                  value={endDate.toDateString()}/>
                          </TouchableOpacity>
                          <DatePicker 
                            modal
                            is24hourSource="locale"
                            locale="en"
                            open={isStartDateOpen}
                            mode={'date'}
                            date={startDate}
                            onConfirm={(date) => {
                              setStartDate(date)
                              setIsStartDateOpen(false)
                            }}
                            onCancel={() => {
                              setIsStartDateOpen(false)
                            }} />
                          
                          <DatePicker
                            modal
                            is24hourSource="locale"
                            locale="en"
                            open={isEndDateOpen}
                            mode={'date'}
                            date={endDate}
                            onConfirm={(date) => {
                              setEndDate(date)
                              setIsEndDateOpen(false)
                            }}
                            onCancel={() => {
                              setIsEndDateOpen(false)
                            }} />
                        </View>
                        <View style={[commonStyles.flexRow, commonStyles.justifyContentCenter]}>
                          <View style={[commonStyles.flexRow, commonStyles.marginTop15, commonStyles.marginRight8]}>
                              <Text style={[commonStyles.text_large_thick]}>Last Week</Text>
                              <Switch
                                  thumbColor={colors.white}
                                  onValueChange={(value) => setLastWeek(value)}
                                  value={isLastWeek}
                              />
                          </View>
                          <View style={[commonStyles.flexRow, commonStyles.marginTop15]}>
                              <Text style={[commonStyles.text_large_thick]}>Last Month</Text>
                              <Switch
                                  thumbColor={colors.white}
                                  onValueChange={(value) => setLastMonth(value)}
                                  value={isLastMonth}
                              />
                          </View>
                        </View>
                        <View style={[commonStyles.flexRow, commonStyles.fullWidth, commonStyles.marginTop15]}>
                          <CustomButton label={'Cancel'} onPress={() => setIsModal(false)} style={[commonStyles.marginRight8, commonStyles.flex1]} />
                          <CustomButton label={'Apply'} isPrimaryButton onPress={() => onSearch('', true)} style={commonStyles.flex1} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    </SafeAreaView>
  );
}

export default ViewReports;
