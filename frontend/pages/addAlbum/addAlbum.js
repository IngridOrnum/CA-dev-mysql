import {API_ENDPOINTS} from "../../../api/api.js";

async function loadArtists () {
    try {
        const response = await fetch(API_ENDPOINTS.ARTIST);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Expected JSON response but received:', contentType);
        }
        const artists = await response.json();
        const select = document.querySelector('#artist_id');
        artists.forEach(artist => {
            let option = new Option(artist.name, artist.id);
            select.add(option);
        });
    } catch (error) {
        console.error('Failed to load artists:', error);
    }
}

window.addEventListener('DOMContentLoaded', loadArtists);

document.querySelector('.add-album-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const artist = document.querySelector('#artist_id').value;
    const title = document.querySelector('#title').value;
    const released = document.querySelector('#released').value;
    const imgUrl = document.querySelector('#img-url').value;

    const body = {
        artist_id: artist,
        title: title,
        released: released,
        image_url: imgUrl,
    };

    const res = await fetch(API_ENDPOINTS.CREATE_ALBUM, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
});