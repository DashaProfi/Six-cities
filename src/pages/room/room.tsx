import Header from '../../components/header/header';
import FormComment from '../../components/form-comment/form-comment';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AppDispatch, AppState } from '../../types/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getOneOffer } from '../../store/offers-slice';
import {
  AppRoute,
  LIMIT_GALLERY_IMAGES,
  LoadingStatus,
} from '../../const/const';
import { getAllComments } from '../../store/comments-slice';
import { AuthorizationStatus } from '../../const/api-const';
import { getNearbyOffers } from '../../store/nearby-slice';
import Map from '../../components/map/map';
import NotFound404 from '../not-found-404/not-found-404';
import CardList from '../../components/card-list/card-list';

function Room(): JSX.Element {
  const { oneOffer, loadingStatus, error } = useSelector(
    (state: AppState) => state.offers
  );
  const { comments } = useSelector((state: AppState) => state.comments);
  const { authorizationStatus } = useSelector((state: AppState) => state.user);
  const { nearbyOffers } = useSelector((state: AppState) => state.nearbyOffers);

  const dispatch: AppDispatch = useDispatch();
  const { id: offerId } = useParams();

  useEffect(() => {
    if (offerId) {
      dispatch(getOneOffer(offerId));
      dispatch(getAllComments(offerId));
      dispatch(getNearbyOffers(offerId));
    }
  }, [offerId]);

  return (
    <div className='page'>
      <Header />

      <main className='page__main page__main--property'>
        {loadingStatus === LoadingStatus.Unknown && error ? (
          <NotFound404 />
        ) : (
          <>
            {loadingStatus === LoadingStatus.Loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '500px',
                }}
              >
                Loading...
              </div>
            ) : (
              <>
                <section className='property'>
                  <div className='property__gallery-container container'>
                    <div className='property__gallery'>
                      {oneOffer?.images.map((image, index) =>
                        index < LIMIT_GALLERY_IMAGES ? (
                          <div
                            key={`${oneOffer?.id}${image}`}
                            className='property__image-wrapper'
                          >
                            <img
                              className='property__image'
                              src={image}
                              alt='Photo studio'
                            />
                          </div>
                        ) : (
                          ''
                        )
                      )}
                    </div>
                  </div>
                  <div className='property__container container'>
                    <div className='property__wrapper'>
                      {oneOffer?.isPremium ? (
                        <div className='property__mark'>
                          <span>Premium</span>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className='property__name-wrapper'>
                        <h1 className='property__name'>{oneOffer?.title}</h1>
                        <button
                          className={`${
                            oneOffer?.isFavorite
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
                                oneOffer?.rating
                                  ? (Math.round(oneOffer?.rating) * 100) / 5
                                  : 0
                              }%`,
                            }}
                          ></span>
                          <span className='visually-hidden'>Rating</span>
                        </div>
                        <span className='property__rating-value rating__value'>
                          {oneOffer?.rating}
                        </span>
                      </div>
                      <ul className='property__features'>
                        <li className='property__feature property__feature--entire'>
                          {oneOffer?.type}
                        </li>
                        <li className='property__feature property__feature--bedrooms'>
                          {oneOffer?.bedrooms}
                        </li>
                        <li className='property__feature property__feature--adults'>
                          Max {oneOffer?.maxAdults} adults
                        </li>
                      </ul>
                      <div className='property__price'>
                        <b className='property__price-value'>
                          &euro;{oneOffer?.price}
                        </b>
                        <span className='property__price-text'>
                          &nbsp;night
                        </span>
                      </div>
                      <div className='property__inside'>
                        <h2 className='property__inside-title'>
                          What&apos;s inside
                        </h2>
                        <ul className='property__inside-list'>
                          {oneOffer?.goods.map((item) => (
                            <li
                              key={`${oneOffer?.id}${item}`}
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
                              src={oneOffer?.host.avatarUrl}
                              width='74'
                              height='74'
                              alt='Host avatar'
                            />
                          </div>
                          <span className='property__user-name'>
                            {oneOffer?.host.name}
                          </span>
                          {oneOffer?.host.isPro ? (
                            <span className='property__user-status'>Pro</span>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className='property__description'>
                          <p className='property__text'>
                            {oneOffer?.description}
                          </p>
                        </div>
                      </div>
                      <section className='property__reviews reviews'>
                        <ReviewsList comments={comments} />
                        {authorizationStatus === AuthorizationStatus.Auth && (
                          <FormComment />
                        )}
                      </section>
                    </div>
                  </div>
                  <section className='property__map map'>
                    {oneOffer && (
                      <Map
                        city={oneOffer.city}
                        offersOneCity={[...nearbyOffers, oneOffer]}
                        classIn={'cities__map'}
                        styleIn={{ height: '100%', minHeight: '579px' }}
                        selectedPoint={oneOffer}
                      />
                    )}
                  </section>
                </section>
                <div className='container'>
                  <section className='near-places places'>
                    <h2 className='near-places__title'>
                      Other places in the neighbourhood
                    </h2>
                    <div className='near-places__list places__list'>
                      <CardList cardInfo={nearbyOffers} />
                    </div>
                  </section>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Room;
