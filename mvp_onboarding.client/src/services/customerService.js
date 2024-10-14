import api from './api';

// Get all customers
export const getCustomers = async (pageNumber, pageSize, sortColumn, sortDirection) => {
  try {
    const response = await api.get('/Customer', {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDirection,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting customers:', error);
    throw error;
  }
};

// Get customer 
export const getCustomer = async (id) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
      throw "Invalid customer id.";
    }
    else {
      const response = await api.get(`/Customer/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error getting customer with ID ${id}:`, error);
    throw error;
  }
};

// Create new customer
export const createCustomer = async (customerData) => {
  try {
    const response = await api.post('/Customer', customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Update customer
export const updateCustomer = async (id, customerData) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
        throw "Invalid customer id.";
      }
      else {
        const response = await api.put(`/Customer/${id}`, customerData);
        return response.data;
      }
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    throw error;
  }
};

// Delete customer
export const deleteCustomer = async (id) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
        throw "Invalid customer id.";
      }
      else {
        const response = await api.delete(`/Customer/${id}`);
        return response.data;
      }
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    throw error;
  }
};
