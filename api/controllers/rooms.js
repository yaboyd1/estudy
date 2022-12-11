const express = require('express');
const passport = require('../middlewares/authentication');
const router = express.Router();
const db = require('../models');

const { Room, User, RoomChat } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/room
//    POST   /api/room
//    GET    /api/room/:id
//    DELETE /api/room/
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /room comes from the file ./room.js

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Private
router.get('/', passport.isAuthenticated(), (req, res) => {
  Room.findAll({}).then((allPosts) => res.json(allPosts));
});

// @desc    Create a room and assign the room id to the user
// @route   POST /api/rooms
// @access  Private
router.post('/', passport.isAuthenticated(), (req, res) => {
  let { name } = req.body;
  const path = encodeURI(name);
  Room.create({ name, url: path })
    .then((newRoom) => {
      User.update(
        {
          roomId: newRoom.id,
          role: 'admin',
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(201).json(newRoom);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Room.findByPk(id).then((room) => {
    if (!room) {
      return res.sendStatus(404);
    }

    res.json(room);
  });
});

// @desc    Delete all chats, update user's role and delete the room
// @route   DELETE /api/rooms
// @access  Private
router.delete('/', passport.isAuthenticated(), async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const room = await Room.findByPk(user.roomId);

    if (!room) {
      return res.sendStatus(404);
    }

    await RoomChat.destroy({
      where: {
        roomId: room.id
      }
    });
    
    await User.update(
      {
        role: null
      },
      {
        where: {
          roomId: room.id        
        }
      }
    );

    await room.destroy();

    res.sendStatus(204);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
