const express = require('express');
const router = express.Router();

// Require your controller functions
const { getAllAlbums, getAlbum, createAlbum, addTrackToAlbum } = require('../controllers/albumController');

// Route to get all albums
router.get('/', getAllAlbums);

// Route to get a single album by ID
router.get('/:id', getAlbum);

// Route to create a new album
router.post('/', createAlbum);

// Route to add tracks to an existing album
router.post('/:id/tracks', addTrackToAlbum);

module.exports = router;
