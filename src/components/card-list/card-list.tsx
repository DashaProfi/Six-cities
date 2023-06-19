import { useState } from 'react';
import { CardListType } from '../../types/cardInfo';
import Card from '../card/card';

export type CardListProps = {
  cardInfo: CardListType;
  onListItemHover?: (listItemName: number) => void;
};

function CardList({ cardInfo, onListItemHover }: CardListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  function onHover(activeId: number) {
    setActiveCard(activeId);
    if (onListItemHover) {
      onListItemHover(activeId);
    }
  }
  return (
    <>
      {cardInfo.map((cardOne) => (
        <Card
          cardOne={cardOne}
          key={`Card${cardOne.id}`}
          onMouseEnter={() => onHover(cardOne.id)}
          onMouseLeave={() => onHover(0)}
          data-id={activeCard}
        />
      ))}
    </>
  );
}

export default CardList;
