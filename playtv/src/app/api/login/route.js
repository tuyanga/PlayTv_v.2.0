import clientPromise from '@/lib/mongodb'; // Import the shared MongoDB client
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the MongoDB client and database
    const client = await clientPromise;
    const db = client.db('playtv'); // Replace 'playtv' with your database name
    const usersCollection = db.collection('users'); // Replace 'users' with your collection name

    // Check if the user exists in the database
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If login is successful, return user data and a token
    return new Response(
      JSON.stringify({
        message: 'Login successful',
        user: {
          name: user.name,
          email: user.email,
        },
        token: 'fake-jwt-token', // Replace with a real JWT if needed
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
