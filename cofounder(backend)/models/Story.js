import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String },
  profileImage: { type: String },
  posts: [{
      filepath: { type: String, required: true },
      caption: { type: String, required: false },
      createdAt: { type: Date, default: Date.now, expires: '24h' },
    },
  ],
});

const Story = mongoose.model('Story', storySchema);


export default Story;
