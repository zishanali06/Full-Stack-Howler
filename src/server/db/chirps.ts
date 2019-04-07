import { Query } from './index';

const all = async () => Query('SELECT * FROM chirps');

const single = async (id: string) => Query(`select * from chirps where id=${id}`);

const remove = async (id: string) => Query(`delete from chirps where id=${id}`);

const add = async (chirp: {
    userid: string,
    text: string,
    location: string
}) => Query(`insert into chirps (userid, text, location) values(${chirp.userid}, "${chirp.text}", "${chirp.location}")`);

const update = async (id: string, chirp: {
    userid: string,
    text: string,
    location: string
}) => Query(`update chirps set text = "This is working too @starla!" where id = 95`);

export default {
    all,
    single,
    remove,
    add
};