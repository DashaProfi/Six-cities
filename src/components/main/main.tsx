import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../card-list/card-list';
import Header from '../header/header';
import Map from '../map/map';
import CityList from '../city-list/city-list';
import Sort from '../sort/sort';
import {
  CardListType,
  CardOneType,
  CityType,
  OffersState,
} from '../../types/cardInfo';
import { CITY_LIST } from '../const';
import { Dispatch } from '@reduxjs/toolkit';
import { changeCity } from '../../store/offers_slice';

type MainProps = {
  cardInfo: CardListType;
};

function Main({ cardInfo }: MainProps): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<CardOneType | undefined>(
    undefined
  );

  const { city, offers } = useSelector((state: OffersState) => state);
  const dispatch: Dispatch = useDispatch();

  const onListItemHover = (activeId: number) => {
    const currentPoint = cardInfo.find((point) => point.id === activeId);
    setSelectedPoint(currentPoint);
  };

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <CityList />
        </div>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>
                {offers.length} places to stay in {city.city}
              </b>
              <Sort />
              <div className='cities__places-list places__list tabs__content'>
                <CardList cardInfo={offers} onListItemHover={onListItemHover} />
              </div>
            </section>
            <div className='cities__right-section'>
              {/* {offers[0] ? (
                <Map
                  city={offers[0].city}
                  cardInfo={offers}
                  classIn={'cities__map map'}
                  styleIn={{ height: '100%', minHeight: '500px' }}
                  selectedPoint={selectedPoint}
                />
              ) : (
                ''
              )} */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
