import { OneCityType } from '../types/cardInfo';

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const CITY_LIST: OneCityType[] = [
  { city: 'Paris', active: false },
  { city: 'Cologne', active: false },
  { city: 'Paris', active: false },
  { city: 'Brussels', active: false },
  { city: 'Amsterdam', active: false },
  { city: 'Hamburg', active: false },
  { city: 'Dusseldorf', active: false },
];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Ratings = [
  {
    title: 'perfect',
    value: '5',
  },
  {
    title: 'good',
    value: '4',
  },
  {
    title: 'not bad',
    value: '3',
  },
  {
    title: 'badly',
    value: '2',
  },
  {
    title: 'terribly',
    value: '1',
  },
] as const;
