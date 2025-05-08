import clientPromise from '@/lib/mongodb'; // Import the shared MongoDB client
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
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

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = { email, password: hashedPassword };
    await usersCollection.insertOne(newUser);

    return new Response(
      JSON.stringify({ message: 'Sign-up successful' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during sign-up:', error);
    return new Response(
      JSON.stringify({ message: 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}