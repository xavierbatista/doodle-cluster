const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const path = require('path');
const pool = require('./db');

app.use(cors()); //this must be the first middleware

const fileSizeLimit = '1mb'; //maximum file size that can be received
app.use(express.json({ limit: fileSizeLimit }));
app.use(express.urlencoded({ limit: fileSizeLimit, extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// ACCOUNT ROUTES
app.use('/auth', require('./routes/jwtAuth'));

// CANVAS ROUTES
app.use('/canvas', require('./routes/canvas'));

//USERS RECENT DRAWINGS
app.use('/users-recent-drawings', require('./routes/usersRecentDrawings'));

// OTHER ROUTES
app.use('/still-using-canvas', require('./routes/stillUsingCanvas'));

app.use('/done-using-canvas', require('./routes/doneUsingCanvas'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  'Server is listening on port', PORT;
});
