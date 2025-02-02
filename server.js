import mysql from 'mysql2/promise';
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/artists", async (req, res) => {
    try {
        const [artists] = await connection.query(`SELECT * FROM artist ORDER BY id DESC`);
        res.json(artists);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get("/albums", async (req, res) => {
    try {
        const [albums] = await connection.query(`SELECT * FROM album ORDER BY id DESC`);
        res.json(albums);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get("/albums/:id", async (req, res) => {
    const artistId = Number(req.params.id);
    if (!isNaN(artistId)) {
        try {
            const [albums] = await connection.query(
                "SELECT * FROM album WHERE artist_id = ?", [artistId]
            );
                res.json(albums);
        } catch (e) {
            console.error('Server error:', error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).send("Artist ID is not a valid number");
    }
});

app.get("/artists/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!isNaN(id)) {
        try {
            const [result] = await connection.query(
                "SELECT * FROM artist WHERE id=?", [id]
            );
            if (result.length) {
                res.json(result);
            } else {
                res.send("no user found");
            }
        } catch (e) {
            res.status(500).send("Something went wrong");
        }
    } else {
        res.status(400).send("ID is not a valid number");
    }
});


app.post("/create_artist", async (req, res) => {
    const { name, genre, image_url, bio } = req.body;
    try {
        const query = `INSERT INTO artist (name, genre, image_url, bio) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(query, [name, genre, image_url, bio]);
        res.status(201).json({ message: "Artist added successfully", artistId: result.insertId });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post("/create_album", async (req, res) => {
    const { artist_id, title, released, image_url } = req.body;
    try {
        const query = `INSERT INTO album (artist_id, title, released, image_url) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(query, [artist_id, title, released, image_url]);
        res.status(201).json({ message: "Album added successfully", albumId: result.insertId });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
