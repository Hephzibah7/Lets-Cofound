import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { postPrivacy, postContent, image, tags } = req.body;
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId }).populate("userId");
    const username = profile.username;
    const designation = profile.designation;
    const profileimageUrl = profile.profileImage;
    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.filename; // Save the filename in imageUrl
    } else {
      imageUrl = null; // No image provided
    }

    const newPost = new Post({
      userId,
      username,
      designation,
      profileimageUrl,
      imageUrl,
      postPrivacy,
      postContent,
      tags,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully." });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Error creating post. Please try again later.");
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.user.userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    post.likes.push(req.user.userId);
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send("Error liking post. Please try again later.");
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.userId)) {
      return res.status(400).json({ message: "You have not liked this post" });
    }
    post.likes = post.likes.filter(
      (userId) => userId.toString() !== req.user.userId
    );
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).send("Error unliking post. Please try again later.");
  }
};

// Share a post
export const sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.shares += 1;
    await post.save();

    res
      .status(200)
      .json({ message: "Post shared successfully.", shares: post.shares });
  } catch (error) {
    console.error("Error sharing post:", error);
    res.status(500).json({ message: "Error sharing post" });
  }
};

// Comment on a post
export const commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId }).populate("userId");
    const username = profile.username;
    const designation = profile.designation;
    const profileimageUrl = profile.profileImage;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      userId,
      comment,
      username,
      designation,
      profileimageUrl,
    });
    await post.save();

    res.status(200).json({
      message: "Comment added successfully.",
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error commenting on post:", error);
    res.status(500).json({ message: "Error commenting on post" });
  }
};

// Get the post details
export const getPostDetails = async (req, res) => {
  try {
    const { userId } = req.user; // Access userId from the authenticated token

    // Fetch all posts
    const posts = await Post.find().populate("userId", "username profileImage");

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    // Filter posts
    const filteredPosts = [];
    for (let post of posts) {
      if (
        post.postPrivacy === "public" ||
        post.userId._id.toString() === userId
      ) {
        // Include all public posts
        filteredPosts.push(post);
      } else {
        // Include private posts only if the requesting user is a follower of the post owner
        const postOwner = await Profile.findOne({ userId: post.userId._id });
        if (postOwner.followers.includes(userId)) {
          filteredPosts.push(post);
        }
      }
    }
    console.log(filteredPosts);

    if (filteredPosts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    // Send the array of filtered posts to the frontend
    res.status(200).json({ posts: filteredPosts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

// Delete post by postId
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (post) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get UserPosts by postId
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId }).populate("userId");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
