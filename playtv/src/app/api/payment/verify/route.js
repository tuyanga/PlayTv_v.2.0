import { paymentsDB } from '../payments/route';

export async function POST(request) {
  const { phone, smsCode } = await request.json();
  
  const payment = paymentsDB.find(
    p => p.phone === phone && p.smsCode === parseInt(smsCode)
  );

  if (payment) {
    payment.status = "Амжилттай";
    return Response.json({ success: true, payment });
  }
  
  return Response.json({ success: false }, { status: 400 });
}