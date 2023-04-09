const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const router = require('./commons/server/expressRoute');
const { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");
const path = require('path');
const fs = require('fs-extra');
const fsPromises = require('fs').promises;

const { isDirectory, scanFiles, isFile, readFoldersData, loadFolders } = require('./helpers');
const isDev = process.env.NODE_DEV === 'development';
const win = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

  // React Devtools
  installExtension(REACT_DEVELOPER_TOOLS).then(name => {
    console.log(`Added extension: ${name}`);
  }).catch(err => console.log(err));

  // Redux Devtools
  installExtension(REDUX_DEVTOOLS).then(name => {
    console.log(`Added extension: ${name}`);
  }).catch(err => console.log(err));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Start Server
  router.listen(4000, () => {
    console.log('Express app listening on port 9000!');
  });
  createWindow;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// User dropped files in
// ipcMain.on("files-dropped", async (event, args) => {
//   console.log(args) //{ name: 'SERATOCOLLECTION', filepath: '/Volumes/MUSIKBUCKET/SERATOCOLLECTION' }
//   let p = args.filepath;
//   const getFiles = await scanFolder(p);
// })

// Grabbing the folder or file path from user
ipcMain.on("upload-files", async (event, args) => {
  console.log(args)
  // lets give them the dialog to choose a folder
  const dialogButton = await dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory", "openFile", "multiSelections"],
  });

  // user selected cancel button to show selection process
  if (dialogButton.canceled) return;

  // I should be looking for an array. here is my options
  const selectedPath = dialogButton?.filePaths;

  // Check if track is folder or file
  // const checkFiles = await isFile(selectedPath);
  const checkFolders = isDirectory(selectedPath)

  // if (checkFiles) {
  //   const processedFiles  = await scanFiles(selectedPath);
  //   console.log(processFiles);
  // }

  if(checkFolders) {
    const processedFolders  = await readFoldersData(selectedPath);
    console.log(processedFolders);
  }
});

ipcMain.handle("getalltracks", async (event) => {
  return await getAllTracks();
});

ipcMain.handle("getFolders", async (event) => {
  return await loadFolders();
});
