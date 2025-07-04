import { connectDB } from '@/lib/mongoose';
import Movie from '@/models/Movie';
 
export async function DELETE(req, { params }) {
  await connectDB();
  const param =  await params
  await Movie.findByIdAndDelete(param.id);
  return Response.json({ success: true });
}
 
export async function PUT(req, { params }) {
  await connectDB();
  const param =  await params
  const body = await req.json();
  const updated = await Movie.findByIdAndUpdate(param.id, body, { new: true });
  return Response.json(updated);
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const movie = await Movie.findById(params.id);
    if (!movie) {
      return new Response(JSON.stringify({ error: 'Movie not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(movie), { status: 200 });
  } catch (error) {
    console.error('Error fetching movie:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch movie' }), { status: 500 });
  }
}