const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('document'), (req, res) => {
  try {
    // Save file metadata to MongoDB if needed
    console.log('Uploaded file:', req.file);
    res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'File upload failed.' });
  }
});

module.exports = router;
