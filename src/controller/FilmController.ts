import { Request, Response } from "express";
import VideoScreamingService from "../service/VideoScreamingService";
import VideoService from "../service/VideoService";
import HttpHelper from "../helper/HttpHelper";
import ShowService from "../service/ShowService";
import { format } from "url";

export default class FilmController {
    static async getIfVideoExist(request: Request, response: Response){
        const {idShow, videoTitle} = request.params;
        const show = await ShowService.getInstance().findById(idShow);
        if(!show)
            return response.status(HttpHelper.NOT_FOUND).send({message: "Show was not found!", data: idShow})
        const video = await VideoService.getInstance().findOneBy({idShow: idShow, title: videoTitle});
        if(!video)
            return response.status(HttpHelper.NOT_FOUND).send({message: "Video was not found!", data: {idShow, videoTitle}})
        
        const pathFile = [show.pathFolder,video.fileName].join('/');
        let urlRedirect = format({
            pathname:request.path + '/video',
            query: {
                path: encodeURI(pathFile)
            }
        });

        response.redirect(urlRedirect);
    }

    static async getVideo(request: Request, response: Response){
        let filepath = decodeURI(request.query.path.toString());
        if(filepath)
        return VideoScreamingService.getInstance().getVideoStream(
            filepath,
            request.headers.range, response);

        response.status(HttpHelper.BAD_REQUEST).send("Filepath has not setted");
    }
}