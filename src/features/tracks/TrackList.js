import React from "react";
import TrackCard from "../../components/card/TrackCard";
import ArtistCard from "../artists/ArtistCard";
import { getAllTracks, getAllArtists } from './trackSlice';
import { useSelector } from 'react-redux';

const TrackList = () => {
    const tracks = useSelector(getAllTracks);
    //const artists = useSelector(getAllArtists);

    let renderTracks, renderArtists = "";

    renderTracks = tracks.length > 0 ? (
        tracks.map((track) => (
            <TrackCard key={track.id} data={track} />
        ))
    ) : (<div className="track-error"><h3>{tracks.Error}</h3></div>);

    // renderArtists = artists.length > 0 ? (
    //     artists.map((artist, index) => (
    //         <ArtistCard key={index} data={artist} />
    //     ))
    // ) : (<div className="track-error"><h3>{tracks.Error}</h3></div>);

    return (
        <div id="track-wrapper" className="container mx-auto">
            <div id="artist-list" className="flex flex-row flex-wrap justify-start gap-8 box-border">
                <h2>All Artists</h2>
                {/* {renderArtists} */}
            </div>
            <div id="track-list" className="flex flex-row flex-wrap justify-start gap-8 box-border">
                <h2>All Tracks</h2>
                {renderTracks}
            </div>
        </div>
    );
}

export default TrackList;