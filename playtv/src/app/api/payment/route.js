// app/api/payments/route.js

// Төлбөрийн мэдээллийг хадгалах жипплээлт
let paymentsDB = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    package: "Premium",
    amount: "9900₮",
    status: "Амжилттай"
  }
];

export async function GET() {
  return Response.json(paymentsDB);
}

export async function POST(request) {
  try {
    const { packageName, amount, phone } = await request.json();
    
    // SMS код үүсгэх (жишээлбэл)
    const smsCode = Math.floor(100000 + Math.random() * 900000);
    
    console.log(`[DEBUG] ${phone} руу илгээсэн SMS код: ${smsCode}`);

    const newPayment = {
      id: paymentsDB.length + 1,
      date: new Date().toLocaleDateString(),
      package: packageName,
      amount,
      phone,
      status: "Хүлээгдэж байна",
      smsCode // Бодит прожектэд энийг хадгалахгүй
    };

    paymentsDB.push(newPayment);
    
    return Response.json({ 
      success: true,
      message: "Төлбөр амжилттай бүртгэгдлээ",
      smsCode: smsCode
    });
    
  } catch (error) {
    return Response.json(
      { 
        success: false, 
        error: error.message || "Төлбөр бүртгэхэд алдаа гарлаа" 
      },
      { status: 500 }
    );
  }
}