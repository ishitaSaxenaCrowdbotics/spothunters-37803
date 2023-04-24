import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import styles from './styles';
import ViewReport from '../../components/viewReport';
import { colors } from '../../styles';

const ViewReports = (props) => {

    const data = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]

    const renderItem = () => {
        return(<ViewReport navigation={props.navigation} fullView/>)
    }
  return (
      <SafeAreaView style={{backgroundColor: colors.COLOR_FBFBFB,
        flex: 1}}>
        <FlatList 
            nestedScrollEnabled
            data={data}
            showsVerticalScrollIndicator={true}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}/>
    </SafeAreaView>
  );
}

export default ViewReports;
