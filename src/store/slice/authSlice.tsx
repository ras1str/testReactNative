import {createSlice} from '@reduxjs/toolkit';

export interface authState { 
  user: any,
  token: string,
  uid: string, 
  client: string
}

const initialState: authState = {
  user: null,
  token: '',
  uid: '',
  client: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.client = action.payload.client;
    },
    removeUser(state) {
      state.user = null;
      state.token = '';
      state.uid = '';
      state.client = '';
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
