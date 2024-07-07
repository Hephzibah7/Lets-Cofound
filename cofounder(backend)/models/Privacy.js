import mongoose from 'mongoose';

const privacySchema = new mongoose.Schema({
  userId: String,
  isPrivate: Boolean,
});

const Privacy = mongoose.model('Privacy', privacySchema);

export default Privacy;
