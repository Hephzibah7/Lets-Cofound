import mongoose from "mongoose";

const FollowerUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  profileImage: { type: String },
});
const FollowingUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  profileImage: { type: String },
});
const blockedUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  profileImage: { type: String }
});
const skillSetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  skills: { type: [String], required: true },
});

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    experience: { type: String, required: true },
    education: { type: String, required: true },
    achievements: { type: String, required: true },
    designation: { type: String, required: true },
    company: { type: String, required: true },
    profileImage: { type: String, required: false },
    backgroundImage: { type: String, required: false },
    website: { type: String, required: true },
    location: { type: String, required: true },
    industries: { type: [String], required: true },
    skillSets: { type: [skillSetSchema], required: true },
    employment: { type: String, required: true },
    followers: { type: [FollowerUserSchema], default: [] },
    following: { type: [FollowingUserSchema], default: [] },
    reportUsers: { type: [String], default: [] },
    blockedUsers: { type: [blockedUserSchema], default: [] },},
  { timestamps: true }
);

const Profile = mongoose.model("profileinfos", profileSchema);

export default Profile;
