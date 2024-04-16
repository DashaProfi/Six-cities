import {Link} from 'react-router-dom';
import { AppRoute } from '../../const/const';

function NotFound404 (): JSX.Element {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>
        Страница не найдена, но Вы можете перейти{' '}
        <Link to={AppRoute.Main}> на главную страницу</Link>
      </p>
    </div>
  );
}

export default NotFound404;
