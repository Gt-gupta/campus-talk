const express = require('express');
const { createPost , createPoll , createFriend } = require('../controllers/postController'); // Import the controller
const router = express.Router();
const upload = require('../middlewares/multerconfig'); // Import multer config for file upload
const authMiddleware = require('../middlewares/authMiddleware');

// Define the route for creating a post
router.post('/createPost', authMiddleware, upload.single('image'), createPost);
router.post('/createPoll',authMiddleware,createPoll);
router.post('/createFriend',authMiddleware,createFriend);

module.exports = router;
