import {API_ENDPOINTS} from "../../../api/api.js";

document.querySelector('.add-artist-form').addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const genre = document.querySelector('#genre').value;
    const imgUrl = document.querySelector('#img-url').value;
    const bio = document.querySelector('#bio').value;

    const body = {
        name: name,
        genre: genre,
        image_url: imgUrl,
        bio: bio
    };

    const res = await fetch(API_ENDPOINTS.CREATE_ARTIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    if (res.ok) {
        const data = await  res.json();
        console.log(data);
        alert('Artist added successfully!');
        window.location.reload();
    } else {
        throw new Error('Failed to create artist');
    }
    const data = await res.json();
    console.log(data);
});