import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../components/const';
import {
  OffersState,
  OneCityType,
  CardListType,
  CardOneType,
} from '../types/cardInfo';
import { offers } from '../mocks/offers';

const initialState: OffersState = {
  city: {
    city: DEFAULT_CITY,
    active: true,
  },
  offers: offers.filter((CardOne) => CardOne.city.name === DEFAULT_CITY),
};

export const offersSlice = createSlice({
  name: '@@offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city.city = action.payload;
      state.offers = offers.filter(
        (CardOne) => CardOne.city.name === action.payload
      );
    },
  },
});

const { actions, reducer } = offersSlice;
export const { changeCity } = actions;
export default reducer;
