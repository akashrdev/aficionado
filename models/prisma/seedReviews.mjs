import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(movie_or_tv, image, review_text, rating, user_name) {
  try {
    const review = await prisma.review.create({
      data: {
        movie_or_tv,
        image,
        review_text,
        rating,
        user_name,
      },
    });

    console.log('review created');
  } catch (error) {
    console.log('error');
  } finally {
    await prisma.$disconnect();
  }
}

main(
  'Cloudy with a Chance of Meatballss',
  'https://image.tmdb.org/t/p/original/iIvtWOkRgzprh6PRPEdnEcwGyM0.jpg',
  'My cousin was in this movie, you guys have to check it out!!',
  4,
  'MeatballMan'
);
