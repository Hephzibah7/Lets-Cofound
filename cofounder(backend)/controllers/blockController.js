import Profile from '../models/Profile.js';

// Block a user
export const blockUser = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user.userId; 
    const userToBlock = await Profile.findOne({ username: username });
    const currentUser = await Profile.findOne({ userId: currentUserId });
    if (!userToBlock) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!currentUser.blockedUsers.includes(userToBlock.userId)) {
      currentUser.blockedUsers.push({
        userId: userToBlock.userId,
        username: userToBlock.username,
        profileImage: userToBlock.profileImage
      });
      await currentUser.save();
    }

    res.json({ message: 'User blocked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Unblock a user
export const unblockUser = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user.userId; 
    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!currentUser) {
      return res.status(404).json({ message: 'Current user not found' });
    }

    const userToUnblock = await Profile.findOne({ username: username });

    if (!userToUnblock) {
      return res.status(404).json({ message: 'User to unblock not found' });
    }

    if (!currentUser.blockedUsers || !Array.isArray(currentUser.blockedUsers)) {
      return res.status(400).json({ message: 'Blocked users list is invalid' });
    }

    const initialBlockedUsersCount = currentUser.blockedUsers.length;

    currentUser.blockedUsers = currentUser.blockedUsers.filter(
      blockedUser => blockedUser.userId.toString() !== userToUnblock.userId.toString()
    );

    if (currentUser.blockedUsers.length === initialBlockedUsersCount) {
      return res.status(400).json({ message: 'User was not blocked' });
    }

    await currentUser.save();

    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Error unblocking user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check block status
export const checkBlockStatus = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user.userId; 
    const currentUser = await Profile.findOne({ userId: currentUserId });
    const userToCheck = await Profile.findOne({ username: username });
    if (!userToCheck) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isBlocked = currentUser.blockedUsers.some(blockedUser => blockedUser.userId.toString() === userToCheck.userId.toString());
    res.json({ isBlocked });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blocked users
export const getBlockedUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Profile.findOne({ userId: userId }).populate('blockedUsers');
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    const blockuserIds = user.blockedUsers.map(blocks => blocks._id.toString());
    res.json(blockuserIds);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get blocked user details
export const getBlockedUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Ensure that blockedUsers is populated correctly
    const user = await Profile.findOne({ userId: userId }).populate('blockedUsers.userId', 'username profileImage');

    if (!user) {
      return res.status(404).send('User not found');
    }
    
    res.json(user.blockedUsers);
  } catch (err) {
    console.error('Error fetching blocked user details:', err);
    res.status(500).send('Server error');
  }
};