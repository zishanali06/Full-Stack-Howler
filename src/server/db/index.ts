import * as mysql from 'mysql';
import Chirps from './chirps';

export const Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'zishan',
    password: 'testing123',
    database: 'chirpr'
});

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