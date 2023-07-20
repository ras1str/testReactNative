import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

interface Props {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  onPress: (item: {id: number; title: string}) => void;
}

const textShort = (text: string) => {
  if (text.length > 100) {
    text = text.substring(0, 100);
    return (text += '...');
  }
  return text;
};

const NewsCard: React.FC<Props> = ({
  id,
  title,
  imageUrl,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress({id, title})}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBlockColor: 'black',
          flexDirection: 'row',
          marginBottom: 5,
        }}>
        <Image
          source={{uri: imageUrl}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 0,
            marginRight: 12,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 15}}>{textShort(title)}</Text>
          <Text
            style={{
              fontSize: 10,
              marginTop: 5,
              color: '#000000',
              opacity: 0.3,
            }}>
            {textShort(description)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
