// test-connection.ts
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('DATABASE_URI:', process.env.DATABASE_URI);
async function testConnection() {
  const dbUri = 'mongodb://localhost:27017/backend-user-registration';
  console.log(`Connecting to MongoDB at: ${dbUri}`);
  try {
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
