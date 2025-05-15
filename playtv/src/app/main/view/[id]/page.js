import View from '../components/view.js';

async function getMovie(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/movies-by-genres/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch movie');
    }

    return res.json();
} 
    catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
}
}

async function getTrailer(id) {
  const res = await fetch(`http://localhost:3000/api/movie-trailer/${id}`);
  return res.ok ? res.json() : null;
}

export default async function ViewPage({ params }) {
  const {id} = await params; 
  const movie = await getMovie(id);
  const trailerID = await getTrailer(id);

  return (
      <div>
          <View {...movie}/>
          {trailerID.key &&
          (<div style={{ marginTop: '0.5rem', display: 'flex', flexDirection:'column', justifyContent: "center", alignItems: "center"}}>
            <div style = {{fontSize: '36px', marginBottom: '0.5rem', color: '#Fdfdff', fontWeight: '600'}}>Trailer</div>
            <iframe
              width="50%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerID.key}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            </div>)}
      </div>
  );
}