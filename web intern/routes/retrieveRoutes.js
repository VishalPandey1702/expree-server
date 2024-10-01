const express = require('express');
const { retrieveFile } = require('../controllers/retrieveController');
const router = express.Router();

router.get('/file/:key', retrieveFile);

module.exports = router;