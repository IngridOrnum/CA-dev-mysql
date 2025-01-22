import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection ({
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
    const [result] = await connection.query("SELECT * FROM artists");
    res.json(result);
});

app.listen(port, () => {
    console.log("Server started on port 5050");
});
