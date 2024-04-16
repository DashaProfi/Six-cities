import { useState } from 'react';
import { SORT_TYPES } from '../../const/const';
import cn from 'classnames';

type SortProps = {
  sortItem: string;
  onClickSort: (sortItem: string) => void;
};
function Sort({ sortItem, onClickSort }: SortProps): JSX.Element {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const toggleSortOpen = () => {
    setIsSortOpen((prevState) => !prevState);
  };
  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption' style={{ marginRight: '3px' }}>
        Sort by
      </span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={toggleSortOpen}
      >
        {sortItem}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul
        className={cn('places__options places__options--custom', {
          'places__options--opened': isSortOpen,
        })}
      >
        {SORT_TYPES.map((item) => (
          <li
            className={`places__option ${
              sortItem === item ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            key={item}
            onClick={(evt) => {
              onClickSort(item);
              toggleSortOpen();
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
