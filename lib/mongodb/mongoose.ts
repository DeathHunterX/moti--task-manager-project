import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
}

// Global cache to preserve connection across hot reloads
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                bufferCommands: false,
            })
            .then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (err) {
        cached.promise = null;
        throw err;
    }
}
