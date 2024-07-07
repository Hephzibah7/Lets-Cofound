import User from '../models/User.js';
import Profile from '../models/Profile.js';
import bcrypt from 'bcrypt';

// Update email
export const updateEmail = async (req, res) => {
  const newEmail = req.body.email;

  if (!newEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const userId = req.user.userId;
    console.log(userId);
    await User.findByIdAndUpdate(userId, { email: newEmail });
    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating email" });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Old password and new password are required" });
  }

  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided old password with the hashed password in the database
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(`Error updating password: ${error.message}`);
    res.status(500).json({ message: "Error updating password" });
  }
};

// Update username
export const updateUsername = async (req, res) => {
  const newUsername = req.body.username;

  if (!newUsername) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const userId = req.user.userId;
    console.log(
      `Updating user ID: ${userId} with new username: ${newUsername}`
    );

    // Correctly use `findOneAndUpdate` with a query object
    await Profile.findOneAndUpdate({ userId }, { username: newUsername });

    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error(`Error updating username: ${error.message}`);
    res.status(500).json({ message: "Error updating username" });
  }
};
