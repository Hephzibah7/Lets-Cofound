import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  commitments: String,
});

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postPrivacy: { type: String, required: true },
    username: { type: String },
    designation: { type: String },
    profileimageUrl: { type: String },
    concept: String,
    problem: String,
    solution: String,
    fundingStatus: String,
    startupStage: String,
    patent: String,
    roles: [roleSchema],
    industries: [String],
    postImage: String,
    pitchDeck: String,
    location: String,
    chatMessages: [
      {
        userId: String,
        username: String,
        profilePic: String,
        content: String,
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
