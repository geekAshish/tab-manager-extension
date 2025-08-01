import mongoose from 'mongoose';

const tabSchema = new mongoose.Schema({
  title: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  tabs: [tabSchema],
});

export default mongoose.model('User', userSchema);