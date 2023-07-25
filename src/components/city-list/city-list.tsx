import { useDispatch } from 'react-redux';
import { CITY_LIST } from '../const';
import { Dispatch } from '@reduxjs/toolkit';
import { changeCity } from '../../store/offers_slice';

function CityList(): JSX.Element {
  const dispatch: Dispatch = useDispatch();

  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {CITY_LIST.length &&
          CITY_LIST.map((item) => (
            <li
              key={item.city}
              className='locations__item'
              onClick={(evt) => {
                dispatch(changeCity(item.city));
              }}
            >
              <a
                className={`locations__item-link tabs__item ${
                  item.active ? 'tabs__item--active' : ''
                }`}
                href='#'
              >
                <span>{item.city}</span>
              </a>
            </li>
          ))}
      </ul>
    </section>
  );
}
export default CityList;
