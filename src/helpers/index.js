import fs from 'node:fs/promises';
import { promisify } from 'util';
import path from 'path';
import { glob } from "glob";
const nodeID3 = require('node-id3');
import { createTrackMeta } from './createTrackMeta'
//const musicMetadata = require('music-metadata');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Global Option for Nodeid3
const options = {
    onlyRaw: false,
    noRaw: true
}

// Get Extension
export const getExtension = (filename) => {
    return filename.split('.').pop();
}

// File Checker
export const isFile = async (filepaths) => {
    const stats = await Promise.all(filepaths.map((file) => fs.stat(file)));
    return stats.every((stats) => stats.isFile());
  }

// Checks if the path is a Directory
export const isDirectory = (folderPath) => {
    let check = false;
    for (let folder of folderPath) {
        let checkStatus = fs.lstat(folder, (err, stats) => {
            return stats.isDirectory() === false ? false : true;
        })

        if (checkStatus === false) return;
        check = checkStatus;
    }
    return check;
};

// Check if the Track exist in the Database
const checkTrackExists = async (track) => {
    const trackExists = await prisma.track.findUnique({
        where: { location: track },
    });

    if (trackExists) {
        console.log(`Track with location "${track}" exists.`)
        return;
    } else {
        console.log(`Track with location "${track}" does not exist.`)
        return track;
    }
};

const readTags = async (trackpath) => {
    // if the track exist in the db return undefined
    // else return the track that needs to be added
    const newFileToAdd = await checkTrackExists(trackpath);

    // if the file doesn't exist in db, lets check for the tags,
    // If the tags exist and tags all exist continue
    // if the tags are limited, lets create a new tag with all the props
    // write to the file
    // write to the db if the write file was successful
    if (newFileToAdd) {
        const addTrackToDB = await createTrackMeta(newFileToAdd);
        return addTrackToDB;
        // console.log('created file meta and saved to db');
    }
}



// Lets fetch the files from the folder you selected -->  []
export const scanFolder = async (data) => {

    // Scan the Folder for all files
    const scanSelectedFolder = (d) => {
        return new Promise((resolve, reject) => {
            glob(`${d}/**/*.{m4a,mp3}`, (err, files) => {
                resolve(files);
            });
        });
    };

    // Read File MetaData
    const readFileData = async (data) => {
        const nestedFiles = [];
        data.forEach(async filepath => {
            const metadata = await readTags(filepath);
            console.log("metadata", metadata)
            const saveToDB = await SaveFilesToDB(metadata, filepath);
            nestedFiles.push(metadata);
        })
        return nestedFiles;
    }
    const result = await scanSelectedFolder(data); // returns array of paths
    const final = await readFileData(result);
};

export const scannedFiles = async (data) => {
    if(!data || data === undefined) return;

    console.log("data: ", data)
    
    //const readFileAsync = promisify(fs.readFile);

    const readFiles = async (array) => {
        try {
          const fileContents = await Promise.all(array.map((filePath) => fs.readFile(filePath, 'utf8')));
          return fileContents;
        } catch (err) {
          console.error(err);
        }
      };
      
      readFiles(data).then((fileContents) => console.log(fileContents.map(content => content.toString())));
}



// THis function will pull the metadata and create an object for each
const SaveFilesToDB = async (tags, filepath) => {
    try {
        prisma.$connect();
        console.log('.....connecting to DB');

        const saveFile = await prisma.track.create({
            data: {
                location: filepath,
                attributes: {
                    create: [
                        {
                            name: "title",
                            value: tags.title
                        },
                        {
                            name: "year",
                            value: tags.year
                        },
                        {
                            name: "length",
                            value: tags.length
                        },
                        {
                            name: "bpm",
                            value: tags.bpm
                        },
                        {
                            name: 'like',
                            value: false
                        },
                        {
                            name: "pinned",
                            value: false
                        },
                        {
                            name: "initialKey",
                            value: tags.initialKey
                        },
                        {
                            name: "bitrate",
                            value: tags.bitrate
                        },
                        {
                            name: "length",
                            value: tags.length
                        },
                        {
                            name: "album",
                            value: tags.album
                        },
                        {
                            name: "size",
                            value: tags.size
                        },
                        {
                            name: "plays",
                            value: "0"
                        },
                        {
                            name: "fileType",
                            value: tags.fileType
                        }
                    ]
                }
            }
        });
        console.log('end connection DB');
    } catch (error) {
        console.log(error)
        return error;
    }
}


// This is pull all the folders that exist in the Database
export const loadFolders = async () => {
    const categories = {};
    try {
        prisma.$connect();
        const tracks = await prisma.track.findMany();
        tracks.forEach((filePath) => {
            const dirName = path.dirname(filePath.location);

            if (!categories[dirName]) {
                categories[dirName] = [];
            }

            categories[dirName].push(filePath);
        });
        return categories;
    } catch (error) {
        console.log(error)
    }
}

// File Manager Functions
async function movetrack(trackpaths) {
    try {
        var tracks = await prisma.track.findMany({
            where: {
                id: { in: [...trackpaths] },
            }
        })
        if (tracks == null) {
            return false;
        }
        var sd = await dialog.showOpenDialog(win, {
            properties: ['openDirectory']
        })
        if (sd.canceled | sd.filePaths.length <= 0) {
            return false;
        }

        for (let p of tracks) {
            const filename = path.basename(trackpath);
            const newfilepath = path.join(sd.filePaths[0], filename)
            await fs.move(trackpath, newfilepath, { overwrite: true }, (error) => {
                if (error) {
                    return false;
                }
            });
            await prisma.track.update({
                where: {
                    id: track.id,
                },
                data: {
                    location: newfilepath,
                }
            })
            return true;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}


async function updateMetaData(tags, trackpath) {
    // write new tags to file
    const success = nodeID3.write(tags, trackpath);
    // write tags to DB
    prisma.$connect();
    const dbwrite = await prisma.track.create({
        data: {
            createdAt: tags.createdAt,
            title: tags.title,
            bpm: tags.bpm,
            artists: tags.artist,
            album: tags.album,
            initialKey: tags.initialKey,
            year: tags.year,
            comment: tags.comment,
            bitrate: tags.bitrate,
            updateDate: new Date().toISOString(),
            contentGroups: tags.contentGroup,
            pinned: tags.pinned,
            like: tags.like,
            genres: tags.genre,
            composers: tags.composer,
            remixArtists: tags.remixArtist,
            moods: tags.mood,
            timings: tags.timing,
            location: trackpath,
            plays: tags.plays
        },

    })
    prisma.$disconnect();
    console.log("success", success)
    return success;

}
