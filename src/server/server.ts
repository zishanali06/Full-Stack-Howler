import * as path from 'path';
import * as express from 'express';
import apiRouter from './routes';
import chirpRouter from './chirpapiroutes';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let p = path.join(__dirname, '../public');
console.log(p);
app.use(express.static(p));
app.use(chirpRouter);
app.use(apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
