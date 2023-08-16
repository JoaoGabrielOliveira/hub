import { Request, Response } from "express";

export default class FilmController {

    static index(request: Request, response: Response ){
        response.send("Hello World");
    }
}