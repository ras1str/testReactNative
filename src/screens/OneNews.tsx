import React, { useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigator';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { fetchOneNews } from '../store/slice/oneNewsSlice';

type Props = NativeStackScreenProps<StackParams, "OneNews">

const OneNews = ({ route }: Props) => {
  const auth = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const { oneNews, isLoading, error } = useAppSelector(state => state.oneNews)
  useEffect(() => {
    dispatch(fetchOneNews({ auth, id: route.params.id }))
  }, [])
  console.log(oneNews)
  return (
    <View>
      <View>
        <Text style={{ fontSize: 30 }}>{oneNews.title}</Text>
        <Image source={{ uri: oneNews.image_url }} style={{ width: 410, height: 200 }} />
        <Text>{oneNews.body}</Text>
      </View>
    </View>
  );
};

export default OneNews;