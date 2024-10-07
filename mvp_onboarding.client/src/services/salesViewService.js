import api from './api';

// Get all sales
export const getSalesView = async (pageNumber, pageSize, sortColumn, sortDirection) => {
  try {
    const response = await api.get('/SalesView', {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDirection,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting sales:', error);
    throw error;
  }
};
