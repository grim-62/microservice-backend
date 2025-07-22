const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoHost = process.env.DB_HOST || 'mongodb';
  const dbName = process.env.DB_NAME || 'your-db-name';

  const uri = `mongodb://${mongoHost}:27017/${dbName}`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
