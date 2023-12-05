import React, { useState } from 'react';

const CardSelectionComponent = () => {
  // Sample data
  const data = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
    // Add more cards as needed
  ];

  // State to keep track of selected cards
  const [selectedCards, setSelectedCards] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (cardId) => {
    setSelectedCards(prevSelectedCards =>
      prevSelectedCards.includes(cardId)
        ? prevSelectedCards.filter(id => id !== cardId)
        : [...prevSelectedCards, cardId]
    );
  };

  return (
    <div>
      {data.map(card => (
        <div key={card.id}>
          <input
            type="checkbox"
            checked={selectedCards.includes(card.id)}
            onChange={() => handleCheckboxChange(card.id)}
          />
          {card.title}
        </div>
      ))}
      <div>Selected Cards: {JSON.stringify(selectedCards)}</div>
    </div>
  );
};

export default CardSelectionComponent;
