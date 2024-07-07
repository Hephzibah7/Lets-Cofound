import Project from "../models/Project.js";
import Profile from "../models/Profile.js";
import User from '../models/User.js';
import Notification from "../models/Notification.js";

export const createProject = async (req, res) => {
  const formData = req.body;
  const files = req.files;
  const userId = req.user.userId;

  try {
    const prof = await Profile.findOne({ userId });
    if (!prof) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const username = prof.username;
    const designation = prof.designation;
    const profileimageUrl = prof.profileImage;

    let roles;
    try {
      roles = JSON.parse(formData.roles);
      if (
        !Array.isArray(roles) ||
        !roles.every(
          (role) => role.name && Array.isArray(role.skills) && role.commitments
        )
      ) {
        throw new Error("Invalid format for roles");
      }
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON format for roles" });
    }

    const newProject = new Project({
      userId: userId,
      postPrivacy: formData.postPrivacy,
      username: username,
      designation: designation,
      profileimageUrl: profileimageUrl,
      concept: formData.concept,
      problem: formData.problem,
      solution: formData.solution,
      fundingStatus: formData.fundingStatus,
      startupStage: formData.startupStage,
      patent: formData.patent,
      roles: roles,
      industries: formData.industries
        ? formData.industries.split(",").map((industry) => industry.trim())
        : [],
      postImage: files.postImage ? files.postImage[0].filename : null,
      pitchDeck: files.pitchDeck ? files.pitchDeck[0].filename : null,
      location: formData.location,
      chatMessages: [], // Assuming chat messages will be added later
    });

    await newProject.save();
    res.status(200).json({ message: "Project form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { userId } = req.user; // Access userId from the authenticated token
    console.log(userId);
    const projects = await Project.find().populate("userId");

    // Filter posts
    const filteredPosts = [];
    for (let project of projects) {
      if (project.postPrivacy === "public" || project.userId._id.toString() === userId) {
        // Include all public posts
        filteredPosts.push(project);
       } else {
        const projectOwner = await Profile.findOne({ userId: project.userId._id });
        const isFollower = projectOwner.followers.some(follower => follower.userId.toString() === userId.toString());
    
        if (isFollower) {
          filteredPosts.push(project);
        }
      }
    }
    console.log(filteredPosts);
    res.status(200).json(filteredPosts);
  } catch (error) {
    res.status(500).json({ error });
  }

};

// New getProjectById function
export const getProjectById = async (req, res) => {
  try {
    console.log("ayash");
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new chat message to a project
export const addChatMessage = async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Fetch user details from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newMessage = {
      userId,
      username: user.username,
      profilePic: user.profilePic,
      content,
      timestamp: new Date(),
    };

    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.chatMessages.push(newMessage);
    await project.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error adding chat message', error });
  }
};

// Get chat messages for a project
export const getProjectChatMessages = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (project) {
      res.json(project.chatMessages);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat messages', error });
  }
};

// Get interested projects
export const getInterestedProjects = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch notifications where the recipient is the user and status is 'Approved'
    const notifications = await Notification.find({ recipient: userId, status: 'Approved' });

    // Extract projectIds from the notifications
    const projectIds = notifications.map(notification => notification.projectId);

    // Fetch projects based on the projectIds
    const projects = await Project.find({ _id: { $in: projectIds } });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching interested projects:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch different types of projects: - (Projects, My Projects, Requested Projects, Invited projects, Approved Projects)
// Get all projects of the current user
export const getUserProjects = async (req, res) => {
  try {
    
    const { userId } = req.user; // Access userId from the authenticated token

    const projects = await Project.find({ userId }).populate("userId");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error });
  }

};

// Get all projects in which the user has shown interest but not yet approved
export const getInterestRequests = async (req, res) => {
  try {
    const { userId } = req.user; // Access userId from the authenticated token

    // Fetch notifications with status "RequestSent" and sender as the current user
    const notifications = await Notification.find({
      status: "RequestSent",
      sender: userId,
    });

    // Extract projectIds from the notifications
    const projectIds = notifications.map(notification => notification.projectId);

    // Fetch projects corresponding to the extracted projectIds
    const projects = await Project.find({
      _id: { $in: projectIds },
    }).populate("userId");

    // Send the projects to the frontend
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error });
  }

};



// Get all projects where the current user has been approved
export const getApprovedProjects = async (req, res) => {
  try {
    const { userId } = req.user; // Access userId from the authenticated token

    // Fetch notifications with status "Approved" and recipient as the current user
    const notifications = await Notification.find({
      status: "Approved",
      recipient: userId,
    });

    // Extract projectIds from the notifications
    const projectIds = notifications.map(notification => notification.projectId);

    // Fetch projects corresponding to the extracted projectIds
    const projects = await Project.find({
      _id: { $in: projectIds },
    }).populate("userId");

    // Send the projects to the frontend
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error });
  }

};