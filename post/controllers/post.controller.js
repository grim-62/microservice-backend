const faker = require("@faker-js/faker").faker;
const Post = require("../models/post.model");

// const MONGODB_URI = 'mongodb://localhost:27017/your-db-name';

// const seedDatabase = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log('🔥 Connected to MongoDB');

//     await mongoose.disconnect();
//     console.log('🔌 Disconnected from DB');
//   } catch (err) {
//     console.error('❌ Error seeding DB:', err);
//   }
// };

exports.createPost = async (req, res, next) => {
  try {
    const result = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All posts fetched",
      data: result,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

exports.bulkInsert = async (req, res, next) => {
  try {
    const fakePosts = generateFakePosts(100);

    const result = await Post.insertMany(fakePosts);
    res.status(200).json({
      success: true,
      message: `✅ Inserted ${result.length} posts with images`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Insertion failed...`,
    });
  }
};
