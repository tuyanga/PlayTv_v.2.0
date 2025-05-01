// src/app/api/movies/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("playtv"); // <-- your db name
    const movies = await db.collection("movies").find({}).toArray();

    return new Response(JSON.stringify({ success: true, movies }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
