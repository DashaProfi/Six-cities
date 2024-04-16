import Header from '../../components/header/header';
import FavoritesCard from '../../components/favorites-card/favorites-card';
import {
  deleteFavoritesOffers,
  getFavoritesOffers,
  setFavoritesOffers,
} from '../../services/favorites';
import { CardOneType } from '../../types/cardInfo';
import { useState } from 'react';
function Favorites(): JSX.Element {
  const [oneCard, setOneCard] = useState<CardOneType | null>(null);
  const favoritesOffers = getFavoritesOffers();

  const favoritesCity: string[] = [];

  Array.isArray(favoritesOffers) &&
    favoritesOffers.forEach((oneCard) => {
      if (!favoritesCity.includes(oneCard.city.name)) {
        favoritesCity.push(oneCard.city.name);
      }
    });

  const handleFavorites = (oneCard: CardOneType) => {
    if (!oneCard) return;

    const isFavorite = getFavoritesOffers().find((el) => el.id === oneCard.id);
    isFavorite
      ? deleteFavoritesOffers(oneCard.id)
      : setFavoritesOffers(oneCard);
  };
  return (
    <div className='page'>
      <Header />
      <main
        className={`page__main page__main--favorites ${
          favoritesOffers.length === 0 ? 'page__main--favorites-empty' : ''
        }`}
      >
        <div className='page__favorites-container container'>
          {favoritesOffers.length === 0 ? (
            <section className='favorites favorites--empty'>
              <h1 className='visually-hidden'>Favorites (empty)</h1>
              <div className='favorites__status-wrapper'>
                <b className='favorites__status'>Nothing yet saved.</b>
                <p className='favorites__status-description'>
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          ) : (
            <section className='favorites'>
              <h1 className='favorites__title'>Saved listing</h1>
              <ul className='favorites__list'>
                {favoritesCity.map((city) => (
                  <li key={city} className='favorites__locations-items'>
                    <div className='favorites__locations locations locations--current'>
                      <div className='locations__item'>
                        <a className='locations__item-link' href='#'>
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className='favorites__places'>
                      {favoritesOffers.map((oneCard) =>
                        oneCard.city.name === city ? (
                          <FavoritesCard
                            key={`${oneCard.id}FavoritesCard`}
                            oneCard={oneCard}
                            handleFavorites={() => {
                              setOneCard(oneCard);
                              handleFavorites(oneCard);
                            }}
                          />
                        ) : (
                          ''
                        )
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className='footer container'>
        <a className='footer__logo-link' href='main.html'>
          <img
            className='footer__logo'
            src='img/logo.svg'
            alt='6 cities logo'
            width='64'
            height='33'
          />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
