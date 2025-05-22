export async function GET() {
  const packages = [
    {
      id: 1,
      name: "Premium",
      price: "9900₮",
      image: "/img/image-7.jpg",
      features: ["Бүх төрлийн кино", "4K чанар", "Оффлайн үзэх"],
      accessGenres: "all" // бүх төрлийн жанрт хамаатай
    },
    {
      id: 2,
      name: "Standard",
      price: "4900₮",
      image: "/img/image-8.jpg",
      features: ["Тодорхой төрлийн кино", "HD чанар"],
      accessGenres: [28] // жанрын ID-уудаар зааж өгнө (жишээ: Action, Comedy, Drama)
    }
  ];
  
  return Response.json(packages);
}
