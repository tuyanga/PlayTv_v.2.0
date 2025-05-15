export async function GET() {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`);
    const data = await res.json();

    const top5 = data.results.slice(0, 5); 
    return Response.json(top5);
  }