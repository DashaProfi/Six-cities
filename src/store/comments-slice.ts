import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiRoute, BACKEND_URL } from '../const/api-const';
import {
  ReviewsListType,
  CommentsState,
  OneComment,
  SendStatus,
  ReviewType,
} from '../types/reviews';
import { AxiosInstance } from 'axios';
import { AppState } from '../types/store';
import { error } from 'console';

export const getAllComments = createAsyncThunk<
  ReviewsListType,
  string,
  { extra: AxiosInstance }
>('@@comments-getAllComments', async (hotelId, { extra: api }) => {
  const { data: comments } = await api.get<ReviewsListType>(
    `${BACKEND_URL}/${ApiRoute.Comments}/${hotelId}`
  );
  return comments;
});

export const postComment = createAsyncThunk<
  any,
  OneComment,
  { extra: AxiosInstance; rejectValue: string }
>(
  '@@comments-postComments',
  async (oneComment, { extra: api, getState, rejectWithValue }) => {
    const { offers } = getState() as AppState;
    try {
      const response = await api.post<OneComment>(
        `${BACKEND_URL}/${ApiRoute.Comments}/${offers.oneOffer?.id}`,
        oneComment
      );
      const comment = response.data;
      return comment;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

const initialState: CommentsState = {
  comments: [],
  errorMessage: '',
  sendStatus: SendStatus.Unknown,
};

export const commentsSlice = createSlice({
  name: '@@comments-getAllComments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllComments.fulfilled,
        (state, action: PayloadAction<ReviewType[]>) => {
          state.comments = action.payload;
        }
      )
      .addCase(
        postComment.fulfilled,
        (state, action: PayloadAction<ReviewType>) => {
          state.comments.push(action.payload);
          state.sendStatus = SendStatus.Fulfilled;
        }
      )
      .addCase(postComment.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.sendStatus = SendStatus.Rejected;
      })
      .addCase(postComment.pending, (state) => {
        state.sendStatus = SendStatus.Pending;
      });
  },
});

const { actions, reducer } = commentsSlice;
export const commentsReducer = reducer;
