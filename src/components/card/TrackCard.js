import React from 'react';
import { Link } from 'react-router-dom';


export default function TrackCard({ data }) {
  return (
    <div className="track-card">
        <div id="card-inner" className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="shrink-0">
            image
          </div>
          <div id="info">
            <h5>{data.title}</h5>
            <p>{data.location}</p>
          </div>
          <Link to={`/tracks/${data.id}`}>Edit Track</Link>
        </div>
    </div>
  )
}
