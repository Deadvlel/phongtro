import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: any;
    promise: Promise<any> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
  const opts = {
    bufferCommands: false,
  };

  console.log("--- Đang thử kết nối tới MongoDB tại:", MONGODB_URI); 

  cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    console.log("===> KẾT NỐI MONGODB THÀNH CÔNG! <==="); 
    return mongoose;
  }).catch(err => {
    console.error("!!! LỖI KẾT NỐI MONGODB:", err.message); 
  });
}

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
