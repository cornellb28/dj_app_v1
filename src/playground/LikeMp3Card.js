import React, { useState } from 'react';

const CardWithLike = ({ title }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <h3>{title}</h3>
      <button onClick={toggleLike}>
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
};

const CardsContainer = () => {
  // Sample data for cards
  const cardsData = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
    // more cards can be added here
  ];

  return (
    <div>
      {cardsData.map(card => (
        <CardWithLike key={card.id} title={card.title} />
      ))}
    </div>
  );
};

export default CardsContainer;
