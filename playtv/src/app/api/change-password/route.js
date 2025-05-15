import clientPromise from '@/lib/mongodb1';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { phoneNumber, currentPass, newPass } = await req.json();

    if (!phoneNumber || !currentPass || !newPass) {
      return new Response(
        JSON.stringify({ message: 'Бүх талбарыг бөглөнө үү.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the MongoDB client and database
    const client = await clientPromise;
    const db = client.db('playtv');
    const usersCollection = db.collection('users');

    // Find the user by phoneNumber
    const user = await usersCollection.findOne({ phoneNumber });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Хэрэглэгч олдсонгүй.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate the current password
    const isPasswordValid = await bcrypt.compare(currentPass, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: 'Одоогийн нууц үг буруу байна.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPass, 10);

    // Update the password in the database
    await usersCollection.updateOne(
      { phoneNumber },
      { $set: { password: hashedPassword } }
    );

    return new Response(
      JSON.stringify({ message: 'Нууц үг амжилттай солигдлоо.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error changing password:', error);
    return new Response(
      JSON.stringify({ message: 'Алдаа гарлаа.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}