import { Query } from './index';

const all = async () => Query('SELECT * FROM chirps');

const single = async (id: string) => Query(`select * from chirps where id=${id}`);

const remove = async (id: string) => Query(`delete from chirps where id=${id}`);

const add = async (chirp: {
    userid: string,
    text: string,
    location: string
}) => Query(`insert into chirps (userid, text, location) values(${chirp.userid}, "${chirp.text}", "${chirp.location}")`);

const update = async (id: string, chirp: {text: string}) => Query(`update chirps set text = "${chirp.text}" where id = ${id}`);

export default {
    all,
    single,
    remove,
    add,
    update
};