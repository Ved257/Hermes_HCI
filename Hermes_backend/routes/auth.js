const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.send('Auth route');
});

router.get('/all', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const data = await User.findOne({ username });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (data) {
      return res.json({ error: 'User already exists' });
    }

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    if (user) {
      res.json(user);
    } else {
      res.json({ error: 'Error creating user' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (username == '' || password == '') {
      return res.json({ error: 'Please enter username and password' });
    }

    const user = await User.findOne({
      username,
    });

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { user: user.username, email: user.email },
        process.env.JWT
      );
      res.json({ user, token });
    } else {
      res.json({ error: 'Error finding user' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/user', async (req, res) => {
  try {
    const usertoken = req.query.token;
    const decoded = jwt.verify(usertoken, process.env.JWT);
    res.json(decoded);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
