import Profile from '../models/Profile.js';
import Post from '../models/Post.js';
import Project from '../models/Project.js';

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchProfiles = async (req, res) => {
  try {
    const query = req.query.search.toLowerCase();
    const profiles = await Profile.find({
      $or: [
        { fullName: new RegExp(query, 'i') },
        { username: new RegExp(query, 'i') },
        { email: new RegExp(query, 'i') },
        { bio: new RegExp(query, 'i') },
        { experience: new RegExp(query, 'i') },
        { education: new RegExp(query, 'i') },
        { achievements: new RegExp(query, 'i') },
        { designation: new RegExp(query, 'i') },
        { company: new RegExp(query, 'i') },
        { industries: new RegExp(query, 'i') },
        { employment: new RegExp(query, 'i') },
      ],
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const query = req.query.search.toLowerCase();
    const posts = await Post.find({
      $or: [
        { postContent: new RegExp(query, 'i') },
        { tags: new RegExp(query, 'i') },
      ],
    }).populate('userId', 'fullName username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchProjects = async (req, res) => {
  try {
    const searchQuery = req.query.search?.toLowerCase() || '';
    
    const projects = await Project.find({ 
      $or: [
        { username: new RegExp(searchQuery, 'i') },
        { startupStage: new RegExp(searchQuery, 'i') },
        { fundingStatus: new RegExp(searchQuery, 'i') },
        { content: new RegExp(searchQuery, 'i') },
        { problem: new RegExp(searchQuery, 'i') },
        { solution: new RegExp(searchQuery, 'i') },
        { designation: new RegExp(searchQuery, 'i') },
        { patent: new RegExp(searchQuery, 'i') },
        { industries: new RegExp(searchQuery, 'i') },
        { roles: new RegExp(searchQuery, 'i') },
      ],
    });

    console.log(projects);
    res.json(projects);
  } catch (error) {
    console.error('Error while searching projects:', error);
    res.status(500).json({ error: error.message });
  }
};
