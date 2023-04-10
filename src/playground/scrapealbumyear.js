const axios = require('axios');
const cheerio = require('cheerio');

async function getAlbumYears(artistName) {
  const url = `https://www.discogs.com/search/?q=${encodeURIComponent(artistName)}&type=all`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const albumYears = $('span.year').toArray().map(el => $(el).text().trim());
    return albumYears;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const artistName = 'Pink Floyd';
getAlbumYears(artistName).then(albumYears => {
  console.log(`Album years for ${artistName}:`, albumYears);
});
