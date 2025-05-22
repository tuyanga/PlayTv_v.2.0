import clientPromise from '@/lib/mongodb3';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { phoneNumber, password } = body;

    if (!phoneNumber || !password) {
      return new Response(
        JSON.stringify({ message: 'Phone number and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = await clientPromise;
    const db = client.db('playtv');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ phoneNumber });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid phone number or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: 'Invalid phone number or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        user: {
          name: user.name,
          phoneNumber: user.phoneNumber,
        },
        token: 'fake-jwt-token',
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