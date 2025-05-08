import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const { currentPhone, newPhone } = await req.json();

    if (!currentPhone || !newPhone) {
      return new Response(
        JSON.stringify({ message: 'Бүх талбарыг бөглөнө үү.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the MongoDB client and database
    const client = await clientPromise;
    const db = client.db('playtv'); // Replace 'playtv' with your database name
    const usersCollection = db.collection('users'); // Replace 'users' with your collection name

    // Check if the current phone number exists
    const user = await usersCollection.findOne({ phoneNumber: currentPhone });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Хэрэглэгч олдсонгүй.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the new phone number is already in use
    const existingUser = await usersCollection.findOne({ phoneNumber: newPhone });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Шинэ утасны дугаар аль хэдийн бүртгэгдсэн байна.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update the phone number in the database
    await usersCollection.updateOne(
      { phoneNumber: currentPhone },
      { $set: { phoneNumber: newPhone } }
    );

    return new Response(
      JSON.stringify({ message: 'Утасны дугаар амжилттай солигдлоо.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error changing phone number:', error);
    return new Response(
      JSON.stringify({ message: 'Алдаа гарлаа.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}