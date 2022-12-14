const express = require('express');
const passport = require('../middlewares/authentication');
const { Sequelize } = require('../models');
const router = express.Router();
const db = require('../models');
const { RoomChat, User } = db;
const { Socket } = require("../utils/socket");

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    POST    /api/room_chats/
//    GET     /api/room_chats/:roomId
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /room_chats comes from the file ./roomChats.js

// @desc    Post a chat, given roomId and userId
// @route   POST /api/room_chats
// @access  Private
router.post('/', passport.isAuthenticated(), async (req, res) => {
  const { message } = req.body;
  const user = await User.findByPk(req.user.id);
  const roomId = user.roomId;
  const newRoomChat = await RoomChat.create({
    message: message,
    userId: req.user.id,
    roomId: roomId
  });

  res.status(201).json(newRoomChat);
  Socket.emit(`chat${roomId}`, {
    User: {
      username: user.username
    },
    ...newRoomChat.dataValues
  });

});

// @desc    Get all chats in the room
// @route   Get /api/room_chats/:roomId
// @access  Private
router.get('/:roomId', passport.isAuthenticated(), (req, res) => {
  const { roomId } = req.params;
  RoomChat.findAll({ 
    where: { 
      roomId: roomId 
    },
    include: {
      model: User,
      attributes: ['username']
    }
  })
    .then((allChats) => { 
      res.json(JSON.stringify(allChats, null, 2)); 
    })
    .catch((err) => { res.status(400).json(err); });
});


module.exports = router;
