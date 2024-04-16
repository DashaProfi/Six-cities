import { CardOneType } from '../../types/cardInfo';
import { Link } from 'react-router-dom';

export interface CardProps {
  oneOffer: CardOneType;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  handleFavorites: () => void;
}

function Card({
  oneOffer,
  onMouseEnter,
  onMouseLeave,
  handleFavorites,
}: CardProps): JSX.Element {
  return (
    <article
      className='cities__place-card place-card'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {oneOffer.isPremium ? (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      ) : (
        ''
      )}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`/offer/${oneOffer.id}`}>
          <img
            className='place-card__image'
            src={oneOffer.previewImage}
            width='260'
            height='200'
            alt='Place image'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{oneOffer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className='place-card__bookmark-button button'
            type='button'
            onClick={handleFavorites}
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span
              style={{ width: `${(Math.round(oneOffer.rating) * 100) / 5}%` }}
            />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`/offer/${oneOffer.id}`}>{oneOffer.title}</Link>
        </h2>
        <p className='place-card__type'>{oneOffer.type}</p>
      </div>
    </article>
  );
}
export default Card;
