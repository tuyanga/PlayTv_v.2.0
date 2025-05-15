export async function GET() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
  const data = await res.json();
  return Response.json(data.genres);
}




