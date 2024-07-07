import Notification from '../models/Notification.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';

// Show interest in a project
export const showInterest = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId }).populate("userId");
    const username = profile.username;
    const project = await Project.findById(projectId);
    const projectowner = project.username;

    const ownerNotification = new Notification({
      recipient: project.userId,
      sender: userId,
      message: `${username} is interested in your project: ${project.concept}`,
      projectId,
      status: "RequestSent",
      type: "interestRequest",
    });

    await ownerNotification.save();
    // Create a notification for the user who showed interest
    const userNotification = new Notification({
      recipient: userId,
      sender: project.userId,
      message: "Your interest has been successfully sent.",
      projectId,
      status: "RequestSent",
      type: "interestConfirmation",
    });

    await userNotification.save();

    res.status(200).send({ message: "Interest shown successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Approve interest in a project
export const approveInterest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    const project = await Project.findById(notification.projectId);

    // Create a notification for the user who showed interest
    notification.recipient = notification.sender;
      notification.sender = project.userId;
      notification.message = `Your interest in the project ${project.concept} has been approved.`;
      notification.status = "Approved";
      notification.type = 'interestApproval';
  
      await notification.save();
      io.to(notification.sender).emit('receiveNotification', notification);


    res.status(200).send({ message: "Interest approved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the userId from req.params

    const notifications = await Notification.find({ recipient: userId }).sort({ timestamp: -1 });
    res.status(200).send(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send({ message: "An error occurred while fetching notifications" });
  }
};

// Send an invitation
export const sendInvitation = async (req, res) => {
  console.log("invitation");
  try {
    const { id: projectId, inuserId } = req.params;
    const userId = req.user.userId;

    const profile = await Profile.findOne({ userId }).populate("userId");
    const project = await Project.findById(projectId);

    if (!profile || !project) {
      return res.status(404).json({ message: 'Profile or project not found' });
    }

    // Create a notification for the project owner
    const ownerNotification = new Notification({
      recipient: project.userId,
      sender: userId,
      message: 'Invitation sent',
      projectId,
      status: "InvitationSent",
      type: 'InvitationRequest',
    });

    await ownerNotification.save();

    // Create a notification for the user who showed interest
    const userNotification = new Notification({
      recipient: inuserId,
      sender: userId,
      message: 'You have got an invitation',
      projectId,
      status: "InvitationSent",
      type: 'InvitationConfirmation',
    });

    await userNotification.save();

    res.status(200).send({ message: 'Invitation sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Approve an invitation
export const approveInvitation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    const project = await Project.findById(notification.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    notification.message = `You have approved the project ${project.concept} by ${project.username}.`;
    notification.status = "Approved";
    notification.type = 'InvitationConfirmation';

    await notification.save();

    // Emitting the notification to the sender (if using Socket.io)
    io.to(notification.sender).emit('receiveNotification', notification);

    res.status(200).send({ message: 'Invitation approved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
