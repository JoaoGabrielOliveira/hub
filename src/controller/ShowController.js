import HttpHelper from '../helper/HttpHelper.js';

export default class ShowController {
    videoService;
    showService;

    constructor(videoService, showService){
        this.videoService = videoService;
        this.showService = showService;
    }

    index(req, res){
        return res.send(this.showService.getAllShow());
    }

    get(req, res){
        const showFind = this.showService.getShow(req.params.id);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({});
            
        res.send(this.videoService.getVideosAndGiveTitle(showFind.pathFolder, "S3E{e}")
            .map(video => {
                return {...video, link: `http://192.168.0.108/film/${showFind.id}/${video.title}`}
            }));
    }

    getVideos(req, res){
        const showFind =this.showService.getShow(req.params.id);
        if(!showFind)
            return res.status(HttpHelper.NOT_FOULD).send({});

        const ListVideos = this.videoService.getVideosAndGiveTitle(showFind.pathFolder, "S3E{e}");
        const title = req.params.title;
        
        const findVideo = this.videoService.findOneByTitle(title, ListVideos);

        if(findVideo)
            res.send({...findVideo, link: `http://192.168.0.108/film/${showFind.id}/${findVideo.title}`});
        else
            res.status(HttpHelper.NOT_FOULD)
            .send({});
    }


}