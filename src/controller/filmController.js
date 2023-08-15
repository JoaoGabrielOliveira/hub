import HttpHelper from '../helper/HttpHelper.js';
import getVideoStream from '../service/videoStreamService.js';

export default class FilmController {
    videoSerivce;
    showService;

    constructor(videoService, showService){
        this.videoService = videoService;
        this.showService = showService;
    }
    
    index(req, res) {
        const showFind = this.showService.getShow(req.params.idShow);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({error: "Não encontramos o show solicitado"});

        const ListVideos = this.videoSerivce.getVideosAndGiveTitle(showFind.pathFolder, "S3E{e}");
        const findVideo = this.videoSerivce.findOneByTitle(req.params.videoTitle, ListVideos);

        if(!findVideo)
            return res.status(HttpHelper.NOT_FOULD).send({error: "Não encontramos o video desse show"});

        let videoPath = showFind.pathFolder + findVideo.fileName;

        return getVideoStream(
            videoPath,
            req.headers.range, res);
    }
}