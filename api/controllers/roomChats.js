const express = require('express');
const passport = require('../middlewares/authentication');
const router = express.Router();
const db = require('../models');
const { RoomChat, User } = db;
const { Socket } = require("../utils/socket");

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/room_chats/
//    POST    /api/room_chats/
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /room_chats comes from the file ./roomChats.js

router.get('/', (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      const roomId = user.roomId;
      RoomChat.findAll({ where: { roomId }})
        .then((allChats) => { 
          res.json(allChats); 
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
});

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
    username: user.username,
    ...newRoomChat.dataValues
  });

});

router.get('/:roomId', passport.isAuthenticated(), (req, res) => {
  const { roomId } = req.params;
  RoomChat.findAll({ where: { roomId: roomId } })
    .then((allChats) => { res.json(allChats); });
});

router.put('/:id', passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  MicroPost.findByPk(id).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    mpost.content = req.body.content;
    mpost
      .save()
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete('/:id', passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  MicroPost.findByPk(id).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    mpost.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
