const albumModel = require('../models/album');

exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await albumModel.findAllAlbums();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving albums', error: error.message });
    }
};

exports.getAlbum = async (req, res) => {
    try {
        const album = await albumModel.findAlbumById(req.params.id);
        if (!album) {
            res.status(404).json({ message: 'Album not found' });
        } else {
            res.json(album);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving album', error: error.message });
    }
};

exports.createAlbum = async (req, res) => {
    try {
        const newAlbumId = await albumModel.addAlbum(req.body);
        res.status(201).json({ id: newAlbumId, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};