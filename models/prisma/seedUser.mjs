import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(name, profilePicture, password) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        profilePicture,
        password,
      },
    });

    console.log('user created');
  } catch (error) {
    console.log('error');
  } finally {
    await prisma.$disconnect();
  }
}

main(
  'PirateGuy200',
  'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/painty-the-pirate-william-gerard.jpg',
  'secret'
);
