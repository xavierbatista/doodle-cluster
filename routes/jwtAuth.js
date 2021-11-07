const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');

router.post('/signup', validInfo, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if username or password exist already
    const checkIfUsernameAlreadyExist = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const checkIfEmailAlreadyExist = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (
      checkIfUsernameAlreadyExist.rows.length !== 0 &&
      checkIfEmailAlreadyExist.rows.length !== 0
    ) {
      return res
        .status(401)
        .json({ message: 'Email and username are already in use' });
    }

    if (checkIfUsernameAlreadyExist.rows.length !== 0) {
      return res.status(401).json({ message: 'Username is already in use' });
    }

    if (checkIfEmailAlreadyExist.rows.length !== 0) {
      return res.status(401).json({ message: 'Email is already in use' });
    }

    //encrypt password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //enter info into database
    const newUser = await pool.query(
      'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
      [username, email, bcryptPassword]
    );

    //generating jwt token

    const userId = newUser.rows[0].user_id;

    const token = jwtGenerator(userId, username);

    res.json({ token, username });
  } catch (error) {
    console.error(error.message);
  }
});

//login route
router.post('/login', validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if email is in the database
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Password or email is incorrect' });
    }

    //check if password matches
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: 'Password or email is incorrect' });
    }

    //give them the jwt token

    const userId = user.rows[0].user_id;
    const username = user.rows[0].username;

    const token = jwtGenerator(userId, username);

    res.json({ token, username });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
