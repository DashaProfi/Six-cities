import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../../components/card-list/card-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import Sort from '../../components/sort/sort';
import cn from 'classnames';
import {
  CardListType,
  CardOneType,
  CityType,
  OffersState,
} from '../../types/cardInfo';
import { CITY_LIST, LoadingStatus, SORT_TYPES } from '../../const/const';
import { Dispatch } from '@reduxjs/toolkit';
import { changeCity, sortCardListAction } from '../../store/offers-slice';
import { AppDispatch, AppState } from '../../types/store';
import { UserInfo } from '../../types/user';

function Main(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<CardOneType | undefined>(
    undefined
  );

  const {
    city,
    offersOneCity,
    allOffers,
    sortItem,
    loadingStatus,
    oneOffer,
    error,
  } = useSelector((state: AppState) => state.offers);
  const dispatch: AppDispatch = useDispatch();

  const onListItemHover = (activeId: string) => {
    const currentPoint = allOffers.find((point) => point.id === activeId);
    setSelectedPoint(currentPoint);
  };
  const onClickSort = (sortItem: string) => {
    dispatch(sortCardListAction(sortItem));
  };

  const sortCardList = (sortItem: string, offersOneCity: CardListType) => {
    switch (sortItem) {
      case SORT_TYPES[1]:
        return [...offersOneCity].sort((a, b) => a.price - b.price);
      case SORT_TYPES[2]:
        return [...offersOneCity].sort((a, b) => b.price - a.price);
      case SORT_TYPES[3]:
        return [...offersOneCity].sort((a, b) => b.rating - a.rating);
      default:
        return offersOneCity;
    }
  };

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main
        className={cn('page__main page__main--index', {
          'page__main--index-empty': !offersOneCity.length,
        })}
      >
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <CityList />
        </div>
        <div className='cities'>
          {offersOneCity.length === 0 &&
          loadingStatus === LoadingStatus.Finished ? (
            <div className='cities__places-container cities__places-container--empty container'>
              <section className='cities__no-places'>
                <div className='cities__status-wrapper tabs__content'>
                  <b className='cities__status'>No places to stay available</b>
                  <p className='cities__status-description'>
                    We could not find any property available at the moment in{' '}
                    {city.name}
                  </p>
                </div>
              </section>
              <div className='cities__right-section'></div>
            </div>
          ) : (
            <>
              <div className='cities__places-container container'>
                {loadingStatus === LoadingStatus.Loading ? (
                  <div style={{ margin: 'auto' }}>Loading...</div>
                ) : (
                  <>
                    <section className='cities__places places'>
                      <h2 className='visually-hidden'>Places</h2>
                      <b className='places__found'>
                        {offersOneCity.length} places to stay in {city.name}
                      </b>
                      <Sort onClickSort={onClickSort} sortItem={sortItem} />
                      <div className='cities__places-list places__list tabs__content'>
                        <CardList
                          cardInfo={sortCardList(sortItem, offersOneCity)}
                          onListItemHover={onListItemHover}
                        />
                      </div>
                    </section>
                    <div className='cities__right-section'>
                      {offersOneCity.length && (
                        <Map
                          city={offersOneCity[0].city}
                          offersOneCity={offersOneCity}
                          classIn={'cities__map'}
                          styleIn={{ height: '100%', minHeight: '500px' }}
                          selectedPoint={selectedPoint}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;
