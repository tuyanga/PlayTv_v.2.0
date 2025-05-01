export async function GET() {
    const packages = [
      {
        id: 1,
        name: "Premium",
        price: "9900₮",
        image: "/img/image-7.jpg",
        features: ["Бүх суваг", "4K чанар", "Оффлайн үзэх"]
      },
      {
        id: 2,
        name: "Standard",
        price: "4900₮",
        image: "/img/image-8.jpg",
        features: ["100+ суваг", "HD чанар"]
      }
    ];
    
    return Response.json(packages);
  }