import { Request, Response } from "express";
import ShowService from "../service/ShowService";
import VideoService from "../service/VideoService";
import HttpHelper from "../helper/HttpHelper";

export default class ShowController {

    static async index(req: Request, res: Response){
        return res.send(await ShowService.getInstance().find({order: {title: 'ASC'}}));
    }

    static async get(req: Request, res: Response){
        return res.send(await ShowService.getInstance().findById(req.params.id));
    }

    static async getVideos(req: Request, res: Response){
        const videos = await VideoService.getInstance().findBy({idShow: parseInt(req.params.id)})
        return res.send((videos).map(video => { return {...video, link: `http://${req.hostname}/film/${video.idShow}/${video.title}`}}));
    }

    static async getVideosInFolder(req: Request, res: Response){
        const show = await ShowService.getInstance().findById(req.params.id);
            
        if(!show)
            return res.status(HttpHelper.NOT_FOUND).send({})

        return res.send(VideoService.getInstance().findAllVideoInFolderShow(show, "S3E{e}"));
    }

    static async postVideos(req: Request, res: Response){
        const show = await ShowService.getInstance().findById(req.params.id);
            
        if(!show)
            return res.status(HttpHelper.NOT_FOUND).send({})

        return res.send(VideoService.getInstance().createVideosByShow(show, "S3E{e}"));
    }
}