import express from 'express';
const router = express.Router();

// Import controller functions
import { getAllArtists, getArtist, createArtist } from '../controllers/artistController.js';

// Route to test artists endpoint
router.get('/test', (req, res) => {
    res.send('Artists Endpoint');
});

// Route to get all artists
router.get('/', getAllArtists);

// Route to get a single artist by ID
router.get('/:id', getArtist);

// Route to create a new artist
router.post('/', createArtist);

export default router;
