import data from "@/data/movies.json"
export async function GET(request, { params }) {
    const param = await params;
    const id = param.id;
    const movieId = parseInt(id, 10);
    const movie = data.find(m => m.id === movieId);
    
    if (!movie) {
            return new Response('Movie not found', { status: 404 });
    }
    
    return new Response(JSON.stringify(movie), {
            headers: { 'Content-Type': 'application/json' },
     });
    }