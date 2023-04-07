
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";
import { addTrack } from "../features/tracks/trackSlice";
const { ipcRenderer } = window;



export default function Uploader() {
  const dispatch = useDispatch();
  const [files, setFiles] = useState(null);

  async function sendDropFiles(files) {
    await ipcRenderer.send("files-dropped", files);
  }

  const handleDrop = async (event) => {
    event.preventDefault();
    const newFiles = event.dataTransfer.files;
    setFiles({ name: newFiles[0].name, filepath: newFiles[0].path })
    await sendDropFiles(files);
    //await sendDropFiles(files);
    // This will allow me to grab more than one file/folder
    //setFiles((prevFiles) => [...prevFiles, ...newFiles]);

  }

  const scanDir = async () => {
    const getTracks = await electronAPI.saveTracks.saveTracksToDB();
  }

  return (
    <div className="container mx-auto bg-gray-200 rounded-l shadow border p-8 m-1">
      <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <button onClick={scanDir}>Upload Files</button>
      </div>
      {/* <button onClick={dispatch(addTrack({
          "id": "4",
          "name": "Lil Wayne",
          "title": "Uproar",
          "location": "/location/wayne.mp3",
          "bpm": 99,
          "comments": [
            "FTW",
            "HEADZ"
          ],
          "like": true,
          "pinned": false,
          "year": "2023",
          "album": "Tha Carter",
          "initialKey": "12B",
          "bitrate": 45996878
        }))}>Add Track</button> */}
    </div>
  );
}
