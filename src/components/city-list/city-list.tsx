import { CITY_LIST } from '../const';

type CityListProps = {
  city: string;
  onClickCity: (city: string) => void;
};

function CityList({ onClickCity }: CityListProps): JSX.Element {
  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {CITY_LIST.length &&
          CITY_LIST.map((item) => (
            <li
              key={item.city}
              className='locations__item'
              onClick={(evt) => {
                onClickCity(item.city);
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
