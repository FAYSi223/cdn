const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage });
app.get('/info', (req, res) => {
    res.json({
        service: 'Free CDN Service',
        description: 'Host static files for free and use them in your projects!',
        example: {
            css: '/static/css/styles.css',
            js: '/static/js/script.js',
            uploadedFile: '/uploads/{filename}'
        }
    });
});
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded!' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
        message: 'File uploaded successfully!',
        fileUrl: `${req.protocol}://${req.get('host')}${fileUrl}`
    });
});
app.use((req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app;
