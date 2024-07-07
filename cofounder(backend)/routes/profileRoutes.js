import express from "express";
import {
  createProfile,
  checkUsernameAvailability,
  getProfileDetails,
  getChatProfileDetails,
  getFollowers,
  getFollowing,
  getUserDetails,
  checkProfile,
  getUserDetailsByUsername,
  getFollowStatus,
  followUser,
  unfollowUser,
  getFollowersDetails, 
  reportUsers
} from "../controllers/profiles.js";
import { authenticateToken } from "../utils/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/profileform",
  authenticateToken,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  createProfile
);

router.get("/check-username", authenticateToken, checkUsernameAvailability);
router.get("/getProfileDetails", authenticateToken, getProfileDetails);
router.post("/getChatProfileDetails", authenticateToken, getChatProfileDetails);
router.get("/followers/:userId", authenticateToken, getFollowers);
router.get("/following/:userId", authenticateToken, getFollowing);
router.get("/getUserDetails", authenticateToken, getUserDetails);
router.get("/checkProfile/:userId", authenticateToken, checkProfile);
router.get(
  "/getUserDetails/:username",
  authenticateToken,
  getUserDetailsByUsername
);
router.get("/followStatus/:username", authenticateToken, getFollowStatus);
router.post("/follow/:username", authenticateToken, followUser);
router.post("/unfollow/:username", authenticateToken, unfollowUser);
router.get("/followersdetails/:userId", authenticateToken, getFollowersDetails);
router.post("/report/:username", authenticateToken, reportUsers);


export default router;
