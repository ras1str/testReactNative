import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api/ApiManager';
import { authState } from './authSlice';

interface IParams {
  auth: authState;
  id: number;
}

export const fetchOneNews = createAsyncThunk(
  'news/fetchOneNews',
  async ({auth, id}: IParams) => {

    api.setHeaders({
      ['access-token']: auth.token!,
      client: auth.client!,
      uid: auth.uid!,
    });

    const result = await api.get<{news: INews}>(`/news/${id}`);

    return result.data!.news;
  },
);

export type INews = {
  id: number;
  title: string;
  body: string;
  description: string;
  image_url: string;
};

interface State {
  oneNews: INews;
  isLoading: boolean;
  error: string;
}

const initialState: State = {
  oneNews: {
    id: 0,
    title: '',
    body: '',
    description: '',
    image_url: '',
  },
  isLoading: false,
  error: '',
};

export const oneNewsSlice = createSlice({
  name: 'oneNews',
  initialState,
  reducers: {
    addingOneNews(state) {
      state.isLoading = true;
    },
    addNewsOneFalse(state, action) {
      state.isLoading = false;
      state.error = '';
      state.oneNews = action.payload;
    },
    addNewsOneSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchOneNews.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchOneNews.fulfilled, (state, action) => {
      state.oneNews = action.payload;
      state.isLoading = false;
    });
  },
});

export const {addingOneNews, addNewsOneFalse, addNewsOneSuccess} =
  oneNewsSlice.actions;

export default oneNewsSlice.reducer;
