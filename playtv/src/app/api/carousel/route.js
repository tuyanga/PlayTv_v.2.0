export async function GET() {
    const data = [
        {
            title: "Didi",
            description: "Нэгэн өсвөр насны хүү хичээл орохоос өмнө амжиж гэр бүлийнхэн нь зааж чадахгүй нэлээд хэдэн зүйлсийг сурахаар шийднэ. Жишээ нь: скейтбордоор гулгах, хэрхэн зөв сээтгэнэх гэх мэт.",
            image: "images/Didi__lookhorizontal.jpg"
          },
          {
            title: "Skyscraper",
            description: "Хонг Конгын хамгийн өндөр тэнгэр баганадсан барилгад гал гарлаа. Уг ослын бурууг барилгын хамгаалалтын ажилтан Вилл Сойерт тохохыг оролдоно.",
            image: "images/Skyscraper__lookhorizontal.jpg"
          },
          {
            title: "DespicableMe 4",
            description: "Энэ удаа Грү, Люси хоёр ам бүл нэмж, бяцхан дайсантай болохын зэрэгцээ зугтаж явахаас өөр аргагүй өстөн дайснуудтай болох нь тэр.",
            image: "images/DespicableMe4__lookhorizontal.jpg"
          }
    ];
  
    return Response.json(data);
  }