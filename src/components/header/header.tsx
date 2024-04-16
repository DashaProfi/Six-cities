import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../types/store';
import { AuthorizationStatus } from '../../const/api-const';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/user-slice';

function Header(): JSX.Element {
  const { email, avatarUrl, authorizationStatus } = useSelector(
    (state: AppState) => state.user
  );
  const dispatch: AppDispatch = useDispatch();
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Link
              to={AppRoute.Main}
              className='header__logo-link header__logo-link--active'
            >
              <img
                className='header__logo'
                src='img/logo.svg'
                alt='6 cities logo'
                width='81'
                height='41'
              />
            </Link>
          </div>

          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li className='header__nav-item user header__nav-link'>
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <Link to={AppRoute.Favorites} style={{ display: 'flex' }}>
                      <div className='header__avatar-wrapper user__avatar-wrapper'>
                        <img src={avatarUrl} />
                      </div>
                      <span className='header__user-name user__name'>
                        {email}
                      </span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to={AppRoute.Login}
                    className='header__nav-link header__nav-link--profile'
                  >
                    <span className='header__user-name'>Sign in</span>
                  </Link>
                )}
              </li>
              <li className='header__nav-item'>
                <Link
                  className='header__nav-link'
                  to='/#'
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutUser());
                  }}
                >
                  <span className='header__signout'>Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;
