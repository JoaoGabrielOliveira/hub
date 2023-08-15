import express from 'express';
import index from './controller/filmController.js';

const Routes = express.Router();

Routes.get('/film', index)


export default Routes;