import * as express from 'express';
import db from './db';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/chirptest', async (req, res) => {
    try{
        res.json(await db.Chirps.all());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;