import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackParams } from '../navigation/Navigator';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { removeUser } from '../store/slice/authSlice';

type Props = NativeStackScreenProps<StackParams, "Profile">

const ProfileScreen: React.FC<Props> = () => {

  const data = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const handleLogout =() => {
    dispatch(removeUser(data))
  }


  return (
    <View>
      <View style={{ flexDirection: 'row' , marginBottom: 20 , justifyContent:'space-between' }}>
        <Text style={{ fontSize: 27, marginLeft:10}}>{data.user.username}</Text>
       <TouchableOpacity onPress={handleLogout}>
          <Text style={{fontSize: 27, color:'red', marginRight:10}}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: data.user.avatar_cropped_big_url }}
        style={{ width: 410, height: 400 }}
      />
      <Text style={{ fontSize: 25, marginTop: 20 }}>{data.user.user_like_status.description}</Text>

    </View>
  );
};

export default ProfileScreen;