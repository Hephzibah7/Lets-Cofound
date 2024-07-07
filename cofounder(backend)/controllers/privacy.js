import Privacy from '../models/Privacy.js';

// Update privacy setting
export const updatePrivacy = async (req, res) => {
  try {
    const privacy = await Privacy.findOneAndUpdate(
      { userId: req.user.userId },
      { isPrivate: req.body.isPrivate },
      { new: true, upsert: true } // Create if not exists
    );
    res.send(privacy);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get current privacy setting for a specific user
export const getPrivacy = async (req, res) => {
  try {
    let privacy = await Privacy.findOne({ userId: req.params.userId });
    if (!privacy) {
      // Create default privacy setting if not found
      const defaultPrivacy = new Privacy({ userId: req.params.userId, isPrivate: false });
      privacy = await defaultPrivacy.save();
    }
    res.send(privacy.isPrivate);
  } catch (error) {
    res.status(500).send(error);
  }
};
