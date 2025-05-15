// /app/api/movies-by-genres/[id]/route.js
export async function GET(request, { params }) {
    const param = await params;
    const id = param.id;
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
  
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
  
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Movie not found' }), { status: 404 });
    }
  
    const movie = await res.json();
    return Response.json(movie);
  }
  