import { AuthorizationStatus } from '../const/api-const';
export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityType = {
  location: LocationType;
  name: string;
  active: boolean;
};

export type CityNames = string[];

export type HostType = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type CardOneType = {
  bedrooms: number;
  city: CityType;
  description: string;
  goods: string[];
  host: HostType;
  id: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationType;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type CardListType = CardOneType[];

export interface OffersState {
  city: CityType;
  offersOneCity: CardListType;
  allOffers: CardListType;
  oneOffer: CardOneType | null;
  sortItem: string;
  loadingStatus: string;
  error: any;
}

export type OfferId = string;

export interface FavoritesState {
  favoritesOffers: CardListType;
}
