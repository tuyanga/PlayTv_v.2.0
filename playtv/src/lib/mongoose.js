import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI_TWO;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}