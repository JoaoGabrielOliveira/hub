import { Router } from "express";
import FilmController from "../controller/FilmController";
import ShowController from "../controller/ShowController";

const Routes = Router({});

Routes.get("/", FilmController.index);
Routes.get("/show", ShowController.index);
Routes.get("/show/:id", ShowController.get);

export default Routes;