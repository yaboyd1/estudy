const express = require('express');
const passport = require('../middlewares/authentication');
const router = express.Router();
const db = require('../models');
const { MicroPostResponse, User } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/micro_post_responses
//    POST   /api/micro_post_responses
//    GET    /api/micro_post_responses/:id
//    PUT    /api/micro_post_responses/:id
//    DELETE /api/micro_post_responses/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /micro_posts comes from the file ./microPosts.js

router.get('/', passport.isAuthenticated(), (req, res) => {
  MicroPostResponse.findAll({
    include: {
      model: User,
      attributes: ['username'],
    },
  }).then((allPosts) => res.json(allPosts));
});

router.post('/', passport.isAuthenticated(), (req, res) => {
  let { content, microPostId } = req.body;

  MicroPostResponse.create({
    userId: req.user.id,
    content: content,
    microPostId: microPostId,
  })
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/:id', passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;

  MicroPostResponse.findAll({
    where: {
      microPostId: id,
    },
    include: {
      model: User,
      attributes: ['username'],
    },
  }).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    res.json(mpost);
  });
});

router.put('/:id', passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  MicroPostResponse.findByPk(id).then((mpost) => {
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
  MicroPostResponse.findByPk(id).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    mpost.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
