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


// Route setup
app.use('/api/auth', authRoutes);
app.use('/api', otpRoutes);

app.use('/api/conversations', conversationRoutes);
app.use('/api', messageRoutes);



// Storage multer
app.use('/uploads', express.static('uploads'));

// Saving of profile details
app.use('/api/profiles', profileRoutes);


app.use('/api/projects', projectRoutes);


app.use('/api/notifications', notificationRoutes);


app.use('/api/posts', postRoutes);


app.use('/api/message', messageRoutes);



// Initialize WebSocket controller
webSocketController(io);


app.use('/api/account', accountRoutes);


app.use('/api/story', storyRoutes);


app.use('/api/privacy', privacyRoutes);



app.use('/api/block', blockRoutes);



app.use('/api/search', searchRoutes);


app.use('/api', recommendationRoutes);


// Protected endpoint example


// Start the server
const port = 9002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
