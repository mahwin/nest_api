const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  // 'recoil',
  // 'axios',
  // 'react',
  // 'next',
  // 'reactRedux',
  // 'reactQuery',
  // 'reactHookForm',
  // 'tailwindcss',
  // 'reactRouter',
  // 'styledComponents',
  //
];

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

async function dbPush() {
  for (let category of categories) {
    const dicObj = require(`../../../../crawler/data/complete-dictionarys/1/db/${category}.json`);
    for (let i = 0; i < dicObj.length; i++) {
      if (i % 100 === 0) {
        sleep(1);
        console.log(i, category);
      }
      const newData = await prisma.vocabulary.create({
        data: {
          ...dicObj[i],
        },
      });
    }
  }
}

dbPush();
