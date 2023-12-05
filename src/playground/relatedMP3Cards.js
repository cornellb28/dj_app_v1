import React, { useState, useEffect } from 'react';

const Card = ({ title }) => {
  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{title}</h3>
    </div>
  );
};

const GenreFilterComponent = () => {
  const [selectedGenre, setSelectedGenre] = useState('Hip Hop');
  const [filteredCards, setFilteredCards] = useState([]);

  // Sample data
  const cardsData = [
    { id: 1, title: 'Card 1', genre: 'Hip Hop' },
    { id: 2, title: 'Card 2', genre: 'Rock' },
    { id: 3, title: 'Card 3', genre: 'Hip Hop' },
    { id: 4, title: 'Card 4', genre: 'Hip Hop' },
    // Add more cards with different genres
  ];

  useEffect(() => {
    // Filter cards based on selected genre
    const filtered = cardsData.filter(card => card.genre === selectedGenre);
    setFilteredCards(filtered);
  }, [selectedGenre]);

  return (
    <div>
      <div>
        <label>Select Genre: </label>
        <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Rock">Rock</option>
          {/* Add more genres as options */}
        </select>
      </div>
      <div>
        {filteredCards.map(card => (
          <Card key={card.id} title={card.title} />
        ))}
      </div>
    </div>
  );
};

export default GenreFilterComponent;
