import { fetchArtists } from "../home/home.js";
import {API_ENDPOINTS} from "../../../api/api.js";

async function fetchAlbumsForArtist(artistId) {
    try {
        const response = await fetch(`${API_ENDPOINTS.ALBUM}/${artistId}`); // Use the API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Could not fetch albums:', error);
        return [];
    }
}

function createAlbumCard(album) {
    return `
        <div class="album-card">
            <img src="${album.image_url}" alt="${album.title}" style="width: 100px; height: 100px;">
            <div>${album.title}</div>
            <div>Released: ${album.released}</div>
        </div>
    `;
}


async function displayArtistAndAlbums () {
    const artistId = localStorage.getItem('artistId');

    if (!artistId) {
        console.error('No artist id found');
        return;
    }

    const artistContainer = document.querySelector('.artist-container');
    const albumsContainer = document.querySelector('.albums-container');

    const artistData = await fetchArtists(artistId);
    console.log('Artist data:', artistData);

    if (artistData.length > 0) {
        const artist = artistData[0];
        const artistHtml = `
            <div class="artist-detail-card">
                <img src="${artist.image_url}" alt="${artist.name}" class="w-52 h-52 object-cover">
                <h2>${artist.name}</h2>
                <p>${artist.bio}</p>
            </div>
        `;
        artistContainer.innerHTML = artistHtml;

        const albums = await fetchAlbumsForArtist(artistId);
        if (albums.length > 0) {
            const albumsHtml = albums.map(createAlbumCard).join('');
            albumsContainer.innerHTML = albumsHtml;
        } else {
            albumsContainer.innerHTML = '<p>No albums found for this artist.</p>';
        }
    } else {
        console.error('Artist data not found');
        artistContainer.innerHTML = '<p>Artist data not found.</p>'
    }
}

document.addEventListener('DOMContentLoaded', displayArtistAndAlbums);