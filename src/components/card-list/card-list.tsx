import { useEffect, useState } from 'react';
import { CardListType, CardOneType } from '../../types/cardInfo';
import Card from '../card/card';
import {
  deleteFavoritesOffers,
  getFavoritesOffers,
  setFavoritesOffers,
} from '../../services/favorites';

export type CardListProps = {
  cardInfo: CardListType;
  onListItemHover?: (listItemName: string) => void;
};

function CardList({ cardInfo, onListItemHover }: CardListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState('');

  function onHover(activeId: string) {
    setActiveCard(activeId);
    if (onListItemHover) {
      onListItemHover(activeId);
    }
  }

  const handleFavorites = (oneCard: CardOneType) => {
    const isFavorite = getFavoritesOffers().find((el) => el.id === oneCard.id);
    isFavorite
      ? deleteFavoritesOffers(oneCard.id)
      : setFavoritesOffers(oneCard);
  };
  return (
    <>
      {cardInfo.map((oneOffer) => (
        <Card
          oneOffer={oneOffer}
          key={`Card${oneOffer.id}`}
          onMouseEnter={() => onHover(oneOffer.id)}
          onMouseLeave={() => onHover('')}
          data-id={activeCard}
          handleFavorites={() => handleFavorites(oneOffer)}
        />
      ))}
    </>
  );
}

export default CardList;
