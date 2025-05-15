export async function GET(request) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const { searchParams } = new URL(request.url);
    const genreId = searchParams.get('genreId');
  
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`;
    const response = await fetch(url);
    const data = await response.json();
  
    return Response.json(data.results || []);
  }
  