import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Uploader from '../components/form/Uploader';
import TrackList from '../features/tracks/TrackList';
import Folders from '../components/folder/Folders';
import Sidebar from '../components/Sidebar';
import Search from '../components/form/Search';
import { fetchAsyncArtists, fetchAsyncTracks } from '../features/tracks/trackSlice';


function Dashboard() {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncTracks())
        dispatch(fetchAsyncArtists());
    }, [dispatch])

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-5 w-full">
                <Uploader />
                <Search />
                {/* <EditTrackMeta /> */}
                <Folders />
                <TrackList />
            </div>
        </div>
    )
}

export default Dashboard;