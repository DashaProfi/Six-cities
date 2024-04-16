import { useDispatch } from 'react-redux';
import { CITY_LIST } from '../../const/const';
import { changeCity } from '../../store/offers-slice';
import { useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../types/store';

function CityList(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const { city } = useSelector((state: AppState) => state.offers);

  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {CITY_LIST.length &&
          CITY_LIST.map((oneCity) => (
            <li
              key={oneCity}
              className='locations__item'
              onClick={(evt) => {
                dispatch(changeCity(oneCity));
              }}
            >
              <a
                className={`locations__item-link tabs__item ${
                  oneCity === city.name ? 'tabs__item--active' : ''
                }`}
                href='#'
              >
                <span>{oneCity}</span>
              </a>
            </li>
          ))}
      </ul>
    </section>
  );
}
export default CityList;
