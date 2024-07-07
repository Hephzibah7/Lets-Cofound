import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  googleId: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;
