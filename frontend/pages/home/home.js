import {API_ENDPOINTS} from "../../../api/api.js";

async function fetchArtists() {
    try {
        const response = await fetch(API_ENDPOINTS.ARTIST);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Could not fetch artists:', error);
        return [];
    }
}

function createArtistCard(artist) {
    return `
        <div class="artist-card flex flex-col items-center gap-2">
            <img class="w-52 h-52 object-cover" src="${artist.image_url}" alt="${artist.name}">
            <h3>${artist.name}</h3>
        </div>
    `
}

async function displayArtists () {
    const artists = await fetchArtists();
    const artistsHtml = artists.map(createArtistCard).join('');
    document.querySelector('.latest-container').innerHTML = artistsHtml;
}

document.addEventListener('DOMContentLoaded', displayArtists);

