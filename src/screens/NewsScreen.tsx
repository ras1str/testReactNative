import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewsStackParams } from '../navigation/Navigator';
import NewsCard from '../components/NewsCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { addNewsSuccess, addingNews, fetchNews } from '../store/slice/newsSlice';



type Props = NativeStackScreenProps<NewsStackParams, "News">

const NewsScreen: React.FC<Props> = ({ navigation }) => {
  const auth = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const { news, isLoading, error } = useAppSelector(state => state.news)
  const refreshNews = () => {
    
    dispatch(addingNews())
    dispatch(fetchNews(auth))


  }

  useEffect(() => {
    dispatch(addingNews())
    dispatch(fetchNews(auth))
   }, [])

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size='large' />
        <Text
          style={{
            marginTop: 15,
            fontSize: 20
          }}>
          Загрузка
        </Text>
      </View>
    )
  }

  return ( 

    <View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshNews}/>}
        data={news}
        //@ts-ignore
        renderItem={({ item }) => <NewsCard
          id={item.id}
          title={item.title}
          imageUrl={item.image_url}
          description={item.short_text}
          onPress={(item) => {
            navigation.navigate('OneNews', { id: item.id, title: item.title  })
          }} />}
      />
    </View>




  );
};

export default NewsScreen;