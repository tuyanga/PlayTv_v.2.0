import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI_TWO;
const MONGODB_DB = 'sample_mflix';

export async function GET() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);
    const localMovies = await db.collection('movies').find().limit(5).toArray();

    return Response.json(localMovies)

  } catch(error){

    console.error('API error:', error);
    return new Response('Internal Server Error', { status: 500 });

  }
}