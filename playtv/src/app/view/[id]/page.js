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
      </div>
  );
}