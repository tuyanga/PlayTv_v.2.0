import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  poster: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
