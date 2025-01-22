const db = require('../db/db');

exports.findAllAlbums = async () => {
    const [albums] = await db.query(`
        SELECT albums.*, artists.name AS artist_name 
        FROM albums 
        JOIN artists ON albums.artist_id = artists.id
    `);
    return albums;
};

exports.findAlbumsById = async (id) => {
    const [album] = await db.query(`
        SELECT albums.*, artists.name AS artist_name 
        FROM albums 
        JOIN artists ON albums.artist_id = artists.id
        WHERE albums.id = ?
    `, [id]);
    return album[0];
};

exports.addAlbum = async (albumData) => {
    const {title, artist_id, release_year, image_url} = albumData;
    const result = await db.query(`
        INSERT INTO albums (title, artist_id, release_year, image_url) 
        VALUES (?, ?, ?, ?)
        `, [title, artist_id, release_year, image_url]);
    return result.insertId;
};