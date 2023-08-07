const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { image, movie, review, rating, user_name } = req.body;

    const createdReview = await prisma.review.create({
      data: {
        image,
        movie_or_tv: movie,
        review_text: review,
        rating,
        user_name,
      },
    });

    res.send('SUCCESS');
  } catch (error) {
    res.status(500).send('Error processing the request');
  }
});
module.exports = router;
