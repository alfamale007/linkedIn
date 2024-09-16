const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
