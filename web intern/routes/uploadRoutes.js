const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/uploadController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });  // Temporary storage for uploads

router.post('/upload', upload.single('image'), uploadFile);

module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const { uploadFile } = require('../controllers/uploadController');
// const router = express.Router();

// // Set up Multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// // POST route to handle file uploads
// router.post('/', upload.single('image'), uploadFile);

// module.exports = router;