const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  let name = req.body.username;
  let password = req.body.password;

  try {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    } else if (password !== user.password) {
      return res.status(401).json({ error: 'Incorrect password!' });
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.log('Sign-In Error');
    return res.status(500).json({ error: 'Sign in error' });
  }
});

module.exports = router;
