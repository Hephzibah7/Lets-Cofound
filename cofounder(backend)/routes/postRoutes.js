import express from "express";
import {
  createPost,
  likePost,
  unlikePost,
  sharePost,
  commentPost,
  getPostDetails,
  deletePost,
  getUserPosts,
} from "../controllers/posts.js";
import { authenticateToken } from "../utils/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/createPost",
  authenticateToken,
  upload.single("image"),
  createPost
);

router.post("/likePost/:id", authenticateToken, likePost);

router.delete("/likePost/:id", authenticateToken, unlikePost);

router.post("/sharePost/:postId", authenticateToken, sharePost);

router.post("/commentPost/:postId", authenticateToken, commentPost);

router.get("/getPostDetails", authenticateToken, getPostDetails);

router.delete("/deletePost/:postId", authenticateToken, deletePost);

router.get("/getUserPosts/:userId", authenticateToken, getUserPosts);

export default router;
