import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI_TWO;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI_TWO) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
