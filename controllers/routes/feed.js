const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    const usernames = reviews.map((review) => review.user_name);

    const users = await prisma.user.findMany({
      where: {
        name: { in: usernames },
      },
      select: {
        name: true,
        profilePicture: true,
      },
    });

    const reviewsWithProfilePictures = reviews.map((review) => {
      const user = users.find((user) => user.name === review.user_name);
      return {
        ...review,
        userProfilePicture: user ? user.profilePicture : null,
      };
    });

    return res.json(reviewsWithProfilePictures);
  } catch (error) {
    console.log('Error fetching reviews for feed:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
