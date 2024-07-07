// import Profile from '../models/Profile.js';
// import Project from '../models/Project.js';

// // Extraction of features
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
//   return { industries, skills, fundingStatus, startupStage, patent };
// };

// const extractProfileFeatures = (profile) => {
//   const industries = profile.industries
//     ? profile.industries.map((industry) => industry.toLowerCase())
//     : [];
//   const skillSets = profile.skillSets
//     ? profile.skillSets.flatMap((skillSet) =>
//         skillSet.skills.flatMap((skill) => skill.toLowerCase().split(' '))
//       )
//     : [];
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
//     throw new Error('Profile not found');
//   }

//   // Fetch the user's followers
//   const user = await Profile.findOne({ userId });
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
//     postPrivacy: 'public',
//     userId: { $ne: userId },
//   });

//   const projectsWithScores = projects.map((project) => {
//     const projectFeatures = extractProjectFeatures(project);
//     const projectVector = vectorizeFeatures(
//       [
//         ...projectFeatures.industries,
//         ...projectFeatures.skills,
//         ...projectFeatures.fundingStatus,
//         ...projectFeatures.startupStage,
//         ...projectFeatures.patent,
//       ],
//       vocabulary
//     );

//     const similarityScore = cosineSimilarity(profileVector, projectVector);
//     return { project, similarityScore };
//   });

//   const recommendedProjects = projectsWithScores
//     .sort((a, b) => b.similarityScore - a.similarityScore)
//     .slice(0, 10);

//   return recommendedProjects.map(({ project }) => project);
// };

// // Endpoint to get recommended projects
// export const getRecommendedProjects = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const profile = await Profile.findOne({ userId: userId });
//     const recommendedProjects = await recommendProjects(profile._id);
//     res.status(200).json({ projects: recommendedProjects });
//   } catch (error) {
//     console.error('Error in /recommend/project endpoint:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Post from "../models/Post.js"; // Assuming there's a Post model

// Extraction of Project features
const extractProjectFeatures = (project) => {
  console.log(project);
  const industries = project.industries
    ? project.industries.map((industry) => industry.toLowerCase())
    : [];
  const skills = project.roles
    ? project.roles.flatMap((role) =>
        role.skills.map((skill) => skill.toLowerCase())
      )
    : [];
  const fundingStatus = project.fundingStatus
    ? [project.fundingStatus.toLowerCase()]
    : [];
  const startupStage = project.startupStage
    ? [project.startupStage.toLowerCase()]
    : [];
  const patent = project.patent ? [project.patent.toLowerCase()] : [];
  return { industries, skills, fundingStatus, startupStage, patent };
};

// Extraction of Profile Features
const extractProfileFeatures = (profile) => {
  const industries = profile.industries
    ? profile.industries.map((industry) => industry.toLowerCase())
    : [];
  const skillSets = profile.skillSets
    ? profile.skillSets.flatMap((skillSet) =>
        skillSet.skills.flatMap((skill) => skill.toLowerCase().split(" "))
      )
    : [];
  console.log({ industries, skillSets });
  return { industries, skillSets };
};

// Extraction of Posts Features
const extractPostFeatures = (post) => {
  const contentWords = post.postContent
    .split(" ")
    .map((word) => word.toLowerCase());
  const tags = post.tags
    ? post.tags
        .split("#")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag !== "")
    : [];
  return { contentWords, tags };
};

// Vectorizing Features
const vectorizeFeatures = (features, vocabulary) => {
  const vector = Array(vocabulary.length).fill(0);
  features.forEach((feature) => {
    const index = vocabulary.indexOf(feature);
    if (index !== -1) {
      vector[index] += 1;
    }
  });
  return vector;
};

// Calculating Cosine Similarity
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

const recommendProjects = async (profileId) => {

  const profile = await Profile.findById(profileId);
  const userId = profile.userId._id;

  if (!profile) {
    throw new Error("Profile not found");
  }

  // Fetch the user's followers
  const user = await Profile.findOne({ userId });
  const followerIds = user.followers.map((follower) => follower._id.toString());

  const profileFeatures = extractProfileFeatures(profile);
  const vocabulary = [
    ...new Set([...profileFeatures.industries, ...profileFeatures.skillSets]),
  ];
  const profileVector = vectorizeFeatures(
    [...profileFeatures.industries, ...profileFeatures.skillSets],
    vocabulary
  );

  // Fetch public posts not created by the user and not from followers
  const projects = await Project.find({
    postPrivacy: "public",
    userId: { $ne: userId },
  });

  const projectsWithScores = projects.map((project) => {
    const projectFeatures = extractProjectFeatures(project);
    const projectVector = vectorizeFeatures(
      [
        ...projectFeatures.industries,
        ...projectFeatures.skills,
        ...projectFeatures.fundingStatus,
        ...projectFeatures.startupStage,
        ...projectFeatures.patent,
      ],
      vocabulary
    );

    const similarityScore = cosineSimilarity(profileVector, projectVector);
    return { project, similarityScore };
  });

  const recommendedProjects = projectsWithScores
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 10);

  return recommendedProjects.map(({ project }) => project);
};

const recommendPosts = async (profileId) => {
  const profile = await Profile.findById(profileId);
  const userId = profile.userId._id;

  if (!profile) {
    throw new Error("Profile not found");
  }

  // Fetch the user's followers
  const user = await Profile.findOne({ userId });
  const followerIds = user.followers.map((follower) => follower._id.toString());

  const profileFeatures = extractProfileFeatures(profile);
  const vocabulary = [
    ...new Set([...profileFeatures.industries, ...profileFeatures.skillSets]),
  ];
  const profileVector = vectorizeFeatures(
    [...profileFeatures.industries, ...profileFeatures.skillSets],
    vocabulary
  );

  // Fetch public posts not created by the user and not from followers
  const posts = await Post.find({
    postPrivacy: "public",
    userId: { $ne: userId },
  });

  const postsWithScores = posts.map((post) => {
    const postFeatures = extractPostFeatures(post);
    const postVector = vectorizeFeatures(
      [...postFeatures.contentWords, ...postFeatures.tags],
      vocabulary
    );
    const similarityScore = cosineSimilarity(profileVector, postVector);
    return { post, similarityScore };
  });

  const recommendedPosts = postsWithScores
    .filter(({ similarityScore }) => similarityScore > 0)
    .sort((a, b) => b.similarityScore - a.similarityScore);

  return recommendedPosts.map(({ post }) => post);
};

const recommendUsers = async (userId) => {
  const userProfile = await Profile.findOne({ userId });
  if (!userProfile) {
    throw new Error("User profile not found.");
  }

  const followingIds = userProfile.following.map((following) =>
    following._id.toString()
  );
  const allUsers = await Profile.find({ userId: { $ne: userId } });
  const profileFeatures = extractProfileFeatures(userProfile);
  const vocabulary = [
    ...new Set([...profileFeatures.industries, ...profileFeatures.skillSets]),
  ];
  const profileVector = vectorizeFeatures(
    [...profileFeatures.industries, ...profileFeatures.skillSets],
    vocabulary
  );

  const similarUsers = allUsers
    .filter(
      (otherUserProfile) =>
        !followingIds.includes(otherUserProfile.userId.toString())
    ) // Exclude followers
    .map((otherUserProfile) => {
      const otherUserProfileFeatures = extractProfileFeatures(otherUserProfile);
      const otherProfileVector = vectorizeFeatures(
        [
          ...otherUserProfileFeatures.industries,
          ...otherUserProfileFeatures.skillSets,
        ],
        vocabulary
      );
      const similarityScore = cosineSimilarity(
        profileVector,
        otherProfileVector
      );
      return { user: otherUserProfile, similarity: similarityScore };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 10);

  return similarUsers.map(({ user }) => user);
};

// Endpoint to get recommended projects
export const getRecommendedProjects = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId });
    const recommendedProjects = await recommendProjects(profile._id);
    console.log(recommendProjects);
    res.status(200).json({ projects: recommendedProjects });
  } catch (error) {
    console.error("Error in /recommend/project endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to get recommended posts
export const getRecommendedPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId });
    const recommendedPosts = await recommendPosts(profile._id);
    res.status(200).json({ posts: recommendedPosts });
  } catch (error) {
    console.error("Error in /recommend/post endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to get recommended users
export const getRecommendedUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recommendedUsers = await recommendUsers(userId);
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error fetching user recommendations:", error);
    res.status(500).json({ error: "Failed to fetch user recommendations." });
  }
};
