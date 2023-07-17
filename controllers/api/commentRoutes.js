const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Use withAuth middleware to prevent unauthorized access to create comment
router.post('/', withAuth, async (req, res) => {
  try {
    // console.log("vvvvvvvvvvvvvvvvvvvvvv");
    // console.log(req.body);
    // console.log("^^^^^^^^^^^^^^^^^^^^^^");

    const username = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
    });

    // console.log(username.name);

    const newComment = await Comment.create({
      ...req.body,
      // user_id: req.session.user_id,
      // blog_id: 
      poster: username.name
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
