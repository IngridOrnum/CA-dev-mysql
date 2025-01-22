import { findArtistsById, findAllArtists, addArtist } from "../models/artists.js";

export const getAllArtists = async (req, res) => {
    try {
        const allArtists = await findAllArtists();
        res.json(allArtists);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving artists', error: error.message})
    }
}

export const getArtist = async (req, res) => {
    try {
        const artist = await findArtistsById(req.params.id);
        if (!artist) {
            res.status(404).json({ message: 'Artist not found '});
        } else {
         res.json(artist);
        }
    } catch (error) {
        res.status(500).json({message: 'Error retrieving single artist', error: error.message})
    }
}

export const createArtist = async (req, res) => {
    try {
        const newArtist = await addArtist(req.body);
        res.status(201).json({ id: newArtist, ...req.body })
    } catch (error) {
        res.status(500).json({message: 'Error creating artist', error: error.message})
    }
}