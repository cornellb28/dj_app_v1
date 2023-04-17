const nodeID3 = require('node-id3');
import { getExtension } from "./";

export const createTrackMeta = async (trackpath, options) => {
    try {
        const tags = await nodeID3.read(trackpath, options);

        const imagetag = tags.image != null ? { image: tags.image } : {};

        let defaultList = [
            "title",
            "bpm",
            "contentGroup",
            "genre",
            "remixerArtist",
            "year",
            "publisher",
            "length",
            "composer",
            "artist",
            "size",
            "album",
            "comment",
        ];

        const updatedMeta = addMissingProperties(defaultList, tags, trackpath, imagetag);

        return updatedMeta
    } catch (error) {
        console.error(error);
        return null;

    }
};


function addMissingProperties(properties, obj, location, image) {
    const filename = getExtension(location);
    const imageObj = image;

    // Add filename and imageObj properties to the object
    obj.fileType = filename;
    obj.image = imageObj;
    obj.location = location

    for (let property of properties) {
        if (!obj.hasOwnProperty(property)) {
            obj[property] = `default ${property}`; // Add the missing property with a default value of null
        }
    }
    return obj; // Return the updated object
}
