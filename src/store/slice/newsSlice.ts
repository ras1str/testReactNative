import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api/ApiManager';
import { authState } from './authSlice';


export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (auth: authState) => {
    console.log('fetchNews...');

    api.setHeaders({
      ['access-token']: auth.token!,
      client: auth.client!,
      uid: auth.uid!,
    });

    const result = await api.get<{news: INews[]}>('/news');

    return result.data!.news;
  },
);

type INews = {
  id: number;
  title: string;
  body: string;
  short_text: string;
  image_url:string,

};

interface State {
  news: INews[];
  isLoading: boolean;
  error: string;
}

const initialState: State = {
  news: [],
  isLoading: false,
  error: '',
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addingNews(state) {
      state.isLoading = true;
    },
    addNewsSuccess(state, action) {
      state.isLoading = false;
      state.error = '';
      state.news = action.payload;
    },
    addNewsFalse(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNews.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.isLoading = false;
    });
  },
});

export const {addingNews, addNewsFalse, addNewsSuccess} = newsSlice.actions;

export default newsSlice.reducer;
