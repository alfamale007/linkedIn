import axios from 'axios';

const API_URL = 'http://localhost:5000/api/accounts';

// Fetch all accounts
export const getAccounts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new account
export const createAccount = async (accountData) => {
  const response = await axios.post(API_URL, accountData);
  return response.data;
};

// Delete an account
export const deleteAccount = async (accountId) => {
  const response = await axios.delete(`${API_URL}/${accountId}`);
  return response.data;
};
