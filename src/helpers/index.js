import fs from 'node:fs/promises';
import path from 'path';
import { glob } from "glob";
import _ from 'lodash';
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
    // Lets ceck to see if the uploaded file exist in the database already
    const trackExists = await prisma.track.findUnique({
        where: { location: track },
    });

    // If The track exist......
    // Do not return 
    if (trackExists) {
        //console.log(`Track with location "${track}" exists.`)
        return;
    } else {
        // track doesnt exist so lets return back for more work
        //console.log(`Track with location "${track}" does not exist.`)
        return track;
    }
};
// Scan the Folder for all files
const scanSelectedFolder = (d) => {
    return new Promise((resolve, reject) => {
        glob(`${d}/**/*.{m4a,mp3}`, (err, files) => {
            resolve(files);
        });
    });
};
// // Read File MetaData
const designMetaTags = async (data) => {

    const metadataPromises = data.map(readTags);
    const results = await Promise.allSettled(metadataPromises);
    const fulfilledResults = results.filter(result => result.status === 'fulfilled');
    const values = fulfilledResults.map(result => result.value);
    return values
}

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
        // Get the MetaData for the track
        const updatedTrackMeta = await createTrackMeta(newFileToAdd, options);
        return updatedTrackMeta;
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

// Lets fetch the files from the folder you selected -->  []
// We want to return all the files we found
export const readFoldersData = async (folderData) => {
    let totalList = []
    let result = [];

    for (let folder of folderData) {
        const scanDirectory = await scanSelectedFolder(folder);
        for (let file of scanDirectory) {
            totalList.push(file);
        }
    }
    const getMetaData = await designMetaTags(totalList);
    result = getMetaData;
    return result
};

export const scanFiles = async (tracks) => {
    for (let track of tracks) {
        console.log(track)
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



// THis function will pull the metadata and create an object for each
export const SaveFilesToDB = async (items) => {
    console.log(items)
    try {
        prisma.$connect();
        console.log('.....connecting to DB');

        // Create a new track
        const addTracks = await prisma.track.createMany({
            data: items.map(item => ({
                location: item.location,
                trackAttributes: {
                    create: [
                        {
                            name: "bpm",
                            value: item.bpm
                        },
                        {
                            name: "size",
                            value: item.size
                        },
                        {
                            name: "contentGroup",
                            value: item.contentGroup
                        },
                        {
                            name: "year",
                            value: item.year
                        },
                        {
                            name: "genre",
                            value: item.genre
                        }
                    ]
                }
            })),
            include: {
                trackAttributes: true
            }
        })
        console.log('end connection DB');
    } catch (error) {
        console.log(error)
        return error;
    } finally {
        await prisma.$disconnect();
    }
}