import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Modal, TouchableOpacity, Text } from "react-native";
import { commonStyles } from "../../styles";
import { getQr } from "../../utils/service";

const QrCode = (props) => {
  const [qr, setQr] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getQr({ text: props?.data })
      .then(res => res.json())
      .then(res => {
        setIsLoader(false);
        console.log('res')
        setQr(res.qrcode);
      })
      .catch(e => {
        setIsLoader(false);
        console.log(e);
      });
  }, [])

  return (
    <Modal
        visible={props.isModal}
        statusBarTranslucent={true}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => props.setModal(false)}>
        <View style={{
            flex:1, 
            backgroundColor: '#000000CC'
            }}>
            <TouchableOpacity activeOpacity={1}  onPress={() => props.setModal(false)} style={{flex:1, justifyContent: 'center',malignItems: 'center'}}>
            <View style={{padding: 32, backgroundColor: 'white', justifyContent: 'center', position: 'absolute', right: 30, left: 30}}>
                <Text style={[commonStyles.text_xl_bold, commonStyles.centerTextAlign, commonStyles.marginBottom24]}>Scan QR Code</Text>
                { isLoader && <ActivityIndicator /> }
                <View style={{alignSelf: "center"}}>
                    {qr && <Image source={{ uri: `data:image/png;base64,${qr}` }} style={{height: 200, width: 200}} />}
                </View>
            </View>
            </TouchableOpacity>
        </View>
    </Modal>
  );
};
export default QrCode;