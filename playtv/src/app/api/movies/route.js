import { connectDB } from '@/lib/mongoose';
import Movie from '@/models/Movie';

export async function GET() {
  try {
    await connectDB();
    const movies = await Movie.find({});
    return Response.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch movies' }), { status: 500 });
  }
}
