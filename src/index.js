import express from "express";
import Routes from "./Routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();
app.use(cors({
    origin: '*'
}));

app.get('/filme', (req, res) => {
    res.contentType('text/html').sendFile(__dirname + "/public/index.html")
});

app.get('/filme/show', (req, res) => {
    res.contentType('text/html').sendFile(__dirname + "/public/show.html")
});

app.use(Routes)

app.listen(80, "0.0.0.0", () => {
    console.log("Running bithces on 3000 port");
})