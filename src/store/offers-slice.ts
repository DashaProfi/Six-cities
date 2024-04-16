import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, DEFAULT_LOCATION, SORT_TYPES } from '../const/const';
import { ApiRoute, AuthorizationStatus } from '../const/api-const';
import {
  OffersState,
  CardListType,
  CardOneType,
  OfferId,
} from '../types/cardInfo';

import axios, { AxiosInstance } from 'axios';
import { BACKEND_URL } from '../const/api-const';
import { LoadingStatus } from '../const/const';
import { generatePath } from 'react-router-dom';

const initialState: OffersState = {
  city: {
    name: DEFAULT_CITY,
    active: true,
    location: DEFAULT_LOCATION,
  },
  offersOneCity: [],
  allOffers: [],
  oneOffer: null,
  sortItem: SORT_TYPES[0],
  loadingStatus: LoadingStatus.Unknown,
  error: null,
};

export const getAllOffers = createAsyncThunk<
  CardListType,
  undefined,
  { extra: AxiosInstance }
>('@@offers-getAllOffers', async (_arg, { extra: api }) => {
  const { data: offers } = await api.get<CardListType>(
    `${BACKEND_URL}/${ApiRoute.Hotels}`
  );

  return offers;
});

export const getOneOffer = createAsyncThunk<
  CardOneType,
  OfferId,
  { extra: AxiosInstance }
>('@@offers- getOneOffer', async (offerId, { extra: api }) => {
  const { data: oneOffer } = await api.get<CardOneType>(
    // generatePath(ApiRoute.Hotels, { offerId })
    `${BACKEND_URL}/${ApiRoute.Hotels}/${offerId}`
  );
  return oneOffer;
});

export const offersSlice = createSlice({
  name: '@@offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city.name = action.payload;
      state.offersOneCity = state.allOffers.filter(
        (oneOffer) => oneOffer.city.name === action.payload
      );
    },
    sortCardListAction: (state, action: PayloadAction<string>) => {
      state.sortItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOffers.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        state.error = null;
      })
      .addCase(getAllOffers.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Unknown;
        state.error = 'Something went wrang!';
      })
      .addCase(
        getAllOffers.fulfilled,
        (state, action: PayloadAction<CardListType>) => {
          state.allOffers = action.payload;
          state.offersOneCity = action.payload.filter(
            (oneOffer) => oneOffer.city.name === DEFAULT_CITY
          );
          state.loadingStatus = LoadingStatus.Finished;
          state.error = null;
        }
      )
      .addCase(
        getOneOffer.fulfilled,
        (state, action: PayloadAction<CardOneType>) => {
          state.oneOffer = action.payload;
          state.loadingStatus = LoadingStatus.Finished;
        }
      )
      .addCase(getOneOffer.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        state.error = null;
      })
      .addCase(getOneOffer.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Unknown;
        state.error = 'Предложение не найдено';
      });
  },
});

const { actions, reducer } = offersSlice;
export const { changeCity, sortCardListAction } = actions;
export const offersReducer = reducer;
