const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const prisma = req.prisma;

    const newUser = await prisma.user.create({
      data: {
        name,
        profilePicture,
        password,
      },
    });

    res.send('User created successfully');
  } catch (error) {
    res.send('ERROR CREATING USER');
  }
});
module.exports = router;
