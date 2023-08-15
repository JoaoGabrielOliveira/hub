import express from 'express';
import FilmController from './controller/FilmController.js';
import ShowController from './controller/ShowController.js';

import ShowService from './service/ShowService.js';
import VideoService from './service/VideoService.js';

const Routes = express.Router();

const SHOW_SERVICE = new ShowService();
const VIDEO_SERVICE = new VideoService();

let filmController = new FilmController(VIDEO_SERVICE, SHOW_SERVICE);
let showController = new ShowController(VIDEO_SERVICE, SHOW_SERVICE);

Routes.get('/film/:idShow/:videoTitle', (req, res) => filmController.index(req, res));
Routes.get('/show', (req, res) => showController.index(req, res));
Routes.get('/show/:id/videos', (req, res) => showController.get(req, res));
Routes.get('/show/:id/videos/:title', (req, res) => showController.getVideos(req, res));

export default Routes;