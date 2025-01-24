import mysql from 'mysql2/promise';
import express from "express";
import cors from "cors";

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
        res.json(artists);  // This will automatically set Content-Type to application/json
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ error: error.message });
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
