import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { utils } from '../../utils';

const PreviousBooking = (props) => {

  const [rateParkingModal, setRateParkingModal] = useState(false)
  const [sentFeedBackModal, setSentFeedBackModal] = useState(false)
  const [isRateClicked, setRateClicked] = useState(false)

  const handleRateParking = () => {
    setSentFeedBackModal(false)
  }

  const  onHandlePublishFeedback = () => {
    setRateParkingModal(false)
    setSentFeedBackModal(true)
    setRateClicked(false)
  }

  const  onHandleCloseFeedback = () => {
    setSentFeedBackModal(false)
  }

  return (
    <>
      <View style={{
          backgroundColor: 'white',
          borderRadius: 8,
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 10,
          marginHorizontal: 16,
          width: 305,
          elevation: 5}}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.8}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: '#151313'}}>
                    NCP Car Park Manchester
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Image source={require('../../assets/marker.png')} style={{marginRight: 8, width: 24, height: 24}} />
                    <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A'}}>
                        Toronto, Canada
                    </Text>
                </View>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
            <View>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', textAlign: 'center', marginBottom: 5}}>
                    In time
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000000', textAlign: 'center'}}>
                    10:00AM
                </Text>
            </View>
            <View>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', textAlign: 'center', marginBottom: 5}}>
                    out time 
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000000', textAlign: 'center'}}>
                    5:00 PM
                </Text>
            </View>
            <View>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', textAlign: 'center', marginBottom: 5}}>
                    Total Time
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000000', textAlign: 'center'}}>
                  5:00 PM
                </Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A', marginRight: 8}}>
                  Total Paid
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000000'}}>
                  $8.00
                </Text>
            </View>
            <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 37, paddingVertical: 6,  width: 113}} onPress={() => setRateParkingModal(true)}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/heart.png')} />
                <Text style={{fontSize: 12, fontWeight: '500', color: '#1E8FFF', marginLeft: 5}}>
                  Rate parking
                </Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={rateParkingModal}
        statusBarTranslucent={true}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => setRateParkingModal(false)} >
          <TouchableOpacity style={{flex: 1, backgroundColor: '#00000080'}} onPress={() => setRateParkingModal(false)}>
            <View style={{backgroundColor: 'white', height: isRateClicked ? utils.getWindowHeight() * 0.80 : utils.getWindowHeight() * 0.42, position: 'absolute', bottom: 0, right: 0, left: 0, opacity:1, paddingHorizontal: 28, paddingVertical: 32}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#151313',}}>
                NCP Car Park Manchester
              </Text>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <Image source={require('../../assets/marker.png')} style={{marginRight: 8, width: 24, height: 24}} />
                <Text style={{fontSize: 12, fontWeight: '400', color: '#6A6A6A'}}>
                    Toronto, Canada
                </Text>
              </View>
              <Text style={{fontSize: 22, fontWeight: '500', color: '#3F3F3F', marginTop: 16}}>
                How did we do?
              </Text>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#3F3F3F', marginTop: 16}}>
                How did we do?
              </Text>
              <View style={{flexDirection: 'row', marginTop: 16, justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => setRateClicked(true) }>
                  <Image source={require('../../assets/poorRate.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRateClicked(true) }>
                  <Image source={require('../../assets/badRate.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRateClicked(true) }>
                  <Image source={require('../../assets/goodRate.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRateClicked(falstruee) }>
                  <Image source={require('../../assets/vGoodRate.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRateClicked(true) }>
                  <Image source={require('../../assets/excellentRate.png')} />
                </TouchableOpacity>
              </View>
              {isRateClicked && <>
                <Text style={{marginTop: 16, marginBottom: 24, fontSize: 22, fontWeight: '500'}}>
                  Okay
                </Text>
                <TextInput
                  style={{borderWidth: 1,borderRadius: 10, borderColor: 'grey', padding: 14}}
                  multiline
                  numberOfLines={4}
                  textAlignVertical='top'
                  placeholder='What could Have been Better?' />
                <TouchableOpacity style={{backgroundColor: '#1E8FFF', borderRadius: 37, paddingVertical: 13, marginTop: 24}} onPress={onHandlePublishFeedback}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: '700', color: 'white', marginLeft: 5}}>
                        Publish Feedback
                    </Text>
                  </View>
                </TouchableOpacity>
              </>}
            </View>
          </TouchableOpacity>
      </Modal>
      <Modal
        visible={sentFeedBackModal}
        statusBarTranslucent={true}
        transparent={true}
        animationType={'fade'}
        onRequestClose={handleRateParking}>
          <TouchableOpacity style={{flex: 1, backgroundColor: '#00000080'}} onPress={handleRateParking}>
            <View style={{backgroundColor: 'white', height: utils.getWindowHeight() * 0.55, position: 'absolute', bottom: 0, right: 0, left: 0, opacity:1, paddingHorizontal: 28, paddingVertical: 32}}>
              <View style={{width: 180, height: 140, backgroundColor: 'grey', alignSelf: 'center', marginBottom: 32}} />
              <Text style={{fontSize: 22, fontWeight: '500', color: '#3F3F3F',}}>
                Thanks for your Feeback
              </Text>
              <Text style={{fontSize: 11, fontWeight: '500', color: '#3F3F3F', marginTop: 16}}>
              we’re really sorry you had a bad experience.
Your feedback will help us improve our service
              </Text>
              <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 37, paddingVertical: 13, marginTop: 24, borderWidth: 1, borderColor: '#1E8FFF'}} onPress={onHandleCloseFeedback}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '700', color: '#1E8FFF', marginLeft: 5}}>
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
      </Modal>
    </>
  );
}

export default PreviousBooking;
