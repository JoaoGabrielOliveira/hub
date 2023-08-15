import HttpHelper from '../helper/HttpHelper.js';
import { getShow } from '../service/ShowService.js';
import getVideoStream from '../service/videoStreamService.js';
import VideoService from '../service/VideoService.js';

export default class FilmController {
    static videoSerivce = new VideoService();

    
    static index(req, res) {
        const showFind = getShow(req.params.idShow);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({error: "Não encontramos o show solicitado"});

        const ListVideos = FilmController.videoSerivce.getVideosAndGiveTitle(showFind.pathFolder, "S3E{e}");
        const findVideo = FilmController.videoSerivce.findOneByTitle(req.params.videoTitle, ListVideos);

        if(!findVideo)
            return res.status(HttpHelper.NOT_FOULD).send({error: "Não encontramos o video desse show"});

        let videoPath = showFind.pathFolder + findVideo.fileName;

        return getVideoStream(
            videoPath,
            req.headers.range, res);
    }
}