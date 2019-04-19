import * as path from 'path';
import * as express from 'express';
import apiRouter from './routes';
import chirpRouter from './chirpapiroutes';
import * as SocketIO from 'socket.io';
import * as http from 'http';

const app = express();

const server = new http.Server(app);
export const io = SocketIO(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
io.on('connection', socket => {
    console.log(`User\x1b[34m ${socket.id}\x1b[0m has \x1b[32mconnected!\x1b[0m`);
    socket.on('disconnect', () => console.log(`User\x1b[34m ${socket.id}\x1b[0m has \x1b[31mdisconnected!\x1b[0m`));
});

let p = path.join(__dirname, '../public');
console.log(p);
app.use(express.static(p));
app.use(chirpRouter);
app.use(apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server listening on port: \x1b[33m${port}\x1b[0m`));
