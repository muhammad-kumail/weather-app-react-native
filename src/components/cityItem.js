import {Text,Image,TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Theme/styles';

export default function CityItem({image,day,temperature,onPress}) {
  return (
    <TouchableOpacity style={styles.cityItem} activeOpacity={0.4} onPress={()=>onPress?onPress():null}>
      <Image
        source={image}
        style={styles.cityItemImage}
      />
      <Text style={styles.cityItemText}>{day}</Text>
      <Text style={styles.cityTempText}>{temperature}&#176;</Text>
    </TouchableOpacity>
  );
}
