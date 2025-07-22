const mongoose = require('mongoose');
const faker = require('@faker-js/faker').faker;
const Post = require('../models/post.model'); // adjust path if needed

const MONGODB_URI = 'mongodb://localhost:27017/your-db-name'; // replace with your DB name

const generateFakePosts = (count = 100) => {
  const posts = [];

  for (let i = 0; i < count; i++) {
    posts.push({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      author: faker.internet.userName(),
      image: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
      createdAt: faker.date.recent(30),
    });
  }

  return posts;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🔥 Connected to MongoDB');

    const fakePosts = generateFakePosts(100);

    const result = await Post.insertMany(fakePosts);
    console.log(`✅ Inserted ${result.length} posts with images`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from DB');
  } catch (err) {
    console.error('❌ Error seeding DB:', err);
  }
};

module.exports = seedDatabase;
