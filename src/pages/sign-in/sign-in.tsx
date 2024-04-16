import { useDispatch } from 'react-redux';
import { AppDispatch, AppState } from '../../types/store';
import { useSelector } from 'react-redux';
import { getUserInfo, setUserLogin } from '../../store/user-slice';
import { FormEvent, useState } from 'react';
import { AuthorizationStatus } from '../../const/api-const';
import { AppRoute } from '../../const/const';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ErrorPasswordMessage } from '../../components/error-message/error-password-message';
const regExp = /((?=.*[a-zа-яA-ZА-Я])(?=.*\d))/;

function SignIn(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { authorizationStatus } = useSelector((state: AppState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!regExp.test(password)) {
      setError('Пароль должен состоять минимум из одной буквы и цифры');
    } else {
      setError('');
      dispatch(setUserLogin({ email, password }));
    }
  };

  return (
    <div className='page page--gray page--login'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <a className='header__logo-link' href='main.html'>
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width='81'
                  height='41'
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className='login__form form'
              action='#'
              method='post'
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
                <ErrorPasswordMessage error={error} />
              </div>
              <button
                className='login__submit form__submit button'
                type='submit'
              >
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <a className='locations__item-link' href='#'>
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
      {authorizationStatus === AuthorizationStatus.Auth && (
        <Navigate to={AppRoute.Main} />
      )}
    </div>
  );
}

export default SignIn;
