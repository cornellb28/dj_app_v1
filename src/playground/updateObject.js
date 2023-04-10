// OBject Assign
const track = {
  title: "Art Talk",
  bpm: 92,
  artist: "Larry June"
}

const updatedTrack = Object.assign({}, track, { bpm: 99 });

console.log('Original object:', track);
console.log('Updated object:', updatedTrack);


// spread operator
const track = {
  title: "Art Talk",
  bpm: 92,
  artist: "Larry June"
};

// Create a new object with the updated artist property
const updatedTrack = { ...track, artist: "Kendrick Lamar" };
// Concat a string
track.artist = track.artist + " feat. Big Sean";

console.log("Original track:", track);
console.log("Updated track:", updatedTrack);
