import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Message from '../models/Message.js';

const webSocketController = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinProject", (projectId) => {
      socket.join(projectId);
      console.log(`Client joined project ${projectId}`);
    });

    socket.on("sendMessage", async (message) => {
      const { projectId, userId, content } = message;
      const profile = await Profile.findOne({ userId: userId });
      const newMessage = {
        userId,
        username: profile.username,
        profilePic: profile.profileImage,
        content,
        timestamp: new Date(),
      };

      try {
        const project = await Project.findById(projectId);
        if (project) {
          project.chatMessages.push(newMessage);
          await project.save();
          io.to(projectId).emit("receiveMessage", newMessage);
        }
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Handling generic message sending
    socket.on("sendChatMessage", async (data) => {
      const { sender, receiver, message } = data;
      const newMessage = new Message({ sender, receiver, message });
      try {
        await newMessage.save();
        io.emit("receiveMessage", data);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export default webSocketController;
