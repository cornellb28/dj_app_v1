import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from '../../features/tracks/trackSlice';
import artistsReducer from '../../features/artists/artistsSlice';

const store = configureStore({
    reducer: {
        tracks: tracksReducer,
        artists: artistsReducer
    },
  });

  export default store;
