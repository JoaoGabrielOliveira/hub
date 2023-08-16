import { Request, Response } from "express";
import ShowService from "../service/ShowService";
import VideoService from "../service/VideoService";

export default class ShowController {

    static async index(req: Request, res: Response){
        return res.send(await ShowService.getInstance().find({order: {title: 'ASC'}}));
    }

    static async get(req: Request, res: Response){
        return res.send(await ShowService.getInstance().findById(req.params.id));
    }

    static async getVideos(req: Request, res: Response){
        return res.send(await VideoService.getInstance().findBy({idShow: parseInt(req.params.id)}));
    }
}