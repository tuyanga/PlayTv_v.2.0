import clientPromise from '@/lib/mongodb1'; // Import the shared MongoDB client

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phoneNumber = searchParams.get('phoneNumber'); // Get phoneNumber from query params

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ message: 'Phone number is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the MongoDB client and database
    const client = await clientPromise;
    const db = client.db('playtv'); // Replace 'playtv' with your database name
    const usersCollection = db.collection('users'); // Replace 'users' with your collection name

    // Find the user by phoneNumber
    const user = await usersCollection.findOne({ phoneNumber });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return the user data (excluding the password for security)
    return new Response(
      JSON.stringify({
        name: user.name,
        phoneNumber: user.phoneNumber,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(
      JSON.stringify({ message: 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}