const express = require('express');
const passport = require('../middlewares/authentication');
const router = express.Router();
const db = require('../models');
const { Socket } = require("../utils/socket");

const { Room, User, RoomChat } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/room
//    POST   /api/room
//    PUT    /api/room/:id
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
  Room.findAll({}).then((allRooms) => res.json(allRooms));
});

// @desc    Get all users in the room
// @route   GET /api/rooms/:id/users
// @access  Private
router.get('/:id/users', passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const users = await User.findAll({
    attributes: ['username', 'role'],
    where: {
      roomId: id,
    },
    raw: true,
  });
  return res.json(users);
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

// @desc    Enter or leave the room
// @route   PUT /api/rooms/:id
// @access  Private
router.put('/:id', passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const room = await Room.findByPk(id);

  try {
    if (!action || (action !== 'enter' && action !== 'leave')) {
      return res
        .status(400)
        .json({ Error: "Enter the proper action 'enter' or 'leave'" });
    }
    if (!room) {
      return res.sendStatus(404);
    }

    if (action == 'enter') {
      await User.update(
        {
          role: 'participant',
          roomId: id,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      await room.increment( 'numOfUsers' );
      Socket.emit(`user${id}`);
    } else if (action == 'leave') {
      await User.update(
        {
          role: null,
          roomId: null,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
    }
    res.json(room);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @desc    Delete the room and the chats the user is in
// @route   DELETE /api/rooms
// @access  Private
router.delete('/', passport.isAuthenticated(), async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const room = await Room.findByPk(user.roomId);

    if (user.role !== 'admin') {
      return res.status(400).json({ Error: 'The user is not admin' });
    }
    if (!room) {
      return res.sendStatus(404);
    }

    await RoomChat.destroy({
      where: {
        roomId: room.id,
      },
    });

    await User.update(
      {
        role: null,
      },
      {
        where: {
          roomId: room.id,
        },
      }
    );

    await room.destroy();

    res.sendStatus(204);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
