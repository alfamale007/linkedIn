const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.createMessage = async (req, res) => {
  const { content, sender } = req.body;
  try {
    const newMessage = new Message({ content, sender });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
