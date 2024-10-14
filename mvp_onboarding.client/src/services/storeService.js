import api from './api';

// Get all stores
export const getStores = async (pageNumber, pageSize, sortColumn, sortDirection) => {
  try {
    const response = await api.get('/Store', {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDirection,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting stores:', error);
    throw error;
  }
};

// Get store 
export const getStore = async (id) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
      throw "Invalid store id.";
    }
    else {    
      const response = await api.get(`/Store/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error getting store with ID ${id}:`, error);
    throw error;
  }
};

// Create new store
export const createStore = async (storeData) => {
  try {
    const response = await api.post('/Store', storeData);
    return response.data;
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
};

// Update store
export const updateStore = async (id, storeData) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
      throw "Invalid store id.";
    }
    else {    
      const response = await api.put(`/Store/${id}`, storeData);
      return response.data;
    }
  } catch (error) {
    console.error(`Error updating store with ID ${id}:`, error);
    throw error;
  }
};

// Delete store
export const deleteStore = async (id) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
      throw "Invalid store id.";
    }
    else {
      const response = await api.delete(`/Store/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error deleting store with ID ${id}:`, error);
    throw error;
  }
};
