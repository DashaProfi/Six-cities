import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { AuthorizationStatus } from '../../const/api-const';
import { useSelector } from 'react-redux';
import { AppState } from '../../types/store';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const { authorizationStatus } = useSelector((state: AppState) => state.user);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <div>Loading</div>;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;

