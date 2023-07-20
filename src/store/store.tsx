import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slice/authSlice';
import newsReducer from './slice/newsSlice';
import oneNewsReducer from './slice/oneNewsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
    oneNews: oneNewsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
