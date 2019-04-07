import * as express from 'express';
import * as chirpStore from './chirpstore';
import db from './db';
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
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    };
    console.log(req.body);
});

chirpRouter.put("/api/chirp/:id", (req, res) => {
    chirpStore.UpdateChirp(req.params.id, req.body);
    res.sendStatus(200);
});

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