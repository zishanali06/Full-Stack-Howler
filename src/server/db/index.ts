import * as mysql from 'mysql';
import Chirps from './chirps';
import config from '../config';

export const Connection = mysql.createConnection(config.mysql);

export const Query = (query: string, values?: Array<number | string>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if(err) console.log(err);
            return resolve(results);
        });
    });
};

export default {
    Chirps
};