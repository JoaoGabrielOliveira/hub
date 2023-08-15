import fs from 'fs';
import { isFileAVideo } from '../helper/ExtensionFileHelper.js';
import Video from '../model/Video.js';

var index_id_example = 0;

function listAllVideos(path, stringFormat = "{e}"){
    let internalIndex = 0;
    return getAllVideosOfAPath(path).map(file => {
        return new Video(index_id_example++, 3, file.name, stringFormat.replace("{e}", internalIndex), internalIndex++)
    });    
}

function getAllVideosOfAPath(path){
    return fs.readdirSync(path, {withFileTypes:true})
    .filter(file => isFileAVideo(file.name));
}

console.log(
    listAllVideos("J:/Downloads/Como Eu Conheci Sua Mãe 2007 - 3ª Temporada Completa [WEB-DL] WWW.BLUDV.COM/", "S3E{e}")
)

