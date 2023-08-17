import express from 'express'
import Routes from './Router';
import cors from 'cors';

const ExpressServer = express();
ExpressServer.use(cors({
    origin: '*'
}))
ExpressServer.use(express.json())
ExpressServer.use( Routes);

export default ExpressServer;