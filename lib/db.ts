import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

/**
 * After this check, TS still thinks it *might* be undefined.
 * So we assign it to a new constant with guaranteed string type.
 */
const MONGODB_URI_STRING: string = MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalCache: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<typeof mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI_STRING);
  }

  globalCache.conn = await globalCache.promise;
  globalThis.mongooseCache = globalCache;

  return globalCache.conn;
}
