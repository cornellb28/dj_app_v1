import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {value: '0', label: 'Jay-Z'},
    {value: '1', label: 'Nas'},
    {value: '2', label: 'Drake'},
    {value: '3', label: 'K Dot'},
    {value: '4', label: 'Joey Badass'},
]

const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {}
})

export const selectAllArtists = (state) => state.artists;

export default artistsSlice.reducer;