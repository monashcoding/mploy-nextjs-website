import mongoose, { Connection } from 'mongoose';

const MONGO_URI: string = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

// Extend NodeJS global type for caching
declare global {
    var mongoose: { conn: Connection | null; promise: Promise<Connection> | null };
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo(): Promise<Connection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
            return mongoose.connection; // Ensures we return a Connection instance
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectMongo;
