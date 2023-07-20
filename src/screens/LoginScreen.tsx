import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import InputField from '../components/InputField';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { setUser } from '../store/slice/authSlice';
import { User, userLogin } from '../api/user_api';


const LoginScreen : React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()

  const handleLogin = async () => {
  const response = await userLogin({email, password})
   dispatch(setUser({
    user: response!.data.user,
    uid: response!.uid,
    token: response!.accessToken,
    client: response!.client,
}))
      
  };
  
  

  return (
    <View>
      <InputField
        label="Email"
        value={email}
        onChangeText={(inputEmail)=>setEmail(inputEmail)}
        placeholder="Введите email"
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={(inputPassword)=>setPassword(inputPassword)}
        placeholder="Введите пароль"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>

        <Text>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;