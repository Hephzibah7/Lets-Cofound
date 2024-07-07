import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
// const secretKey = process.env.GOOGLE_CLIENT_SECRET;
const secretKey = "your_secret_key";

const CLIENT_ID =
  "903463189852-h50kjs3g1tm3l6t0oj6dmeqmq0m6tkme.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({
        message: "User Registered Successfully.",
        userId: savedUser._id,
      });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Error registering user. Please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials.");
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ userId: user._id, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in. Please try again later.");
  }
};

export const googleLogin = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if the user already exists
    let user = await User.findOne({ email });

    // If user does not exist, create a new user
    if (!user) {
      user = new User({ email, password: "google" });
      await user.save();
    }

    // Send success message and user ID back to the client
    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};

export const googleVerify = async (req, res) => {
  try {
    const { tokenId } = req.body;
    if (!tokenId) {
      return res.status(400).send("Token ID is required.");
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID, // Replace with your Google Client ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user in the database
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "7h",
    });
    console.log(token);
    console.log(req.body);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in. Please try again later.");
  }
};
