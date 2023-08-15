import express from 'express';
import index from './controller/filmController.js';
import ShowController from './controller/ShowController.js'

const Routes = express.Router();

Routes.get('/film', index);
Routes.get('/show/:id/videos', ShowController.index);
Routes.get('/show/:id/videos/:title', ShowController.get);
//Routes.get('', (req, res) => {})

export default Routes;