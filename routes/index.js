const express = require('express');
const router = express.Router();

// Route to serve the homepage
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './views' });
});

// Route to serve the admin page
router.get('/admin', (req, res) => {
    res.sendFile('admin.html', { root: './views' });
});

module.exports = router;
