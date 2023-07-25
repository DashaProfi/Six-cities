import { configureStore } from '@reduxjs/toolkit';
import reducer from './offers_slice';

export const store = configureStore({
  reducer: reducer,
});
