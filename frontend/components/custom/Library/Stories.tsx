import dummy from '@/assets/dummy';
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
interface StoryCover {
    id:number,
    title:string,
    image:{
        src:string,
        alt:string
    }

}
export default function Stories(){
    const renderItem = (item:StoryCover) => (
        <View>
          <Image
            source={{ uri: item.image.src }}
            accessibilityLabel={item.image.alt}
          />
          <Text>{item.title}</Text>
        </View>
      );
   
}