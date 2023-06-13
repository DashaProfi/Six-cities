import {Link} from 'react-router-dom';

function NotFound404 (): JSX.Element {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Страница не найдена, но Вы можете перейти <Link to='/'>на главную страницу</Link></p>
    </div>
  );
}

export default NotFound404;
