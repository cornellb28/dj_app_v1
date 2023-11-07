import React, { useState } from 'react';

const initialSongs = [
  { id: 1, name: 'Song One', bpm: 120 },
  { id: 2, name: 'Song Two', bpm: 100 },
  { id: 3, name: 'Dance Track', bpm: 128 },
  // ... more songs
];

const SongList = () => {
  const [songs, setSongs] = useState(initialSongs);
  const [nameFilter, setNameFilter] = useState('');
  const [bpmFilter, setBpmFilter] = useState('');

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleBpmFilterChange = (event) => {
    setBpmFilter(event.target.value);
  };

  const filteredSongs = songs.filter((song) => {
    const matchesName = song.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesBpm = bpmFilter ? song.bpm === Number(bpmFilter) : true;
    return matchesName && matchesBpm;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <input
        type="number"
        placeholder="Filter by BPM..."
        value={bpmFilter}
        onChange={handleBpmFilterChange}
      />
      <ul>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <li key={song.id}>
              {song.name} - {song.bpm} BPM
            </li>
          ))
        ) : (
          <li>No songs match the filters.</li>
        )}
      </ul>
    </div>
  );
};

export default SongList;
