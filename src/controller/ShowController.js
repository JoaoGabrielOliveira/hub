import { listAllVideos } from '../service/videoCatalogService.js';
import HttpHelper from '../helper/HttpHelper.js';
import { getShow } from '../service/ShowService.js';

export default class ShowController {
    static index(req, res){
        const showFind = getShow(req.params.id);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({});
        
        res.send(listAllVideos(showFind.pathFolder, "S3E{e}"))
    }

    static get(req, res){
        const showFind = getShow(req.params.id);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({});

        const ListVideos = listAllVideos(showFind.pathFolder, "S3E{e}");
        const title = req.params.title;
        
        const findVideo = ListVideos.find(video => {
            return video.title == title;
        });

        if(findVideo)
            res.send({...findVideo, link: "http://192.168.0.108/film"});
        else
            res.status(HttpHelper.NOT_FOULD)
            .send({});
    }


}