import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAuthorizationData, UserInfo } from '../types/user';
import { AxiosInstance } from 'axios';
import { ApiRoute, AuthorizationStatus, BACKEND_URL } from '../const/api-const';
import { Token, dropToken, setToken } from '../services/token';

export const getUserInfo = createAsyncThunk<
  UserInfo,
  undefined,
  { extra: AxiosInstance }
>('@@user-getUserInfo', async (_arg, { extra: api }) => {
  const { data: userInfo } = await api.get<UserInfo>(
    `${BACKEND_URL}/${ApiRoute.Login}`
  );
  return userInfo;
});

export const setUserLogin = createAsyncThunk<
  UserInfo, // тип возвращаемых данных из функции
  UserAuthorizationData, // тип получаемых данных в функцию
  { extra: AxiosInstance }
>('@@user-setUserLogin', async (userData, { extra: api }) => {
  const { data } = await api.post<UserInfo>( // тип получаемых с сервера данных
    `${BACKEND_URL}/${ApiRoute.Login}`,
    userData
  );
  return data;
});

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('@@user-logoutUser', async (_arg, { extra: api }) => {
  await api.delete<Token>(`${BACKEND_URL}/${ApiRoute.Logout}`);
});

const initialState: UserInfo = {
  avatarUrl: '',
  email: '',
  id: 0,
  isPro: false,
  name: '',
  token: '',
  authorizationStatus: AuthorizationStatus.Unknown,
};
export const UserSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserInfo.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.avatarUrl = action.payload.avatarUrl;
          state.email = action.payload.email;
          state.id = action.payload.id;
          state.isPro = action.payload.isPro;
          state.name = action.payload.name;
          state.token = action.payload.token;
          state.authorizationStatus = AuthorizationStatus.Auth;
        }
      )
      .addCase(getUserInfo.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(
        setUserLogin.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.avatarUrl = action.payload.avatarUrl;
          state.email = action.payload.email;
          state.id = action.payload.id;
          state.isPro = action.payload.isPro;
          state.name = action.payload.name;
          state.token = action.payload.token;
          state.authorizationStatus = AuthorizationStatus.Auth;
          setToken(action.payload.token);
        }
      )
      .addCase(logoutUser.pending, (state) => {
        dropToken();
        state.token = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
const { actions, reducer } = UserSlice;
export const userReducer = reducer;
