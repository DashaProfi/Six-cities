import { Link } from 'react-router-dom';
import { CardOneType } from '../../types/cardInfo';

export interface FavoritesCardProps {
  oneCard: CardOneType;
  handleFavorites: () => void;
}

function FavoritesCard({
  oneCard,
  handleFavorites,
}: FavoritesCardProps): JSX.Element {
  return (
    <article className='favorites__card place-card'>
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <Link to={`/offer/${oneCard.id}`}>
          <img
            className='place-card__image'
            src={oneCard.previewImage}
            width='150'
            height='110'
            alt='Place image'
          />
        </Link>
      </div>
      <div className='favorites__card-info place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{oneCard.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              oneCard.isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            type='button'
            onClick={handleFavorites}
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span
              style={{ width: `${(Math.round(oneCard.rating) * 100) / 5}%` }}
            ></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`/offer/${oneCard.id}`}>{oneCard.title}</Link>
        </h2>
        <p className='place-card__type'>{oneCard.type}</p>
      </div>
    </article>
  );
}
export default FavoritesCard;
