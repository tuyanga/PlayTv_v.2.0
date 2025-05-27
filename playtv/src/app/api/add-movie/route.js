import { connectDB } from '@/lib/mongoose';
import Movie from '@/models/Movie';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const newMovie = await Movie.create({
      title: body.title,
      category: body.category,
      duration: parseInt(body.duration),
      year: parseInt(body.year),
      rating: parseFloat(body.rating),
      description: body.description,
      image: body.image,
      poster: body.poster,
      video_path: body.video_path,
      trailer_path: body.trailer_path,
    });

    return Response.json({ success: true, movie: newMovie });
  } catch (error) {
    console.error('Error creating movie:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to add movie', error: error.message }),
      { status: 500 }
    );
  }
}