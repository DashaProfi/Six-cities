import { CardListType, CardOneType, OfferId } from '../types/cardInfo';
import Favorites from '../pages/favorites/favorites';
const FAVORITES_STATE = 'favorites-state';
export type FavoriteOfferId = string;

export const getFavoritesOffers = (): CardListType => {
  const favoritesOffersStr = localStorage.getItem(FAVORITES_STATE);

  return favoritesOffersStr && Array.isArray(JSON.parse(favoritesOffersStr))
    ? (JSON.parse(favoritesOffersStr) as CardListType)
    : [];
};

export const setFavoritesOffers = (oneCard: CardOneType) => {
  const favoritesOffers = getFavoritesOffers();

  favoritesOffers.push(oneCard);

  const updateFavoritesOffersStr = JSON.stringify(favoritesOffers);

  localStorage.setItem(FAVORITES_STATE, updateFavoritesOffersStr);
};

export const deleteFavoritesOffers = (id: OfferId) => {
  const updateFavoritesOffers = getFavoritesOffers().filter(
    (oneCard) => oneCard.id !== id
  );
  const updateFavoritesOffersStr = JSON.stringify(updateFavoritesOffers);
  localStorage.setItem(FAVORITES_STATE, updateFavoritesOffersStr);
};
