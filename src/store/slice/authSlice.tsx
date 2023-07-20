import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
    token: null,
    uid: null,
    client: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       setUser(state, action){
        state.user = action.payload.user
        state.token = action.payload.token
        state.uid = action.payload.uid
        state.client = action.payload.client
       },
       removeUser(state){
        state.user = null
        state.token = null
        state.uid =null
        state.client = null


       }
    },
});

export const { setUser, removeUser} = userSlice.actions

export default userSlice.reducer