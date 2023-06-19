import Main from '../main/main';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import PrivateRoute from '../private-route.tsx/private-route';
import NotFound404 from '../not-found-404/not-found-404';
import { CardListType } from '../../types/cardInfo';

type AppMainProps = {
  rentalCount: number;
  offers: CardListType;
};

function App({ rentalCount, offers }: AppMainProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main rentalCount={rentalCount} />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.Offer} element={<Room />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
