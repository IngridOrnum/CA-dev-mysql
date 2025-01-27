// const API_BASE_URL = 'https://ca-dev-mysql.onrender.com';
export const API_BASE_URL = 'http://localhost:5050';

// Artist Endpoints
export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    CREATE_ARTIST: `${API_BASE_URL}/create_artist`,
    CREATE_ALBUM: `${API_BASE_URL}/create_album`,
    ARTIST: `${API_BASE_URL}/artists`,
    ALBUM: `${API_BASE_URL}/albums`
};