import Story from '../models/Story.js';
import Profile from '../models/Profile.js';

// Upload a new story
export const uploadStory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const prof = await Profile.findOne({ userId });
    const username = prof.username;
    const profileImage = prof.profileImage;

    // Check if a story already exists for the user
    let story = await Story.findOne({ userId });

    if (story) {
      // If the story exists, add the new post to the existing posts array
      story.posts.push({ filepath: req.file.filename, caption: req.body.caption });
    } else {
      // If the story does not exist, create a new one
      story = new Story({
        userId: userId,
        username: username,
        profileImage: profileImage,
        posts: [{ filepath: req.file.filename, caption: req.body.caption }],
      });
    }

    // Save the story document
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload story.' });
  }
};

// Fetch all stories
export const getStories = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId });
    const followings = profile.following.map(f => f.userId);

    // Fetch stories from the user and their followings
    const stories = await Story.find({
      userId: { $in: [userId, ...followings] }
    });

    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories.' });
  }
};

// Delete a story by ID
export const deleteStory = async (req, res) => {
  const { id } = req.params;
  try {
    await Story.findByIdAndDelete(id);
    res.status(200).send({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error('Error deleting story:', err);
    res.status(500).send({ error: 'Failed to delete story. Please try again later.' });
  }
};
