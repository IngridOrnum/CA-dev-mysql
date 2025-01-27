import {API_ENDPOINTS} from "../../../api/api.js";

export async function fetchArtists(artistId = '') {
    try {
        let url = API_ENDPOINTS.ARTIST;
        if (artistId) {
            url += `/${artistId}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Artist data received:', data); // Log the data to see what is being returned
        return data;
    } catch (error) {
        console.error(`Could not fetch artists: ${artistId ? artistId : ''}`, error);
        return [];
    }
}

export async function fetchAlbums() {
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
            <div class="artist-btn cursor-pointer border border-secondary-gray p-2 hover:bg-primary-white hover:text-primary-black w-full flex justify-center items-center" data-artist-id="${artist.id}">${artist.name}</div>
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
    const container = document.querySelector('.latest-container');
    container.innerHTML = artistsHtml;
    addArtistClickListeners(container);
}

async function displayAllArtists () {
    const artists = await fetchArtists();
    const artistsHtml = artists.map(createArtistCard).join('');
    const container = document.querySelector('.all-artists-container');
    container.innerHTML = artistsHtml;
    addArtistClickListeners(container);
}

async function addArtistClickListeners (container) {
    container.addEventListener('click', function (event) {
        const artistBtn = event.target.closest('.artist-btn');
        if (artistBtn) {
            const artistId = artistBtn.dataset.artistId;
            localStorage.setItem('artistId', artistId);
            window.location.href = '../artist/';
        }
    });
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

