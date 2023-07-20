import React, {useEffect} from 'react';
import {View, Text, Image, useWindowDimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParams} from '../navigation/Navigator';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {fetchOneNews} from '../store/slice/oneNewsSlice';
import RenderHtml from 'react-native-render-html';

type Props = NativeStackScreenProps<StackParams, 'OneNews'>;

const OneNews = ({route}: Props) => {
  const auth = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {oneNews} = useAppSelector(state => state.oneNews);
  const { width } = useWindowDimensions()

  useEffect(() => {
    dispatch(fetchOneNews({auth, id: route.params.id}));
  }, []);
  
  const source = {
    html: `${oneNews.body}`
  };

  return (
    <View>
      <View>
        <Text style={{fontSize: 30}}>{oneNews.title}</Text>
        <Image
          source={{uri: oneNews.image_url}}
          style={{width: 410, height: 200}}
        />
        <RenderHtml contentWidth={width} source={source}/>
      </View>
    </View>
  );
};

export default OneNews;
