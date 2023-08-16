import { Router } from "express";
import FilmController from "./controller/FilmController";

const Routes = Router({});

Routes.get("/", FilmController.index);

export default Routes;