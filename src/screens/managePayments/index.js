import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, Image, Modal, PermissionsAndroid, Alert } from 'react-native';
import ViewReport from '../../components/viewReport';
import { colors, commonStyles } from '../../styles';
import { styles } from './styles';
import { Icon } from 'react-native-elements'
import { CustomButton } from '../../components/customButton';
import { downloadReportRequest, get_auth, managePaymentRequest } from '../../utils/service';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FloatingTextInput from '../../components/floatingTextInput';
import DatePicker from 'react-native-date-picker';
import RNFetchBlob from 'rn-fetch-blob'

const ManagePayment = (props) => {

    let managePayment = useSelector(state => state?.app?.managePayment)
    let rqData
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [isStartDateOpen, setIsStartDateOpen] = useState(false)
    const [isEndDateOpen, setIsEndDateOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [isModal, setIsModal] = useState(false)

    const getmanagePayment = async () => {
        const resp = await dispatch(managePaymentRequest()) 
        console.log('resp: ', resp)   
    }
    useEffect(() => {
        getmanagePayment()
    },[])

    const onSearch = async (value, isFilter) => { 
        !isFilter && setSearch(value)
        if(isFilter){
          setIsModal(false)
          rqData = {
            start_date: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(),
            end_date: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate(),
          }
        } else {
          rqData = {
            search: value
          }
        }
        const resp1 = await dispatch(managePaymentRequest(rqData))
        if (resp1?.count > 0){
            console.log('prev resp: ', resp1)
        } else {
        }
    }
    
    const actualDownload = async (pk, id) => {
      const { dirs } = RNFetchBlob.fs;
            let user = await get_auth();
      RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: `test.pdf`,
          path: `${dirs.DownloadDir}/test.pdf`,
          },
      })
        .fetch('GET', `${API_URL}/user/api/v1/manage-payment/generate-pdf-report/?search=${rqData?.search ? rqData?.search : ''}&start_date=${rqData?.start_date ? rqData?.start_date : ''}&end_date=${rqData?.end_date ? rqData?.end_date : ''}&pk=${id || ''}`, {
           'Content-type': 'application/json',
            accept: 'application/json',
            Authorization: `Token ${user?.token}`
        })
        .then((res) => {
        console.log('The file saved to ', res.path());
        })
        .catch((e) => {
        console.log(e)
        });
    }
    
    const downloadFile = async (pk, id) => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            actualDownload(pk, id);
        } else {
            Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
        } catch (err) {
        console.warn(err);
        } 
    }

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
                    <TouchableOpacity style={[commonStyles.marginLeft15]} onPress={() => downloadFile(true, item?.id)}>
                        <Icon name="download" type='antdesign' size={25} color={colors.base} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

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
        <FlatList 
            nestedScrollEnabled
            data={managePayment}
            showsVerticalScrollIndicator={true}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}/>
        <View style={[commonStyles.paddingHorizontal16, commonStyles.paddingVertical16, commonStyles.whiteBackground, commonStyles.flexRow, commonStyles.justifyContentBetween]}>
            <Text style={[commonStyles.text_large, commonStyles.textAlignVerticalCenter]}>Download full report</Text>
            <CustomButton label={'Download'} isPrimaryButton onPress={downloadFile} style={{flex: 0.6}} />
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

export default ManagePayment;
