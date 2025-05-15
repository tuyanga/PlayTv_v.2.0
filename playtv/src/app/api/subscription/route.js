import clientPromise from '@/lib/mongodb1';

export async function POST(request) {
  try {
    const { phoneNumber, packageId, packageName } = await request.json();

    if (!phoneNumber || !packageId || !packageName) {
      return new Response(
        JSON.stringify({ success: false, message: 'Бүх талбарыг бөглөнө үү.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // MongoDB-д холбогдох
    const client = await clientPromise;
    const db = client.db('playtv'); // Replace with your database name
    const subscriptionsCollection = db.collection('subscriptions');

    // 1 сарын хугацаатай эхлэх, дуусах огноог тооцоолох
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    // Шинэ subscription үүсгэх
    const newSubscription = {
      phoneNumber,
      packageId,
      packageName,
      startDate,
      endDate,
      status: 'active', // Идэвхтэй төлөв
    };

    // Subscription-ийг DB-д хадгалах
    await subscriptionsCollection.insertOne(newSubscription);

    return new Response(
      JSON.stringify({ success: true, message: 'Багц амжилттай идэвхжлээ.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error activating subscription:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Алдаа гарлаа.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
