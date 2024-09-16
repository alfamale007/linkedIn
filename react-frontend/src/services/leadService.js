import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leads'; // Update if necessary

// Fetch all leads
export const getLeads = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new lead
export const createLead = async (leadData) => {
  const response = await axios.post(API_URL, leadData);
  return response.data;
};

// Delete a lead
export const deleteLead = async (leadId) => {
  const response = await axios.delete(`${API_URL}/${leadId}`);
  return response.data;
};
