export async function GET() {
const data = [
    {   
        id: 1,
        title: "Didi",
        category: "Инээдмийн",
        duration: 110, 
        year: 2024, 
        rating: 4.5,
        description: "Нэгэн өсвөр насны хүү хичээл орохоос өмнө амжиж гэр бүлийнхэн нь зааж чадахгүй нэлээд хэдэн зүйлсийг сурахаар шийднэ. Жишээ нь: скейтбордоор гулгах, хэрхэн зөв сээтгэнэх гэх мэт.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/DidiHBO_vertical.jpg"

    },
    {   
        id: 2,
        title: "Амьдрах Сайхан",
        category: "Драм",
        duration: 120,
        year: 2024, 
        rating: 3.5,
        description: "Амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/AmidrahSaihanS01_vertical.jpg"
    },
    {
        id: 3,
        title: "Махан Бөмбөг",
        category: "Анимейшн",
        duration: 90,
        year: 2021, 
        rating: 4.5,
        description: "Махан бөмбөг нь амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
        image: "/images/Didi__lookhorizontal.jpg",
        poster: "/posters/CloudyWithAChanceOfMeatballs_vertical.jpg"
    },
    {
        id: 4,
        title: "DespicableMe 4",
        category: "Анимейшн",
        duration: 100,
        year: 2024, 
        rating: 5,
        description: "Нэгэн өсвөр насны хүү хичээл орохоос өмнө амжиж гэр бүлийнхэн нь зааж чадахгүй нэлээд хэдэн зүйлсийг сурахаар шийднэ. Жишээ нь: скейтбордоор гулгах, хэрхэн зөв сээтгэнэх гэх мэт.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/DespicableMe4HBO_vertical.jpg"
    },
    {
        id: 5,
        title: "KungFu Panda 4",
        category: "Анимейшн",
        duration: 115,
        year: 2024, 
        rating: 5,
        description: "Kung Fu Panda 4 нь амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/KungfuPanda4HBO_vertical.jpg"
    },
    {   
        id: 6,
        title: "Өв Залгамжлагч",
        category: "Инээдмийн",
        duration: 120,
        year: 2024, 
        rating: 2.5,
        description: "Өв залгамжлагч кино нь амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/OvZalgamchlagchS01_verticalnotag.jpg"
    },
    {   
        id: 7,
        title: "Ratatouille",
        category: "Анимейшн",
        duration: 130,
        year: 2014, 
        rating: 5,
        description: "Реми хэмээх нэгэн гахай Парисын алдартай тогооч болохыг мөрөөдөж, түүний мөрөөдлийг биелүүлэхийн тулд бүхнийг хийх болно.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/Ratatouille_vertical.jpg"
    },
    {   
        id: 8,
        title: "Skyscraper",
        category: "Адал явдалт",
        duration: 105,
        year: 2023, 
        rating: 4.0,
        description: "Skyscraper кино нь амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/Skyscraper_vertical.jpg"
    },
    {   
        id: 9,
        title: "Zura",
        category: "Адал явдалт",
        duration: 125,
        year: 2020, 
        rating: 1.5,
        description: "Zura кино нь амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
        image: "images/Didi__lookhorizontal.jpg",
        poster: "/posters/ztsuram_vertical.jpg"
    },
];

try {
    // MongoDB-оос өгөгдөл авах
    const client = await clientPromise;
    const db = client.db('playtv'); // Өөрийн өгөгдлийн сангийн нэрийг оруулна
    const moviesCollection = db.collection('movies'); // Коллекцийн нэр
    const moviesFromDb = await moviesCollection.find({}).toArray();

    // MongoDB өгөгдлийг статик өгөгдөлтэй нэгтгэх
    const combinedData = [...data, ...moviesFromDb];

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ success: false, message: 'Алдаа гарлаа.' }, { status: 500 });
  }

}
export async function POST(req) {
    try {
      const newMovie = await req.json(); // Хүсэлтээс өгөгдлийг авах
  
      const client = await clientPromise;
      const db = client.db('playtv');
      const moviesCollection = db.collection('movies');
  
      // MongoDB-оос бүх өгөгдлийг авах
      const moviesFromDb = await moviesCollection.find({}).toArray();
  
      // Статик өгөгдөлтэй нэгтгэх
      const combinedData = [...data, ...moviesFromDb];
  
      // Хамгийн их `id`-г олох
      const maxId = combinedData.reduce((max, movie) => (movie.id > max ? movie.id : max), 0);
  
      // Шинэ `id` үүсгэх
      newMovie.id = maxId + 1;
  
      // Өгөгдлийн санд кино нэмэх
      await moviesCollection.insertOne(newMovie);
  
      return NextResponse.json({ success: true, message: 'Кино амжилттай нэмэгдлээ!', newMovie });
    } catch (error) {
      console.error('Error adding movie:', error);
      return NextResponse.json({ success: false, message: 'Кино нэмэхэд алдаа гарлаа.' }, { status: 500 });
    }
  }