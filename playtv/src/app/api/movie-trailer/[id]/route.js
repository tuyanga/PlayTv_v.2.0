// /app/api/movie-trailer/[id]/route.js
export async function GET(_, { params }) {
    const param = await params;
    const id = param.id;
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`);
  
    const data = await res.json();
    const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
  
    return Response.json(trailer || {});
  }
  