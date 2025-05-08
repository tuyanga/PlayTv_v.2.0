import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phoneNumber = searchParams.get('phoneNumber'); // Утасны дугаарыг query параметрээр авах

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ success: false, message: 'Утасны дугаар шаардлагатай.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // MongoDB-д холбогдох
    const client = await clientPromise;
    const db = client.db('playtv'); // Replace with your database name
    const subscriptionsCollection = db.collection('subscriptions'); // Replace with your collection name

    // Хэрэглэгчийн төлбөрийн түүхийг авах
    const subscriptions = await subscriptionsCollection
      .find({ phoneNumber })
      .sort({ startDate: -1 }) // Огноогоор буурах дарааллаар эрэмбэлэх
      .toArray();

    return new Response(
      JSON.stringify({ success: true, subscriptions }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Алдаа гарлаа.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}