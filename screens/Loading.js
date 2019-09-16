import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Loading = ({size}) =>{
  return(
  <View style={styles.activityStyle}>
    <ActivityIndicator size={size || 'large'} />
  </View>
  );
};

const styles = {
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Loading;
