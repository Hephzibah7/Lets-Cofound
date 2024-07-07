// import mongoose from 'mongoose';

// const MessageSchema = new mongoose.Schema({
//   conversationId: { type: String },
//   sender: { type: String },
//   text: { type: String },
// }, { timestamps: true });

// export default mongoose.model('messages', MessageSchema);


import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
