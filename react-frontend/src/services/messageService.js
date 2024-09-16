import axios from 'axios';

const API_URL = 'http://localhost:5000/api/messages';

// Fetch all messages
export const getMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new message
export const createMessage = async (messageData) => {
  const response = await axios.post(API_URL, messageData);
  return response.data;
};

// Delete a message
export const deleteMessage = async (messageId) => {
  const response = await axios.delete(`${API_URL}/${messageId}`);
  return response.data;
};
