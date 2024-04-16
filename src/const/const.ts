import { CityNames, CityType } from '../types/cardInfo';

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const LIMIT_GALLERY_IMAGES = 6;
export const MIN_LENGTH_COMMENT = 50;
export const MAX_LENGTH_COMMENT = 300;

export const SORT_TYPES = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const DEFAULT_CITY = 'Amsterdam';
export const DEFAULT_LOCATION = {
  latitude: 52.37454,
  longitude: 4.887976,
  zoom: 16,
};

export const CITY_LIST: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
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

export enum LoadingStatus {
  Loading = 'LOADING',
  Finished = 'FINISHED',
  Unknown = 'UNKNOWN',
}
