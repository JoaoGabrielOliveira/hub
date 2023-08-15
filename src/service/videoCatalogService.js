import fs from 'fs';
import { isFileAVideo } from '../helper/ExtensionFileHelper.js';
import Video from '../model/Video.js';

var index_id_example = 0;

export function listAllVideos(path, stringFormat = "{e}"){
    let internalIndex = 1;
    return getAllVideosOfAPath(path).map(file => {
        return new Video(index_id_example++, 3, file.name, stringFormat.replace("{e}", internalIndex), internalIndex++)
    });    
}

export function getAllVideosOfAPath(path){
    return fs.readdirSync(path, {withFileTypes:true})
    .filter(file => isFileAVideo(file.name));
}