import HttpHelper from '../helper/HttpHelper.js';
import { getShow } from '../service/ShowService.js';
import VideoService from '../service/VideoService.js';

export default class ShowController {
    static videoService = new VideoService();
    static index(req, res){
        const showFind = getShow(req.params.id);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({});
            
        res.send(ShowController.videoService.getVideosAndGiveTitle(showFind.pathFolder, "S3E{e}"))
    }

    static get(req, res){
        const showFind = getShow(req.params.id);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({});

        const ListVideos = ShowController.videoService.getVideosAndGiveTitle(showFind.pathFolder, "S3E{e}");
        const title = req.params.title;
        
        const findVideo = ShowController.videoService.findOneByTitle(title, ListVideos);

        if(findVideo)
            res.send({...findVideo, link: `http://192.168.0.108/film/${showFind.id}/${findVideo.title}`});
        else
            res.status(HttpHelper.NOT_FOULD)
            .send({});
    }


}