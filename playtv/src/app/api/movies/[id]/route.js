import { connectDB } from '@/lib/mongoose';
import Movie from '@/models/Movie';
 
export async function DELETE(req, { params }) {
  await connectDB();
  const param =  await params
  await Movie.findByIdAndDelete(param.id);
  return Response.json({ success: true });
}
 
export async function PUT(req, { params }) {
  await connectDB();
  const param =  await params
  const body = await req.json();
  const updated = await Movie.findByIdAndUpdate(param.id, body, { new: true });
  return Response.json(updated);
}