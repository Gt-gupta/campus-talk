const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerconfig'); // Import multer config for file upload
const {getPosts , getFriends} = require('../controllers/getController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define the route for creating a post
router.get('/getPosts',authMiddleware , getPosts);
router.get('/getFriends',authMiddleware , getFriends);

module.exports = router;
