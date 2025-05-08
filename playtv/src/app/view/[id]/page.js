import View from '../components/view.js';

async function getMovie(id) {

  try {
    const res = await fetch(`http://localhost:3000/api/movie/${id}`);

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

export default async function ViewPage({ params }) {
  const { id } = await params; 
  const movie = await getMovie(id);

  return (
      <div>
          <View {...movie} />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <iframe
                src={"https://vidsrc.xyz/embed/movie/385687"}
                width="50%"
                height="500"
                allowFullScreen
                frameBorder="0"
                title="Movie Player"
            />
        </div>
      </div>
  );
}