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
            poster: "posters/DidiHBO_vertical.jpg"

        },
        {   
            id: 2,
            title: "Амьдрах Сайхан",
            category: "Драм",
            duration: 120,
            year: 2024, 
            rating: 3.5,
            description: "Амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
            image: "images/DespicableMe4__lookhorizontal.jpg",
            poster: "posters/AmidrahSaihanS01_vertical.jpg"
        },
        {
            id: 3,
            title: "Махан Бөмбөг",
            category: "Анимейшн",
            duration: 90,
            year: 2021, 
            rating: 4.5,
            description: "Махан бөмбөг нь амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
            image: "images/Skyscraper__lookhorizontal.jpg",
            poster: "posters/CloudyWithAChanceOfMeatballs_vertical.jpg"
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
            poster: "posters/DespicableMe4HBO_vertical.jpg"
        },
        {
            id: 5,
            title: "KungFu Panda 4",
            category: "Анимейшн",
            duration: 115,
            year: 2024, 
            rating: 5,
            description: "Kung Fu Panda 4 нь амьдралын утга учир, хайр дурлал, гэр бүл, найз нөхөд, амжилт, алдаа, уналт, босолт, итгэл найдвар, хүсэл мөрөөдөл зэргийг хөндсөн энэхүү кино нь бидний амьдралын хамгийн чухал мөчүүдийг харуулсан бүтээл юм.",
            image: "images/DespicableMe4__lookhorizontal.jpg",
            poster: "posters/KungfuPanda4HBO_vertical.jpg"
        },
    ];

    return Response.json(data);

  }