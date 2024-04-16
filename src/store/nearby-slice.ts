import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nearbyOffersState } from '../types/nearby';
import { CardListType } from '../types/cardInfo';
import { AxiosInstance } from 'axios';
import { ApiRoute, BACKEND_URL } from '../const/api-const';

const initialState: nearbyOffersState = {
  nearbyOffers: [],
};

export const getNearbyOffers = createAsyncThunk<
  CardListType,
  string,
  { extra: AxiosInstance }
>('@@nearbyOffers- getNearbyOffers', async (hotelId, { extra: api }) => {
  const { data: nearbyOffers } = await api.get<CardListType>(
    `${BACKEND_URL}/${ApiRoute.Hotels}/${hotelId}/nearby`
  );
  return nearbyOffers;
});

export const nearbySlice = createSlice({
  name: '@@nearbyOffers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getNearbyOffers.fulfilled,
      (state, action: PayloadAction<CardListType>) => {
        state.nearbyOffers = action.payload;
      }
    );
  },
});

const { actions, reducer } = nearbySlice;
export const nearbyReducer = reducer;
