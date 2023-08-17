import { Router } from "express";
import FilmController from "../controller/FilmController";
import ShowController from "../controller/ShowController";

const Routes = Router({});

Routes.get("/film/:idShow/:videoTitle", FilmController.getIfVideoExist);
Routes.get("/film/:idShow/:videoTitle/video", FilmController.getVideo);
Routes.get("/show", ShowController.index);
Routes.get("/show/:id", ShowController.get);
Routes.get("/show/:id/videos", ShowController.getVideos);
Routes.get("/show/:id/videos/folder", ShowController.getVideosInFolder);
Routes.post("/show/:id/videos", ShowController.postVideos);

export default Routes;