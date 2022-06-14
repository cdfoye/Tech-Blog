const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
