// server.js (or index.js)
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import crypto from "crypto";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { Server } from "socket.io";
import http from "http";
// Custom authentication middleware

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import { authenticateToken } from './utils/authMiddleware.js';
import notificationRoutes from './routes/notificationRoutes.js';
import postRoutes from './routes/postRoutes.js';
import conversationRoutes from './routes/conversations.js';
import messageRoutes from './routes/messageRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import privacyRoutes from './routes/privacyRoutes.js';
import blockRoutes from './routes/blockRoutes.js'
import searchRoutes from './routes/searchRoutes.js';




import webSocketController from './controllers/webSocket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// app.use(cors()); // Use the cors middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection using MongoDB Atlas connection string
const mongoURI =
  "mongodb+srv://Ayash:Ayash@cluster0.qs9ylec.mongodb.net/cofound"; // Replace 'your_mongodb_atlas_connection_string' with your actual MongoDB Atlas connection string
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Secret key (this should be stored securely and not hard-coded in real applications)
const secretKey = "your_secret_key";

// const server = http.createServer(app);

const server = http.createServer(app).listen(9003, function () {
  console.log("Express server listening on port " + 9003);
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Adjust this to your frontend's URL in a production environment
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// // Socket.io connection
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("sendMessage", async (data) => {
//     const { sender, receiver, message } = data;
//     const newMessage = new Message({ sender, receiver, message });
//     await newMessage.save();
//     io.emit("receiveMessage", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// // User schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Mock data for storing OTPs temporarily
// let otpData;

// // POST endpoint to send OTP
// app.post("/sendOTP", (req, res) => {
//   console.log("hello");
//   const { email } = req.body;
//   if (email) {
//     const randomOTP = Math.floor(1000 + Math.random() * 9000);
//     console.log("Generated OTP:", randomOTP);

//     // Configure nodemailer with your email service
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "ayashbehera2003@gmail.com", // Replace with your email address
//         pass: "umgabjobderxyjmv", // Replace with your email password or an app-specific password
//       },
//     });

//     const mailOptions = {
//       from: "ayashbehera2003@gmail.com", // Sender email address
//       to: email, // Receiver email address
//       subject: "Your OTP for SignUp",
//       text: `Your OTP is: ${randomOTP}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         res.status(500).send("Error sending the required OTP.");
//       } else {
//         console.log("Email sent:", info.response);
//         // Mocking the email sending process
//         console.log(`Sending OTP ${randomOTP} to ${email}`);
//         otpData = randomOTP;
//         res.status(200).json({ message: "OTP sent successfully." });
//       }
//     });
//   } else {
//     res.status(400).send("Invalid request.");
//   }
// });

// // POST endpoint to verify OTP and signup
// app.post("/verifyOTP", (req, res) => {
//   const { email, otp } = req.body;
//   if (email && otp) {
//     if (otp == otpData) {
//       // Clear OTP data after successful verification
//       console.log("hurray");
//       res.status(200).send("OTP verified successfully");
//     } else {
//       res.status(400).send("Invalid OTP");
//     }
//   } else {
//     res.status(400).send("Invalid request.");
//   }
// });

// // Register endpoint
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();
//     const savedUser = await newUser.save(); // Save the new user to the database
//     const userId = savedUser._id; // Get the user ID from the saved user object
//     // res.status(201).send('User registered successfully.');
//     res.status(201).json({
//       message: "User Registered Successfully successfully.",
//       userId: userId,
//     });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).send("Error registering user. Please try again later.");
//   }
// });

// // Login endpoint
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).send("User not found.");
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).send("Invalid credentials.");
//     }
//     const token = jwt.sign({ userId: user._id }, "your_secret_key", {
//       expiresIn: "7h",
//     });
//     console.log(token);
//     console.log(req.body);
//     res.json({ userId: user._id, token });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).send("Error logging in. Please try again later.");
//   }
// });

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) {
//     return res.sendStatus(401); // Unauthorized if no token provided
//   }
//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       console.error("JWT verification error:", err);
//       return res.sendStatus(403); // Forbidden if token is invalid or expired
//     }
//     req.user = user;
//     next(); // Proceed to the next middleware or route handler
//   });
// };

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api', otpRoutes);

app.use('/api/conversations', conversationRoutes);
app.use('/api', messageRoutes);


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, "uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const skillSetSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   subcategory: { type: String, required: true },
//   skills: { type: [String], required: true },
// });

// const profileSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     fullName: { type: String, required: true },
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     bio: { type: String, required: true },
//     experience: { type: String, required: true },
//     education: { type: String, required: true },
//     achievements: { type: String, required: true },
//     designation: { type: String, required: true },
//     company: { type: String, required: true },
//     profileImage: { type: String, required: false },
//     backgroundImage: { type: String, required: false },
//     website: { type: String, required: true },
//     location: { type: String, required: true },
//     industries: { type: [String], required: true },
//     skillSets: { type: [skillSetSchema], required: true },
//     employment: { type: String, required: true },
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   },
//   { timestamps: true }
// );

// // Create Profile model
// const Profile = mongoose.model("profileinfo", profileSchema);

// // Endpoint to create a profile
// app.post(
//   "/profileform",
//   authenticateToken,
//   upload.fields([
//     { name: "profileImage", maxCount: 1 },
//     { name: "backgroundImage", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const {
//         fullName,
//         username,
//         email,
//         bio,
//         experience,
//         education,
//         achievements,
//         designation,
//         company,
//         website,
//         location,
//         industries,
//         skillSets,
//         employment,
//       } = req.body;
//       console.log(req.body);
//       const profile = new Profile({
//         userId: req.user.userId,
//         fullName,
//         username,
//         email,
//         bio,
//         experience,
//         education,
//         achievements,
//         profileImage: req.files["profileImage"][0].filename,
//         designation,
//         company,
//         backgroundImage: req.files["backgroundImage"][0].filename,
//         website,
//         location,
//         industries,
//         skillSets,
//         employment,
//       });
//       console.log(profile);
//       await profile.save();

//       res.status(200).json({ message: "Profile submitted successfully" });
//     } catch (error) {
//       console.error("Error submitting profile:", error);
//       res
//         .status(500)
//         .json({ message: "Error storing data. Please try again later." });
//     }
//   }
// );

// Storage multer
app.use('/uploads', express.static('uploads'));

// Saving of profile details
app.use('/api/profiles', profileRoutes);


// Endpoint to check username availability
// app.get('/check-username', authenticateToken, async (req, res) => {
//   const { username } = req.query;
//   if (!username) {
//     return res.status(400).send({ error: 'Username is required' });
//   }

//   try {
//     const profile = await Profile.findOne({ username });
//     console.log(profile);
//     if (profile) {
//       return res.status(200).send({ isAvailable: false });
//     } else {
//       return res.status(200).send({ isAvailable: true });
//     }
//   } catch (error) {
//     console.error('Error checking username availability', error);
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// });


// app.get("/getProfileDetails", authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const profile = await Profile.findOne({ userId }).populate("userId");
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     res.status(200).json({
//       username: profile.username,
//       fullname: profile.fullName,
//       bio: profile.bio,
//       backgroundImage: profile.backgroundImage,
//       profileImage: profile.profileImage,
//       location: profile.location,
//       designation: profile.designation,
//       experience: profile.experience,
//       education: profile.education,
//       skills: profile.skills,
//       achievements: profile.achievements,
//       // Add more fields as needed
//     });
//   } catch (error) {
//     console.error("Error fetching profile details:", error);
//     res.status(500).json({ message: "Error fetching profile details" });
//   }
// });

// app.post("/getChatProfileDetails", authenticateToken, async (req, res) => {
//   try {
//     console.log("hello");
//     const { userIds } = req.body;
//     console.log(req.body);
//     const users = await Profile.find({ userId: { $in: userIds } });
//     console.log(users);
//     res.json(users);
//   } catch (err) {
//     res
//       .status(500)
//       .send({ error: "An error occurred while fetching user details." });
//   }
// });


// const roleSchema = new mongoose.Schema({
//   name: String,
//   skills: [String],
//   commitments: String,
// });

// const projectSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     postPrivacy: { type: String, required: true },
//     username: { type: String },
//     designation: { type: String },
//     profileimageUrl: { type: String },
//     concept: String, 
//     problem: String,
//     solution: String,
//     fundingStatus: String,
//     startupStage: String,
//     patent: String,
//     roles: [roleSchema],
//     industries: [String],
//     postImage: String,
//     pitchDeck: String,
//     chatMessages: [
//       {
//         userId: String,
//         username: String,
//         profilePic: String,
//         content: String,
//         timestamp: Date,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Project = mongoose.model("Project", projectSchema);

// app.post(
//   "/projectform",
//   authenticateToken,
//   upload.fields([
//     { name: "postImage", maxCount: 1 },
//     { name: "pitchDeck", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     const formData = req.body;
//     const files = req.files;
//     const userId = req.user.userId;

//     try {
//       const prof = await Profile.findOne({ userId });
//       if (!prof) {
//         return res.status(404).json({ error: "Profile not found" });
//       }

//       const username = prof.username;
//       const designation = prof.designation;
//       const profileimageUrl = prof.profileImage;

//       let roles;
//       try {
//         roles = JSON.parse(formData.roles);
//         if (
//           !Array.isArray(roles) ||
//           !roles.every(
//             (role) =>
//               role.name && Array.isArray(role.skills) && role.commitments
//           )
//         ) {
//           throw new Error("Invalid format for roles");
//         }
//       } catch (error) {
//         return res.status(400).json({ error: "Invalid JSON format for roles" });
//       }

//       const newProject = new Project({
//         userId: userId,
//         postPrivacy: formData.postPrivacy,
//         username: username,
//         designation: designation,
//         profileimageUrl: profileimageUrl,
//         concept: formData.concept,
//         problem: formData.problem,
//         solution: formData.solution,
//         fundingStatus: formData.fundingStatus,
//         startupStage: formData.startupStage,
//         patent: formData.patent,
//         roles: roles,
//         industries: formData.industries
//           ? formData.industries.split(",").map((industry) => industry.trim())
//           : [],
//         postImage: files.postImage ? files.postImage[0].filename : null,
//         pitchDeck: files.pitchDeck ? files.pitchDeck[0].filename : null,
//         chatMessages: [], // Assuming chat messages will be added later
//       });

//       await newProject.save();
//       res.status(200).json({ message: "Project form submitted successfully" });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

app.use('/api/projects', projectRoutes);


// // Endpoint to fetch all projects
// app.get("/projects", authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.user; // Access userId from the authenticated token
//     const projects = await Project.find().populate("userId");
//     // Filter posts
//     const filteredPosts = [];
//     for (let project of projects) {
//       if (project.postPrivacy === "public" || project.userId._id.toString() === userId) {
//         // Include all public posts
//         filteredPosts.push(project);
//       } else {
//         // Include private posts only if the requesting user is a follower of the post owner
//         const projectOwner = await Profile.findOne({ userId: project.userId._id });
//         if (projectOwner.followers.includes(userId)) {
//           filteredPosts.push(project);
//         }
//       }
//     }
//     console.log(filteredPosts);
//     res.status(200).json(filteredPosts);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// app.get("/projectsingle/:projectId", authenticateToken, async (req, res) => {
//   try {
//     console.log("ayash");
//     const project = await Project.findById(req.params.projectId);
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// const notificationSchema = new mongoose.Schema({
//   recipient: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   message: { type: String, required: true },
//   projectId: String,
//   status: String,
//   type: { type: String, required: true }, // 'interestRequest' or 'interestApproval'
//   timestamp: { type: Date, default: Date.now },
// });

// const Notification = mongoose.model("Notification", notificationSchema);

// app.post("/showinterest/:id", authenticateToken, async (req, res) => {
//   try {
//     const projectId = req.params.id;
//     const userId = req.user.userId;
//     const profile = await Profile.findOne({ userId }).populate("userId");
//     const username = profile.username;
//     const project = await Project.findById(projectId);
//     const projectowner = project.username;

//     const ownerNotification = new Notification({
//       recipient: project.userId,
//       sender: userId,
//       message: `${username} is interested in your project: ${project.concept}`,
//       projectId,
//       status: "RequestSent",
//       type: "interestRequest",
//     });

//     await ownerNotification.save();
//     // Create a notification for the user who showed interest
//     const userNotification = new Notification({
//       recipient: userId,
//       sender: project.userId,
//       message: "Your interest has been successfully sent.",
//       projectId,
//       status: "RequestSent",
//       type: "interestConfirmation",
//     });

//     await userNotification.save();

//     res.status(200).send({ message: "Interest shown successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.post(
//   "/projects/:notificationId/approveInterest",
//   authenticateToken,
//   async (req, res) => {
//     const userId = req.user.userId;
//     const { notificationId } = req.params;

//     const notification = await Notification.findById(notificationId);
//     console.log(notification);
//     // const { username } = req.body;
//     const project = await Project.findById(notification.projectId);

//     // Create a notification for the user who showed interest
//     const userNotification = new Notification({
//       recipient: notification.sender,
//       sender: project.userId,
//       message: `Your interest in the project ${project.concept} has been approved.`,
//       status: "Approved",
//       projectId: notification.projectId,
//       type: "interestApproval",
//     });

//     await userNotification.save();

//     res.status(200).send({ message: "Interest approved successfully." });
//   }
// );

// app.get("/notifications/:userId", authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.params; // Extract the username correctly from req.params

//     const notifications = await Notification.findOne({
//       recipient: userId,
//     }).sort({ timestamp: -1 });
//     console.log(notifications);
//     res.status(200).send(notifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res
//       .status(500)
//       .send({ message: "An error occurred while fetching notifications" });
//   }
// });

app.use('/api/notifications', notificationRoutes);


//post schema
// const postSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   postPrivacy: { type: String, required: true },
//   username: { type: String },
//   designation: { type: String },
//   postContent: { type: String, required: true },
//   profileimageUrl: { type: String },
//   imageUrl: { type: String },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array to store user IDs who liked the post
//   shares: { type: Number, default: 0 },
//   comments: [
//     {
//       userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       username: { type: String },
//       designation: { type: String },
//       profileimageUrl: { type: String },
//       comment: { type: String, required: true },
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
// });

// const Post = mongoose.model("Post", postSchema);

// app.post(
//   "/createPost",
//   authenticateToken,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { postPrivacy, postContent, image } = req.body;
//       const userId = req.user.userId;
//       const profile = await Profile.findOne({ userId }).populate("userId");
//       const username = profile.username;
//       const designation = profile.designation;
//       const profileimageUrl = profile.profileImage;
//       let imageUrl = "";
//       if (req.file) {
//         imageUrl = req.file.filename; // Save the filename in imageUrl
//       } else {
//         imageUrl = null; // No image provided
//       }

//       const newPost = new Post({
//         userId,
//         username,
//         designation,
//         profileimageUrl,
//         imageUrl,
//         postPrivacy,
//         postContent,
//       });

//       await newPost.save();

//       res.status(201).json({ message: "Post created successfully." });
//     } catch (error) {
//       console.error("Error creating post:", error);
//       res.status(500).send("Error creating post. Please try again later.");
//     }
//   }
// );
// app.post("/likePost/:id", authenticateToken, async (req, res) => {
//   try {
//     console.log(req.user.userId);
//     const post = await Post.findById(req.params.id);
//     if (post.likes.includes(req.user.userId)) {
//       return res
//         .status(400)
//         .json({ message: "You have already liked this post" });
//     }

//     post.likes.push(req.user.userId);
//     await post.save();
//     res.json(post);
//   } catch (e) {
//     res.send({ message: "Error in Liking post" });
//   }
// });

// app.delete("/likePost/:id", authenticateToken, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post.likes.includes(req.user.userId)) {
//       return res.status(400).json({ message: "You have not liked this post" });
//     }
//     post.likes = post.likes.filter(
//       (userId) => userId.toString() !== req.user.userId
//     );
//     await post.save();
//     res.json(post);
//   } catch (e) {
//     res.send({ message: "Error in Unliking post" });
//   }
// });


// Share a post
// app.post("/sharePost/:postId", authenticateToken, async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.shares += 1;
//     await post.save();

//     res
//       .status(200)
//       .json({ message: "Post shared successfully.", shares: post.shares });
//   } catch (error) {
//     console.error("Error sharing post:", error);
//     res.status(500).json({ message: "Error sharing post" });
//   }
// });

// // Comment on a post
// app.post("/commentPost/:postId", authenticateToken, async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { comment } = req.body;
//     const userId = req.user.userId;
//     const profile = await Profile.findOne({ userId }).populate("userId");
//     const username = profile.username;
//     const designation = profile.designation;
//     const profileimageUrl = profile.profileImage;

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.comments.push({
//       userId,
//       comment,
//       username,
//       designation,
//       profileimageUrl,
//     });
//     await post.save();

//     res.status(200).json({
//       message: "Comment added successfully.",
//       comments: post.comments,
//     });
//   } catch (error) {
//     console.error("Error commenting on post:", error);
//     res.status(500).json({ message: "Error commenting on post" });
//   }
// });

app.use('/api/posts', postRoutes);

//sidebar

// Get followers of a user
// app.get("/followers/:userId", authenticateToken, async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await Profile.findOne({ userId: userId }).populate(
//       "followers"
//     );

//     res.json(user.followers);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Get following of a user
// app.get("/following/:userId", authenticateToken, async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await Profile.findOne({ userId: userId }).populate(
//       "followers"
//     );

//     res.json(user.following);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get("/getUserDetails", authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.user; // Access userId from the authenticated token
//     // Assuming you have a Profile model with a userId field
//     // console.log(userId);
//     const profile = await Profile.findOne({ userId }).populate("userId");
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     console.log(profile.username);
//     // Return user details including username
//     res.status(200).json({
//       userId: profile.userId,
//       username: profile.username,
//       fullname: profile.fullName,
//       bio: profile.bio, // Example: Include bio
//       profileImage: profile.profileImage,
//       designation: profile.designation,
//       // Add more fields as needed
//     });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({ message: "Error fetching user details" });
//   }
// });

// Get post details
// app.get("/getPostDetails", authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.user; // Access userId from the authenticated token

//     // Fetch all posts
//     const posts = await Post.find().populate("userId", "username profileImage");

//     if (!posts || posts.length === 0) {
//       return res.status(404).json({ message: "No posts found" });
//     }

//     // Filter posts
//     const filteredPosts = [];
//     for (let post of posts) {
//       if (
//         post.postPrivacy === "public" ||
//         post.userId._id.toString() === userId
//       ) {
//         // Include all public posts
//         filteredPosts.push(post);
//       } else {
//         // Include private posts only if the requesting user is a follower of the post owner
//         const postOwner = await Profile.findOne({ userId: post.userId._id });
//         if (postOwner.followers.includes(userId)) {
//           filteredPosts.push(post);
//         }
//       }
//     }
//     console.log(filteredPosts);

//     if (filteredPosts.length === 0) {
//       return res.status(404).json({ message: "No posts found" });
//     }

//     // Send the array of filtered posts to the frontend
//     res.status(200).json({ posts: filteredPosts });
//   } catch (error) {
//     console.error("Error fetching user posts:", error);
//     res.status(500).json({ message: "Error fetching user posts" });
//   }
// });

// app.get("/checkProfile/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const profile = await Profile.findOne({ userId });

//     if (profile) {
//       res.json({ exists: true });
//     } else {
//       res.json({ exists: false });
//     }
//   } catch (error) {
//     console.error("Error checking profile:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.delete("/deletePost/:postId", authenticateToken, async (req, res) => {
//   const { postId } = req.params;
//   try {
//     const post = await Post.findByIdAndDelete(postId);
//     if (post) {
//       res.status(200).json({ message: "Post deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/getUserPosts/:userId", authenticateToken, async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const posts = await Post.find({ userId }).populate("userId");
//     // console.log(posts);
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching posts", error });
//   }
// });

// Endpoint to get user details by ID
// app.get("/getUserDetails/:username", authenticateToken, async (req, res) => {
//   const username = req.params.username;
//   try {
//     const user = await Profile.findOne({ username: username });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user details" });
//   }
// });

// // Get follow status
// app.get("/followStatus/:username", authenticateToken, async (req, res) => {
//   const { username } = req.params;
//   const currentUserId = req.user.userId; // Assuming you have user ID from authentication middleware
//   if (!currentUserId) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   try {
//     const user = await Profile.findOne({ username });
//     if (user) {
//       const isFollowing = user.followers.includes(currentUserId);
//       res.json({ isFollowing });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching follow status" });
//   }
// });

// // Follow user
// app.post("/follow/:username", authenticateToken, async (req, res) => {
//   const { username } = req.params;
//   const currentUserId = req.user.userId; // Assuming you have user ID from authentication middleware
//   // console.log(currentUserId);
//   try {
//     const user = await Profile.findOne({ username });
//     if (user) {
//       if (!user.followers.includes(currentUserId)) {
//         user.followers.push(currentUserId);
//         await user.save();
//         const currentUser = await Profile.findOne({ userId: currentUserId });
//         console.log(currentUser);
//         currentUser.following.push(user.userId);
//         await currentUser.save();
//         console.log("user followed");
//         res.json({ message: "User followed successfully" });
//       } else {
//         res.status(400).json({ message: "Already following this user" });
//       }
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error following user" });
//   }
// });

// // Unfollow user
// app.post("/unfollow/:username", authenticateToken, async (req, res) => {
//   const { username } = req.params;
//   const currentUserId = req.user.userId; // Assuming you have user ID from authentication middleware
//   console.log(currentUserId);
//   try {
//     const user = await Profile.findOne({ username });
//     if (user) {
//       if (user.followers.includes(currentUserId)) {
//         user.followers = user.followers.filter(
//           (id) => id.toString() !== currentUserId
//         );
//         await user.save();
//         const currentUser = await Profile.findOne({ userId: currentUserId });
//         console.log(currentUser);
//         currentUser.following = currentUser.following.filter(
//           (id) => id.toString() !== user._id.toString()
//         );
//         await currentUser.save();
//         res.json({ message: "User unfollowed successfully" });
//       } else {
//         res.status(400).json({ message: "Not following this user" });
//       }
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error unfollowing user" });
//   }
// });


// const messageSchema = new mongoose.Schema({
//   sender: String,
//   receiver: String,
//   message: String,
//   timestamp: { type: Date, default: Date.now },
// });

// const Message = mongoose.model("Message", messageSchema);

// // Get messages between two users
// app.get("/messages/:user1/:user2", authenticateToken, async (req, res) => {
//   console.log("byebye");
//   const { user1, user2 } = req.params;
//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: user1, receiver: user2 },
//         { sender: user2, receiver: user1 },
//       ],
//     }).sort("timestamp");
//     res.json(messages);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.use('/api/message', messageRoutes);


// // REST endpoint to fetch chat messages for a project
// app.get("/chat/:projectId", async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId);
//     if (project) {
//       res.json(project.chatMessages);
//     } else {
//       res.status(404).send("Project not found");
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // WebSocket connection
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("joinProject", (projectId) => {
//     socket.join(projectId);
//     console.log(`Client joined project ${projectId}`);
//   });

//   socket.on("sendMessage", async (message) => {
//     const { projectId, userId, content } = message;
//     const profile = await Profile.findOne({ userId: userId });
//     const newMessage = {
//       userId,
//       username: profile.username,
//       profilePic: profile.profileImage,
//       content,
//       timestamp: new Date(),
//     };

//     try {
//       const project = await Project.findById(projectId);
//       if (project) {
//         project.chatMessages.push(newMessage);
//         await project.save();
//         io.to(projectId).emit("receiveMessage", newMessage);
//       }
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });



// Initialize WebSocket controller
webSocketController(io);

// ACCOUNT SETTINGS
// // update email
// app.post("/updateEmail", authenticateToken, async (req, res) => {
//   const newEmail = req.body.email;

//   if (!newEmail) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const userId = req.user.userId;
//     console.log(userId);
//     await User.findByIdAndUpdate(userId, { email: newEmail });
//     res.status(200).json({ message: "Email updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating email" });
//   }
// });

// app.post("/updatePassword", authenticateToken, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;

//   if (!oldPassword || !newPassword) {
//     return res
//       .status(400)
//       .json({ message: "Old password and new password are required" });
//   }

//   try {
//     const userId = req.user.userId;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare the provided old password with the hashed password in the database
//     const isMatch = await bcrypt.compare(oldPassword, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Old password is incorrect" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the database
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error(`Error updating password: ${error.message}`);
//     res.status(500).json({ message: "Error updating password" });
//   }
// });

// // Update the username
// app.post("/updateUsername", authenticateToken, async (req, res) => {
//   const newUsername = req.body.username;

//   if (!newUsername) {
//     return res.status(400).json({ message: "Username is required" });
//   }

//   try {
//     const userId = req.user.userId;
//     console.log(
//       `Updating user ID: ${userId} with new username: ${newUsername}`
//     );

//     // Correctly use `findOneAndUpdate` with a query object
//     await Profile.findOneAndUpdate({ userId }, { username: newUsername });

//     res.status(200).json({ message: "Username updated successfully" });
//   } catch (error) {
//     console.error(`Error updating username: ${error.message}`);
//     res.status(500).json({ message: "Error updating username" });
//   }
// });


app.use('/api/account', accountRoutes);


//stories

// const storySchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   filePath: String,
//   caption: String,
//   fileType: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Story = mongoose.model("Story", storySchema);

// app.post(
//   "/upload",
//   upload.single("file"),
//   authenticateToken,
//   async (req, res) => {
//     try {
//       const userId = req.userId; // Retrieve userId from authenticated user
//       const { caption } = req.body;

//       if (!req.file) {
//         return res.status(400).send("No file uploaded.");
//       }

//       const newPost = {
//         filePath: `${req.file.filename}`, // Store relative path
//         fileType: req.file.mimetype,
//         caption,
//       };

//       let story = await Story.findOne({ userId });
//       if (!story) {
//         story = new Story({ userId, posts: [newPost] });
//       }

//       await story.save();
//       res.status(201).json(newPost);
//     } catch (error) {
//       console.error("Error during file upload:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// // Get all stories
// app.get("/stories", authenticateToken, async (req, res) => {
//   try {
//     const stories = await Story.find().sort({ createdAt: -1 });
//     res.json(stories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


//stories


// const storySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   username: { type: String },
//   profileImage: { type: String },
//   posts: [{
//       filepath: { type: String, required: true },
//       caption: { type: String, required: false },
//       createdAt: { type: Date, default: Date.now, expires: '24h' },
//     },
//   ],
// });

// const Story = mongoose.model('Story', storySchema);



// app.post('/upload-story',authenticateToken, upload.single('story'), async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const prof = await Profile.findOne({ userId });
//     const username = prof.username;
//     const profileimageUrl = prof.profileImage;
//     const story = new Story({
//       userId: userId,
//       username: username,
//       profileImage: profileimageUrl,
//       posts: [{ filepath: req.file.filename, caption: req.body.caption }],
//     });

//     await story.save();
//     res.status(201).json(story);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to upload story.' });
//   }
// });

// app.get('/stories', authenticateToken, async (req, res) => {
//   try {
//     const stories = await Story.find().populate('userId');
//     res.status(200).json(stories);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch stories.' });
//   }
// });

// // Delete story endpoint
// app.delete('/stories/:id',authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Story.findByIdAndDelete(id);
//     res.status(200).send({ message: 'Story deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting story:', err);
//     res.status(500).send({ error: 'Failed to delete story. Please try again later.' });
//   }
// });

app.use('/api/story', storyRoutes);

// Create a user privacy schema and model
// const privacySchema = new mongoose.Schema({
//   userId: String,
//   isPrivate: Boolean,
// });

// const Privacy = mongoose.model('Privacy', privacySchema);

// // Route to update privacy setting
// app.post('/privacy', authenticateToken, async (req, res) => {
//   try {
//     const privacy = await Privacy.findOneAndUpdate(
//       { userId: req.user.userId },
//       { isPrivate: req.body.isPrivate },
//       { new: true, upsert: true } // Create if not exists
//     );
//     res.send(privacy);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Route to get current privacy setting for a specific user
// app.get('/privacy/:userId', authenticateToken, async (req, res) => {
//   try {
//     let privacy = await Privacy.findOne({ userId: req.params.userId });
//     if (!privacy) {
//       // Create default privacy setting if not found
//       const defaultPrivacy = new Privacy({ userId: req.params, isPrivate: false });
//       privacy = await defaultPrivacy.save();
//     }
//     res.send(privacy.isPrivate);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.use('/api/privacy', privacyRoutes);


// Block a user
// app.post('/block/:username', authenticateToken, async (req, res) => {
//   try {
//     const { username } = req.params;
//     const currentUserId = req.user.userId; 
//     const userToBlock = await Profile.findOne({ username: username });
//     const currentUser = await Profile.findOne({ userId: currentUserId });

//     if (!userToBlock) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!currentUser.blockedUsers.includes(userToBlock.userId)) {
//       currentUser.blockedUsers.push({
//         userId: userToBlock.userId,
//         username: userToBlock.username,
//         profileImage: userToBlock.profileImage
//       });
//       await currentUser.save();
//     }

//     res.json({ message: 'User blocked' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/unblock/:username', authenticateToken, async (req, res) => {
//   try {
//     const { username } = req.params;
//     const currentUserId = req.user.userId; 
//     const currentUser = await Profile.findOne({ userId: currentUserId });

//     if (!currentUser) {
//       return res.status(404).json({ message: 'Current user not found' });
//     }

//     const userToUnblock = await Profile.findOne({ username: username });

//     if (!userToUnblock) {
//       return res.status(404).json({ message: 'User to unblock not found' });
//     }

//     if (!currentUser.blockedUsers || !Array.isArray(currentUser.blockedUsers)) {
//       return res.status(400).json({ message: 'Blocked users list is invalid' });
//     }

//     const initialBlockedUsersCount = currentUser.blockedUsers.length;

//     currentUser.blockedUsers = currentUser.blockedUsers.filter(
//       blockedUser => blockedUser.userId.toString() !== userToUnblock.userId.toString()
//     );

//     if (currentUser.blockedUsers.length === initialBlockedUsersCount) {
//       return res.status(400).json({ message: 'User was not blocked' });
//     }

//     await currentUser.save();

//     res.json({ message: 'User unblocked successfully' });
//   } catch (error) {
//     console.error('Error unblocking user:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });


// // Check block status
// app.get('/blockStatus/:username', authenticateToken, async (req, res) => {
//   try {
//     const { username } = req.params;
//     const currentUserId = req.user.userId; 
//     const currentUser = await Profile.findOne({ userId: currentUserId });
//     const userToCheck= await Profile.findOne({ username: username });
//     if (!userToCheck) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isBlocked = currentUser.blockedUsers.some(blockedUser => blockedUser.userId.toString() === userToCheck.userId.toString());
//     res.json({ isBlocked });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/blockusers/:userId', authenticateToken, async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await Profile.findOne({ userId: userId }).populate('blockedUsers');
    
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const blockuserIds = user.blockedUsers.map(blocks => blocks._id.toString());
//     res.json(blockuserIds);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
// app.get('/blockeduserdetails/:userId', authenticateToken, async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     // Ensure that blockedUsers is populated correctly
//     const user = await Profile.findOne({ userId: userId }).populate('blockedUsers.userId', 'username profileImage');

//     if (!user) {
//       return res.status(404).send('User not found');
//     }
    
//     res.json(user.blockedUsers);
//   } catch (err) {
//     console.error('Error fetching blocked user details:', err);
//     res.status(500).send('Server error');
//   }
// });

app.use('/api/block', blockRoutes);




// Feature extraction functions
// const extractPostFeatures = (post) => {
//   const contentWords = post.postContent.split(" ").map(word => word.toLowerCase());
//   const tags = post.tags ? post.tags.split('#').map(tag => tag.trim().toLowerCase()).filter(tag => tag !== '') : [];
//   return { contentWords, tags };
// };

// const extractProfileFeatures = (profile) => {
//   const industries = profile.industries ? profile.industries.map(industry => industry.toLowerCase()) : [];
//   const skillSets = profile.skillSets ? profile.skillSets.flatMap(skillSet => skillSet.skills.flatMap(skill => skill.toLowerCase().split(" "))) : [];
//   console.log({ industries, skillSets });
//   return { industries, skillSets };
// };

// // Function to vectorize features into a bag-of-words model
// const vectorizeFeatures = (features, vocabulary) => {
//   const vector = Array(vocabulary.length).fill(0);
//   features.forEach(feature => {
//     const index = vocabulary.indexOf(feature);
//     if (index !== -1) {
//       vector[index] += 1;
//     }
//   });
//   return vector;
// };

// // Function to calculate cosine similarity
// const cosineSimilarity = (vecA, vecB) => {
//   const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
//   const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
//   const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
 
//   return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  
// };

// const recommendPosts = async (profileId) => {
//   const profile = await Profile.findById(profileId);
//   const userId = profile.userId._id;

//   if (!profile) {
//     throw new Error('Profile not found');
//   }

//   // Fetch the user's followers
//   const user = await Profile.findOne({userId});
  
//   const followerIds = user.followers.map(follower => follower._id.toString());

//   const profileFeatures = extractProfileFeatures(profile);
//   const vocabulary = [...new Set([...profileFeatures.industries, ...profileFeatures.skillSets])];
//   const profileVector = vectorizeFeatures([...profileFeatures.industries, ...profileFeatures.skillSets], vocabulary);

//   // Fetch public posts not created by the user and not from followers
//   const posts = await Post.find({
//     postPrivacy: "public",
//     userId: { $ne: userId}
//   });


//   const postsWithScores = posts.map(post => {
//     const postFeatures = extractPostFeatures(post);
//     const postVector = vectorizeFeatures([...postFeatures.contentWords, ...postFeatures.tags], vocabulary);
//     const similarityScore = cosineSimilarity(profileVector, postVector);
//     return { post, similarityScore };
//   });

//   const recommendedPosts = postsWithScores
//     .filter(({ similarityScore }) => similarityScore > 0)
//     .sort((a, b) => b.similarityScore - a.similarityScore);

//   return recommendedPosts.map(({ post }) => post);
// };

// // Endpoint to get recommended posts
// app.get('/recommend/post',authenticateToken, async (req, res) => {
//   try {
//     console.log("recommendation");
//     const userId = req.user.userId;
//     const profile = await Profile.findOne({ userId:userId });
//     const recommendedPosts = await recommendPosts(profile._id);
//     res.status(200).json({ posts: recommendedPosts });
//   } catch (error) {
//     console.error('Error in /recommend/post/:profileId endpoint:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/recommend/users', authenticateToken, async (req, res) => {
//   try {
//     const userProfile = await Profile.findOne({ userId: req.user.userId });
//     if (!userProfile) {
//       return res.status(404).json({ error: 'User profile not found.' });
//     }

//     const followingIds = userProfile.following.map(following => following._id.toString());
//     const allUsers = await Profile.find({ userId: { $ne: req.user.userId } });
//     const profileFeatures = extractProfileFeatures(userProfile);
//   const vocabulary = [...new Set([...profileFeatures.industries, ...profileFeatures.skillSets])];
//   const profileVector = vectorizeFeatures([...profileFeatures.industries, ...profileFeatures.skillSets], vocabulary);


//   const similarUsers = allUsers
//   .filter(otherUserProfile => !followingIds.includes(otherUserProfile.userId.toString())) // Exclude followers
//   .map(otherUserProfile => {
//     const otherUserProfileFeatures = extractProfileFeatures(otherUserProfile);
//     const otherProfileVector = vectorizeFeatures([...otherUserProfileFeatures.industries, ...otherUserProfileFeatures.skillSets], vocabulary);
//     const similarityScore = cosineSimilarity(profileVector, otherProfileVector);
//     console.log(otherUserProfile, similarityScore);
//     return { user: otherUserProfile, similarity: similarityScore };
//   })
  
//   .sort((a, b) => b.similarity - a.similarity)
//   .slice(0, 10);
// console.log(similarUsers);

//     res.status(200).json(similarUsers);
//   } catch (error) {
//     console.error('Error fetching user recommendations:', error);
//     res.status(500).json({ error: 'Failed to fetch user recommendations.' });
//   }
// });

// app.get("/getallprofiles", authenticateToken, async (req, res) => {
//   try {
//     const profiles = await Profile.find();
//     res.json(profiles);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/getallposts',authenticateToken, async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Search profiles
// app.get('/profiles', authenticateToken, async (req, res) => {
//   try {
//     const query = req.query.search.toLowerCase();
//     const profiles = await Profile.find({
//       $or: [
//         { fullName: new RegExp(query, 'i') },
//         { username: new RegExp(query, 'i') },
//         { email: new RegExp(query, 'i') },
//         { bio: new RegExp(query, 'i') },
//         { experience: new RegExp(query, 'i') },
//         { education: new RegExp(query, 'i') },
//         { achievements: new RegExp(query, 'i') },
//         { designation: new RegExp(query, 'i') },
//         { company: new RegExp(query, 'i') },
//         { industries: new RegExp(query, 'i') },
//         { employment: new RegExp(query, 'i') },
//       ],
//     });
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Search posts
// app.get('/posts', authenticateToken, async (req, res) => {
//   try {
//     const query = req.query.search.toLowerCase();
//     const posts = await Post.find({
//       $or: [
//         { postContent: new RegExp(query, 'i') },
//         { tags: new RegExp(query, 'i') },
//       ],
//     }).populate('userId', 'fullName username');
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// // Search projects
// app.get('/projects', authenticateToken, async (req, res) => {
//   try {
//     const searchQuery = req.query.search.toLowerCase();
//     const projects = await Project.find({ 
//       $or: [
//         { username: new RegExp(query, 'i') },
//         { startupStage: new RegExp(query, 'i') },
//         { fundingStatus: new RegExp(query, 'i') },
//         { content: new RegExp(query, 'i') },
//         { problem: new RegExp(query, 'i') },
//         { solution: new RegExp(query, 'i') },
//         { designation: new RegExp(query, 'i') },
//         { patent: new RegExp(query, 'i') },
//         { industries: new RegExp(query, 'i') },
//         { roles: new RegExp(query, 'i') },
//       ],
//      });
//      console.log(projects);
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


app.use('/api/search', searchRoutes);




// Algorithm for recommendation of projects

// Extraction of features
// const extractProjectFeatures = (project) => {
//   const industries = project.industries
//     ? project.industries.map((industry) => industry.toLowerCase())
//     : [];
//   const skills = project.roles
//     ? project.roles.flatMap((role) =>
//         role.skills.map((skill) => skill.toLowerCase())
//       )
//     : [];
//   const fundingStatus = project.fundingStatus
//     ? [project.fundingStatus.toLowerCase()]
//     : [];
//   const startupStage = project.startupStage
//     ? [project.startupStage.toLowerCase()]
//     : [];
//   const patent = project.patent ? [project.patent.toLowerCase()] : [];
// // console.log({ industries, skills, fundingStatus, startupStage, patent });
//   return { industries, skills, fundingStatus, startupStage, patent };
// };

// const extractProfileFeatures = (profile) => {
//   const industries = profile.industries
//     ? profile.industries.map((industry) => industry.toLowerCase())
//     : [];
//     // console.log(industries);
//   const skillSets = profile.skillSets
//     ? profile.skillSets.flatMap((skillSet) =>
//         skillSet.skills.flatMap((skill) => skill.toLowerCase().split(" "))
//       )
//     : [];
//     // console.log(skillSets);
//   return { industries, skillSets };
// };

// // Vectorizing Features
// const vectorizeFeatures = (features, vocabulary) => {
//   const vector = Array(vocabulary.length).fill(0);
//   features.forEach((feature) => {
//     const index = vocabulary.indexOf(feature);
//     if (index !== -1) {
//       vector[index] += 1;
//     }
//   });
//   return vector;
// };

// // Calculating Cosine Similarity
// const cosineSimilarity = (vecA, vecB) => {
//   const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
//   const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
//   const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

//   return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
// };

// const recommendProjects = async (profileId) => {
//   const profile = await Profile.findById(profileId);
//   const userId = profile.userId._id;

//   if (!profile) {
//     throw new Error("Profile not found");
//   }

//   // Fetch the user's followers
//   const user = await Profile.findOne({ userId });
//   console.log(user);

//   const followerIds = user.followers.map((follower) => follower._id.toString());

//   const profileFeatures = extractProfileFeatures(profile);
//   const vocabulary = [
//     ...new Set([...profileFeatures.industries, ...profileFeatures.skillSets]),
//   ];
//   const profileVector = vectorizeFeatures(
//     [...profileFeatures.industries, ...profileFeatures.skillSets],
//     vocabulary
//   );

//   // Fetch public posts not created by the user and not from followers
//   const projects = await Project.find({
//     postPrivacy: "public",
//     userId: { $ne: userId },
//   });
// console.log(projects);
//   const projectsWithScores = projects.map((project) => {
//     const projectFeatures = extractProjectFeatures(project);
//     const projectVector = vectorizeFeatures(
//       [...projectFeatures.industries,
//         ...projectFeatures.skills,
//             ...projectFeatures.fundingStatus,
//             ...projectFeatures.startupStage,
//             ...projectFeatures.patent],
//       vocabulary
//     );
    
//     const similarityScore = cosineSimilarity(profileVector, projectVector);
//     console.log({ project, similarityScore })
//     return { project, similarityScore };
//   });

//   const recommendedProjects = projectsWithScores
//     // .filter(({ similarityScore }) => similarityScore > 0)
//     .sort((a, b) => b.similarityScore - a.similarityScore)
//     .slice(0, 10);

//   return recommendedProjects.map(({ project }) => project);
// };

// // Endpoint to get recommended posts
// app.get("/recommend/project", authenticateToken, async (req, res) => {
//   try {
//     console.log("recommendation");
//     const userId = req.user.userId;
//     const profile = await Profile.findOne({ userId: userId });
//     const recommendedProjects = await recommendProjects(profile._id);
//     res.status(200).json({ projects: recommendedProjects });
//   } catch (error) {
//     console.error(
//       "Error in /recommend/project/:profileId endpoint:",
//       error.message
//     );
//     res.status(500).json({ error: error.message });
//   }
// });

app.use('/api', recommendationRoutes);


// Protected endpoint example


// Start the server
const port = 9002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
