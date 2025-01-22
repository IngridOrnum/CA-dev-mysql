import db from '../db/db.js';

export const findAllArtists = async () => {
    const [artists] = await db.query(`SELECT * FROM artists`);
    return artists;
};

export const findArtistsById = async (id) => {
    const [artist] = await db.query(`SELECT * FROM artists WHERE id = ?`, [id]);
    return artist[0];
}

export const addArtist = async (artistData) => {
    const result = await db.query(`INSERT INTO artists SET ?`, [artistData]);
    return result.insertId;
}

