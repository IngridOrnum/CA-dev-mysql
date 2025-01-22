import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_USER); // This should output 'root' or your database username
console.log(process.env.DB_PASSWORD); // This should output 'JnreTkn345NKn23' or your actual password


import express from 'express';
import cors from 'cors';
import artistRoutes from './routes/artists.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use the artists routes
app.use('/artists', artistRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
