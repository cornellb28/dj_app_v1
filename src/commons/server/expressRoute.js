const express = require('express');
const router = express();
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();


// GET /tracks
router.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await prisma.track.findMany({
      include: {trackAttributes: true },
    });
    res.json(tracks)
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve tracks' })
  }
});

// GET /tracks/:id
router.get('/api/tracks/:id', async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id)
    const track = await prisma.track.findUnique({
      where: { id },
      include: { trackAttributes: true },
    })

    if (!track) {
      return res.status(404).json({ error: 'Track not found' })
    }

    res.json(track)
  } catch (error) {
    console.log("Error: ", error)
  }
});

// POST /tracks
router.post('/api/tracks', (req, res) => {
  res.send('This is the POST /tracks route');
});

// PUT /tracks/:id
router.put('/api/tracks/:id', (req, res) => {
  const id = req.params.id;
  res.send(`This is the PUT /tracks/${id} route`);
});

// DELETE /tracks/:id
router.delete('/api/tracks/:id', (req, res) => {
  const id = req.params.id;
  res.send(`This is the DELETE /tracks/${id} route`);
});

// GET /artists
router.get('/api/artists', (req, res) => {
  res.send('This is the GET /artists route');
});

// POST /artists/new
router.post('/api/artists/new', (req, res) => {
  res.send('This is the GET /artists/new route');
});

// DELETE /artists
router.delete('/api/artists/:id', (req, res) => {
  res.send('This is the DELETE /artists route');
});

module.exports = router;