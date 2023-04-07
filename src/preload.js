// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("ipcRenderer",ipcRenderer);

contextBridge.exposeInMainWorld('electronAPI',{
  saveTracks: {
    saveTracksToDB() {
      console.log('sending to the database......')
      ipcRenderer.send('upload-files', "sending Files to processing section");
    }
  },
  getTracks: {
    fetchTracks(){
      return ipcRenderer.invoke('getalltracks');
    }
  },
  getFolders: {
    fetchFolders(){
      return ipcRenderer.invoke('getFolders');
    }
  },
  openFile: () => ipcRenderer.invoke('countfiles'),
  getallplaylists:()=>ipcRenderer.invoke('getallplaylists'),
  getplaylists_tracks:(arg)=>ipcRenderer.invoke('getplaylists_tracks',arg),
  readtags:()=>ipcRenderer.invoke('readtags'),
  EditTrack:(trackpath)=>ipcRenderer.invoke('EditTrack',trackpath), 
})
 
