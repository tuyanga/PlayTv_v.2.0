import clientPromise from "@/lib/mongodb2";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("playtv"); 
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

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('playtv');
    const collection = db.collection('movies');

    const result = await collection.insertOne(body);
    return Response.json(result);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}