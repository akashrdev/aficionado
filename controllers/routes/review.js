const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    // Do something with the request body (e.g., save to database, process data)
    console.log(req.body);
    const { image, movie, review, rating, user_name } = req.body;

    const createdReview = await prisma.review.create({
      data: {
        image,
        movie_or_tv: movie, // Assuming you have a "movie_or_tv" field in your Review model
        review_text: review, // Assuming you have a "review_text" field in your Review model
        rating, // Assuming you have a "rating" field in your Review model
        user_name,
      },
    });
    // If the request is successfully processed, send a success response
    res.send('SUCCESS');
  } catch (error) {
    // If there's an error during processing, send an error response
    res.status(500).send('Error processing the request');
  }
});
module.exports = router;
