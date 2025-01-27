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

async function fetchAlbums() {
    try {
        const response = await fetch(API_ENDPOINTS.ALBUM);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Could not fetch albums:', error);
        return [];
    }
}

function createArtistCard(artist) {
    return `
        <div class="artist-card flex flex-col items-center gap-2">
            <img class="w-52 h-52 object-cover" src="${artist.image_url}" alt="${artist.name}">
            <div class="cursor-pointer border border-secondary-gray p-2 hover:bg-primary-white hover:text-primary-black w-full flex justify-center items-center">${artist.name}</div>
        </div>
    `
}

function createAlbumCard(album) {
    return `
        <div class="album-card flex flex-col items-center gap-2">
            <img class="w-52 h-52 object-cover" src="${album.image_url}" alt="${album.title}">
            <div class="cursor-pointer border border-secondary-gray p-2 hover:bg-primary-white hover:text-primary-black w-full flex justify-center items-center">${album.title}</div>
        </div>
    `
}

async function displayArtists () {
    const artists = await fetchArtists();
    const latestFiveArtists = artists.slice(0, 5);
    const artistsHtml = latestFiveArtists.map(createArtistCard).join('');
    document.querySelector('.latest-container').innerHTML = artistsHtml;
}

async function displayAllArtists () {
    const artists = await fetchArtists();
    const artistsHtml = artists.map(createArtistCard).join('');
    document.querySelector('.all-artists-container').innerHTML = artistsHtml;
}

async function displayAllAlbums () {
    const albums = await fetchAlbums();
    const albumsHtml = albums.map(createAlbumCard).join('');
    document.querySelector('.all-albums-container').innerHTML = albumsHtml;
}

document.addEventListener('DOMContentLoaded', () => {
    displayArtists();
    displayAllArtists();
    displayAllAlbums();
});

