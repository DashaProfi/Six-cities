import Main from '../../pages/main/main';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import SignIn from '../../pages/sign-in/sign-in';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import PrivateRoute from '../private-route/private-route';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllOffers } from '../../store/offers-slice';
import { AppDispatch } from '../../types/store';
import { getUserInfo } from '../../store/user-slice';
import { store } from '../../store/store';

store.dispatch(getUserInfo());

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOffers());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.Offer} element={<Room />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={'*'} element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
