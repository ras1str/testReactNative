import api from './ApiManager';
import {Alert} from 'react-native';

interface Login {
  email: string;
  password: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
}

export const userLogin = async ({email, password}: Login) => {
    const result = await api.post<{user: User}>('/auth/sign_in', {
      email,
      password,
    });
    if (result.status === 200) {
      if (result.headers) {
        const accessToken = result.headers['access-token'];
        const client = result.headers.client;
        const uid = result.headers.uid;
        const data = result.data!;

        return {data, accessToken, client, uid};
      }
    }

    if (result.status === 401) {
      Alert.alert('erorr authtorization', 'wrong email or password');
    }
};
