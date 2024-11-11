import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

async function main() {
  for (let index = 0; index < 40; index++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        address: String(faker.location.state()),
        zipCode: faker.location.zipCode(),
        barthDate: new Date(),
        age: faker.number.int({ min: 0, max: 100 }),
        sex: getRandomElement(['MALE', 'FEMALE']),
        blood: getRandomElement(['A', 'B', 'AB', 'O']),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// posts: {
// createMany: {
//   data: [
//     {
//       title: faker.name.jobTitle(),
//     },
//   ],
