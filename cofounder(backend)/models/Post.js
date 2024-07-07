import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postPrivacy: { type: String, required: true },
  username: { type: String },
  designation: { type: String },
  postContent: { type: String, required: true },
  profileimageUrl: { type: String },
  imageUrl: { type: String },
  tags: { type: String,  required: false},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array to store user IDs who liked the post
  shares: { type: Number, default: 0 },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: { type: String },
      designation: { type: String },
      profileimageUrl: { type: String },
      comment: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
