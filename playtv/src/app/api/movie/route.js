import data from "@/data/movies.json"
export async function GET() {
return Response.json(data);
}
