const express = require('express');
const app = express();
const path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
const PORT = 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const feedRoute = require('./routes/feed');
const reviewRoute = require('./routes/review');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
app.use('/feed', feedRoute);
app.use('/review', reviewRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('Server running');
});

module.exports = app;
