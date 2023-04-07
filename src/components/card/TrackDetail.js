import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTrackDetail, getSelectedTrackDetail, removeSelectedTrackDetail } from "../../features/tracks/trackSlice";

const TrackDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedTrackDetail);
    
    const { trackAttributes } = data;

    useEffect(() => {
        dispatch(fetchAsyncTrackDetail(id));
        return () => {
            dispatch(removeSelectedTrackDetail());
        };
    }, [dispatch, id]);


    return (
        <>
            {Object.keys(data).length === 0 ? (
                <div>.....Loading</div>
            ) : (
                
                <div className="p-6 w-72 bg-white rounded-xl shadow-md flex items-center space-x-4">
                    <img src="" alt="" />
                    <div id="excerpt" className={`${data.id}`}>
                        <h2>{trackAttributes.title}</h2>
                        <p>{trackAttributes.name}</p>
                        <p>{trackAttributes.bpm}</p>
                        <p className="artistCredit">
                            {/* <TrackArtist artists={track.artists} /> */}
                        </p>

                        <button className="text-white px-2 py-1 bg-lime-400 rounded-sm text-xs">Move File</button>
                    </div>
                    <Link to="/">Home</Link>
                </div>
            )
            }
        </>
    )
}


export default TrackDetail;