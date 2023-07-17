const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a blog by a specific username
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        Comment,
      ],
    });

    // console.log(blogData);

    const blog = blogData.get({ plain: true });
    // console.log('vvvvvvvvvvvvvvvvvvvvvvv');
    // console.log(blog);
    // console.log('^^^^^^^^^^^^^^^^^^^^^^');

    let myBlogPost = false;
    if (req.session.user_id == blog.user_id) {
      myBlogPost = true;
    }

    res.render('blog', {
      ...blog,
      my_blog_post: myBlogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create route for updating a blog entry
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        Comment,
      ],
    });

    // console.log(blogData);

    const blog = blogData.get({ plain: true });
    // console.log('vvvvvvvvvvvvvvvvvvvvvvv');
    // console.log(blog);
    // console.log('^^^^^^^^^^^^^^^^^^^^^^');

    let myBlogPost = false;
    if (req.session.user_id == blog.user_id) {
      myBlogPost = true;
    }

    res.render('update', {
      ...blog,
      my_blog_post: myBlogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent unauthorized access to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent unauthorized access to blog creation
router.get('/create', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('create', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
