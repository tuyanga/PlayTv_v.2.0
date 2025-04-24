export async function GET() {
    const data = [
        {
            title: "Didi",
            category: "Инээдмийн",
            duration: 110,
            poster: "posters/DidiHBO_vertical.jpg"
        },
        {
            title: "Амьдрах Сайхан",
            category: "Драм",
            duration: 120,
            poster: "posters/AmidrahSaihanS01_vertical.jpg"
        },
        {
            title: "Махан Бөмбөг",
            category: "Анимейшн",
            duration: 90,
            poster: "posters/CloudyWithAChanceOfMeatballs_vertical.jpg"
        },
        {
            title: "DespicableMe 4",
            category: "Анимейшн",
            duration: 100,
            poster: "posters/DespicableMe4HBO_vertical.jpg"
        },
        {
            title: "KungFu Panda 4",
            category: "Анимейшн",
            duration: 115,
            poster: "posters/KungfuPanda4HBO_vertical.jpg"
        },
        {
            title: "Өв Залгамжлагч",
            category: "Инээдмийн",
            duration: 120,
            poster: "posters/OvZalgamchlagchS01_verticalnotag.jpg"
        },
        {
            title: "Ratatouille",
            category: "Анимейшн",
            duration: 130,
            poster: "posters/Ratatouille_vertical.jpg"
        },
        {
            title: "Skyscraper",
            category: "Адал явдалт",
            duration: 105,
            poster: "posters/Skyscraper_vertical.jpg"
        },
        {
            title: "Zura",
            category: "Адал явдалт",
            duration: 125,
            poster: "posters/ztsuram_vertical.jpg"
        },
    ];

    return Response.json(data);

  }