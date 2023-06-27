import Header from '../header/header';
import FormComment from '../form-comment/form-comment';
import ReviewsList from '../reviews-list/reviews-list';
import { reviews } from '../../mocks/reviews';
import { CardOneType } from '../../types/cardInfo';
import { image } from 'faker';

export type roomProps = {
  oneCard: CardOneType;
};

function Room({ oneCard }: roomProps): JSX.Element {
  return (
    <div className='page'>
      <Header />
      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {oneCard.images.map((image) => (
                <div
                  key={`${oneCard?.id}${image}`}
                  className='property__image-wrapper'
                >
                  <img
                    className='property__image'
                    src={image}
                    alt='Photo studio'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='property__container container'>
            <div className='property__wrapper'>
              {oneCard?.isPremium ? (
                <div className='property__mark'>
                  <span>Premium</span>
                </div>
              ) : (
                ''
              )}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>{oneCard?.title}</h1>
                <button
                  className={`${
                    oneCard?.isFavorite
                      ? 'property__bookmark-button--active'
                      : ''
                  } property__bookmark-button button`}
                  type='button'
                >
                  <svg
                    className='property__bookmark-icon'
                    width='31'
                    height='33'
                  >
                    <use xlinkHref='#icon-bookmark'></use>
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span
                    style={{
                      width: `${
                        oneCard.rating
                          ? (Math.round(oneCard.rating) * 100) / 5
                          : 0
                      }%`,
                    }}
                  ></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>
                  {oneCard?.rating}
                </span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>
                  {oneCard?.type}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {oneCard?.bedrooms}
                </li>
                <li className='property__feature property__feature--adults'>
                  Max {oneCard?.maxAdults} adults
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{oneCard?.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {oneCard.goods.map((item) => (
                    <li
                      key={`${oneCard.id}${item}`}
                      className='property__inside-item'
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                    <img
                      className='property__avatar user__avatar'
                      src={oneCard?.host.avatarUrl}
                      width='74'
                      height='74'
                      alt='Host avatar'
                    />
                  </div>
                  <span className='property__user-name'>
                    {oneCard?.host.name}
                  </span>
                  {oneCard?.host.isPro ? (
                    <span className='property__user-status'>Pro</span>
                  ) : (
                    ''
                  )}
                </div>
                <div className='property__description'>
                  <p className='property__text'>{oneCard?.description}</p>
                </div>
              </div>
              <section className='property__reviews reviews'>
                <ReviewsList reviewsList={reviews} />
                <FormComment />
              </section>
            </div>
          </div>
          <section className='property__map map'></section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <div className='near-places__list places__list'>
              <article className='near-places__card place-card'>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <a href='#'>
                    <img
                      className='place-card__image'
                      src='img/room.jpg'
                      width='260'
                      height='200'
                      alt='Place image'
                    />
                  </a>
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>&euro;80</b>
                      <span className='place-card__price-text'>
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className='place-card__bookmark-button place-card__bookmark-button--active button'
                      type='button'
                    >
                      <svg
                        className='place-card__bookmark-icon'
                        width='18'
                        height='19'
                      >
                        <use xlinkHref='#icon-bookmark'></use>
                      </svg>
                      <span className='visually-hidden'>In bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{ width: '80%' }}></span>
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <a href='#'>Wood and stone place</a>
                  </h2>
                  <p className='place-card__type'>Private room</p>
                </div>
              </article>

              <article className='near-places__card place-card'>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <a href='#'>
                    <img
                      className='place-card__image'
                      src='img/apartment-02.jpg'
                      width='260'
                      height='200'
                      alt='Place image'
                    />
                  </a>
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>&euro;132</b>
                      <span className='place-card__price-text'>
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className='place-card__bookmark-button button'
                      type='button'
                    >
                      <svg
                        className='place-card__bookmark-icon'
                        width='18'
                        height='19'
                      >
                        <use xlinkHref='#icon-bookmark'></use>
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{ width: '80%' }}></span>
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <a href='#'>Canal View Prinsengracht</a>
                  </h2>
                  <p className='place-card__type'>Apartment</p>
                </div>
              </article>

              <article className='near-places__card place-card'>
                <div className='near-places__image-wrapper place-card__image-wrapper'>
                  <a href='#'>
                    <img
                      className='place-card__image'
                      src='img/apartment-03.jpg'
                      width='260'
                      height='200'
                      alt='Place image'
                    />
                  </a>
                </div>
                <div className='place-card__info'>
                  <div className='place-card__price-wrapper'>
                    <div className='place-card__price'>
                      <b className='place-card__price-value'>&euro;180</b>
                      <span className='place-card__price-text'>
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className='place-card__bookmark-button button'
                      type='button'
                    >
                      <svg
                        className='place-card__bookmark-icon'
                        width='18'
                        height='19'
                      >
                        <use xlinkHref='#icon-bookmark'></use>
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  </div>
                  <div className='place-card__rating rating'>
                    <div className='place-card__stars rating__stars'>
                      <span style={{ width: '100%' }}></span>
                      <span className='visually-hidden'>Rating</span>
                    </div>
                  </div>
                  <h2 className='place-card__name'>
                    <a href='#'>Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className='place-card__type'>Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
