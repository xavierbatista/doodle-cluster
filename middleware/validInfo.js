//checks that the user sent a username, password, and email, they are all valid info, and they don't exceed the character limits (max 255 characters for email and password. max 20 characters for username).
module.exports = (req, res, next) => {
  const { email, username, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/signup') {
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    } else if (
      email.length > 255 ||
      password.length > 255 ||
      username.length > 20
    ) {
      return res.json('Credentials exceed character limit');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  }

  next();
};
