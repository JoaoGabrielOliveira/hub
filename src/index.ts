import express, { Request, Response } from 'express';

const APP = express()


APP.listen(80, () => {
    console.log("Hello World")
});