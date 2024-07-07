import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      bio,
      experience,
      education,
      achievements,
      designation,
      company,
      website,
      location,
      industries,
      skillSets,
      employment,
    } = req.body;

    const profile = new Profile({
      userId: req.user.userId,
      fullName,
      username,
      email,
      bio,
      experience,
      education,
      achievements,
      profileImage: req.files["profileImage"]
        ? req.files["profileImage"][0].filename
        : null,
      designation,
      company,
      backgroundImage: req.files["backgroundImage"]
        ? req.files["backgroundImage"][0].filename
        : null,
      website,
      location,
      industries,
      skillSets,
      employment,
    });

    await profile.save();

    res.status(200).json({ message: "Profile submitted successfully" });
  } catch (error) {
    console.error("Error submitting profile:", error);
    res
      .status(500)
      .json({ message: "Error storing data. Please try again later." });
  }
};

// check username availability
export const checkUsernameAvailability = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).send({ error: "Username is required" });
  }

  try {
    const profile = await Profile.findOne({ username });
    if (profile) {
      return res.status(200).send({ isAvailable: false });
    } else {
      return res.status(200).send({ isAvailable: true });
    }
  } catch (error) {
    console.error("Error checking username availability", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Fetch profile details
export const getProfileDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const profile = await Profile.findOne({ userId })
      .populate("userId")
      .populate("followers")
      .populate("following");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      username: profile.username,
      fullname: profile.fullName,
      email: profile.email,
      bio: profile.bio,
      backgroundImage: profile.backgroundImage,
      profileImage: profile.profileImage,
      location: profile.location,
      designation: profile.designation,
      company: profile.company,
      website: profile.website,
      industries: profile.industries,
      experience: profile.experience,
      education: profile.education,
      skills: profile.skillSets,
      achievements: profile.achievements,
      employment: profile.employment,
      followers: profile.followers,
      following: profile.following,
    });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

// Fetch chat profile details
export const getChatProfileDetails = async (req, res) => {
  try {
    console.log("hello");
    const { userIds } = req.body;
    console.log(req.body);
    const users = await Profile.find({ userId: { $in: userIds } });
    console.log(users);
    res.json(users);
  } catch (err) {
    console.error("Error fetching chat profile details:", err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching user details." });
  }
};

// Get followers of a user
export const getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Profile.findOne({ userId: userId }).populate('followers');
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    const followersIds = user.followers.map(follower => follower.userId.toString());
   
    res.json(followersIds);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get following of a user
export const getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Profile.findOne({ userId: userId }).populate('following');
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    const followersIds = user.followers.map(follower => follower._id.toString());
    res.json(followersIds);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get the User Details
export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.user; // Access userId from the authenticated token
    const profile = await Profile.findOne({ userId }).populate("userId");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // Return user details including username
    res.status(200).json({
      userId: profile.userId,
      username: profile.username,
      fullname: profile.fullName,
      bio: profile.bio, // Example: Include bio
      profileImage: profile.profileImage,
      designation: profile.designation,
      skills: profile.skillSets,
      // Add more fields as needed
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details" });
  }
};


// Check profile
export const checkProfile = async (req, res) => {
  try {
    
    const userId = req.params.userId;
    const profile = await Profile.findOne({ userId: userId });
    console.log(profile);
    if (profile) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get userdetails by username
export const getUserDetailsByUsername = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await Profile.findOne({ username: username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
};

// Get follow status by username
export const getFollowStatus = async (req, res) => {
  const { username } = req.params;
  const currentUserId = req.user.userId; // Assuming you have user ID from authentication middleware
  console.log(currentUserId);
  if (!currentUserId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const user = await Profile.findOne({ username });
    console.log(user);
    if (user) {
      const isFollowing = user.followers.some(follower => follower.userId.toString() === currentUserId.toString());
      console.log(isFollowing);
      res.json({ isFollowing });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching follow status' });
  }
};

// Follow user by username
export const followUser = async (req, res) => {
  const { username } = req.params;
  const currentUserId = req.user.userId; // Assuming you have user ID from authentication middleware

  try {
    const userToFollow = await Profile.findOne({ username });
    const currentUser = await Profile.findOne({ userId: currentUserId });
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push({  
        userId: currentUserId,
        username: currentUser.username,
        profileImage: currentUser.profileImage});
      userToFollow.followers = [...new Set(userToFollow.followers)];
      await userToFollow.save();
    } else {
      return res.status(400).json({ message: 'Already following this user' });
    }

    
    if (!currentUser) {
      return res.status(404).json({ message: 'Current user not found' });
    }

    if (!currentUser.following.includes(userToFollow.userId)) {
      currentUser.following.push({  
        userId: userToFollow.userId,
        username: userToFollow.username,
        profileImage: userToFollow.profileImage});
      currentUser.following = [...new Set(currentUser.following)];
      await currentUser.save();
      console.log("User followed");
      res.json({ message: 'User followed successfully' });
    } else {
      res.status(400).json({ message: 'Already following this user' });
    }
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ message: 'Error following user', error: error.message });
  }
};

// Unfollow user by username
export const unfollowUser = async (req, res) => {
  const { username } = req.params;
  const currentUserId = req.user.userId; // Assuming you have user ID from authentication middleware

  console.log('Current User ID:', currentUserId);
  console.log('Username to unfollow:', username);

  try {
    const user = await Profile.findOne({ username });
    if (!user) {
      console.error('User not found:', username);
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.followers.some(follower => follower.userId.toString() === currentUserId)) {
      console.error('Not following this user:', username);
      return res.status(400).json({ message: 'Not following this user' });
    }

    // Remove current user from the user's followers
    user.followers = user.followers.filter(follower => follower.userId.toString() !== currentUserId);
    await user.save();

     // Remove the user from the current user's following
     const currentUser = await Profile.findOne({ userId: currentUserId });
     if (!currentUser) {
       console.error('Current user profile not found:', currentUserId);
       return res.status(404).json({ message: 'Current user profile not found' });
     }
 
     currentUser.following = currentUser.following.filter(following => following.userId.toString() !== user._id.toString());
     await currentUser.save();
 
     res.json({ message: 'User unfollowed successfully' });
   } catch (error) {
     console.error('Error unfollowing user:', error);
     res.status(500).json({ message: 'Error unfollowing user' });
   }
};

export const getFollowersDetails = async(req, res) => {
  const { userId } = req.params;

  try {
    const user = await Profile.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followersDetails = user.followers.map(follower => ({
      userId: follower.userId,
      username: follower.username,
      profileImage: follower.profileImage
    }));

    res.json({ followers: followersDetails });
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ message: 'Error fetching followers', error: error.message });
  }
};

export const reportUsers = async(req, res) => {
  try {
    const { userId } = req.user; // Access userId from the authenticated token
    const { username } = req.params;

    // Find the profile of the current user
    const userProfile = await Profile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Check if the username is already in the reportUsers array
    if (!userProfile.reportUsers.includes(username)) {
      userProfile.reportUsers.push(username);
    } else {
      return res.status(400).json({ message: "User already reported" });
    }

    // Save the updated profile
    await userProfile.save();

    // Respond with the updated reportUsers array
    res.status(200).json({ message: "User Reported Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
