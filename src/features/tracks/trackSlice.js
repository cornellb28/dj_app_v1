import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TrackApi from '../../commons/apis/TrackApi';

export const fetchAsyncTracks = createAsyncThunk('tracks/fetchAsyncTracks', async () => {
  const response = await TrackApi.get('/api/tracks');
  return response.data;
})

export const fetchAsyncArtists = createAsyncThunk('tracks/fetchAsyncArtists', async () => {
  const response = await TrackApi.get('/api/artists');
  return response.data;
})

export const fetchAsyncTrackDetail = createAsyncThunk('tracks/fetchAsyncTrackDetail', async (id) => {
  const response = await TrackApi.get(`/api/tracks/${id}`);
  return response.data;
})

const initialState = {
  tracksData: {},
  artists: {},
  selectedTracks: {},
  playlists: {}
}

export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    addTracks: (state, { payload }) => {
      // Updates the tracksData property of the state with the payload
      return { ...state, tracks: payload };
    },
    removeSelectedTrack: (state) => {
      state.selectedTracks = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Tracks
      .addCase(fetchAsyncTracks.pending, () => {
        console.log("Fetching tracks data...");
      })
      .addCase(fetchAsyncTracks.fulfilled, (state, { payload }) => {
        console.log("Successfully fetched tracks data!");
        return { ...state, tracksData: payload };
      })
      .addCase(fetchAsyncTracks.rejected, (state, action) => {
        console.log("Failed to fetch tracks data.");
        console.log(action.error.message);
      })
      // Artists
      .addCase(fetchAsyncArtists.pending, () => {
        console.log("Fetching artists data...");
      })
      .addCase(fetchAsyncArtists.fulfilled, (state, { payload }) => {
        console.log("Successfully fetched artists data!");
        return { ...state, artists: payload };
      })
      .addCase(fetchAsyncArtists.rejected, (state, action) => {
        console.log("Failed to fetch artists data.");
        console.log(action.error.message);
      })
      // TrackDetail
      .addCase(fetchAsyncTrackDetail.pending, () => {
        console.log("Fetching Track Detail data...");
      })
      .addCase(fetchAsyncTrackDetail.fulfilled, (state, { payload }) => {
        console.log("Successfully fetched Track Detail data!");
        return { ...state, selectedTracks: payload };
      })
      .addCase(fetchAsyncTrackDetail.rejected, (state, action) => {
        console.log("Failed to fetch Track Detail data.");
        console.log(action.error.message);
      });
  },
});



export const { removeSelectedTrack } = trackSlice.actions;

export const getAllTracks = (state) => state.tracks.tracksData;
export const getAllArtists = (state) => state.tracks.artists;
export const getSelectedTrackDetail = (state) => state.tracks.selectedTracks;
export const removeSelectedTrackDetail = (state) => state.tracks.selectedTracks;

export default trackSlice.reducer;
