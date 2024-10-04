import api from './api';

// Get all sales
export const getSalesView = async () => {
  try {
    const response = await api.get('/SalesView');
    return response.data;
  } catch (error) {
    console.error('Error getting sales:', error);
    throw error;
  }
};