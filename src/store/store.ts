import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers-slice';
import { createApi } from '../services/api';
import { userReducer } from './user-slice';
import { commentsReducer } from './comments-slice';
import { nearbyReducer } from './nearby-slice';

export const api = createApi();
export const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReducer,
    comments: commentsReducer,
    nearbyOffers: nearbyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
