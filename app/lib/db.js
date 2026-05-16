import mongoose from "mongoose";
import assert from "node:assert";

// caching for local development
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function makeSureDbIsReady() {
  if (cached.conn) {
    return cached.conn;
  }

  const MONGODB_URI = 'mongodb://localhost:27017/yapper';  //process.env.MONGODB_URI;
  assert(
    MONGODB_URI,
    "Please define the MONGODB_URI environment variable inside .env.local"
  );

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}