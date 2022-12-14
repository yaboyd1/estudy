const express = require('express');
const router = express.Router();

// Load each controller
const microPostsController = require('./microPosts.js');
const microPostResponsesController = require('./microPostResponses.js');
const authController = require('./auth.js');
const roomController = require('./rooms.js');
const roomChatsController = require('./roomChats.js');
// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/auth', authController);
router.use('/micro_posts', microPostsController);
router.use('/micro_post_responses', microPostResponsesController);
router.use('/rooms', roomController);
router.use('/room_chats', roomChatsController);

module.exports = router;
