import * as express from 'express';
import db from './db';
import { io } from './server';
const chirpRouter = express.Router();

chirpRouter.get("/api/chirp/:id?", async (req, res) =>{
    let id: string = req.params.id;
    if(id) {
        try{
            res.json(await db.Chirps.single(id));
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        };
    } else {
        try{
            res.json(await db.Chirps.all());
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        };
    };
});

//creating a chirp
chirpRouter.post("/api/chirp/", async (req, res) => {
    try{
        await db.Chirps.add(req.body);
        io.emit('newChirp');
        res.json(await db.Chirps.all());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    };
});

//changing a chirp
chirpRouter.put("/api/chirp/:id", async (req, res) => {
    try{
        await db.Chirps.update(req.params.id, req.body);
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    };
    console.log(`${req.params.id} is the id and ${JSON.stringify(req.body)} is the body`);
});

//deleting a chirp
chirpRouter.delete("/api/chirp/:id", async (req, res) => {
    try{
        await db.Chirps.remove(req.params.id);
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    };
});

export default chirpRouter;