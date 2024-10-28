import api from './api';
import { idValidation } from '../util/validation';

// Get all sales
export const getSales = async () => {
  try {
    const response = await api.get('/Sale');
    return response.data;
  } catch (error) {
    console.error('Error getting sales:', error);
    throw error;
  }
};

// Get sale 
export const getSale = async (id) => {
  try {
    const isIdValid = idValidation(id);
    if (!isIdValid) { throw "Invalid sale id."; }
    const response = await api.get(`/Sale/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting sale with ID ${id}:`, error);
    throw error;
  }
};

// Create new sale
export const createSale = async (saleData) => {
  try {
    const response = await api.post('/Sale', saleData);
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};

// Update sale
export const updateSale = async (id, saleData) => {
  try {
    const isIdValid = idValidation(id);
    if (!isIdValid) { throw "Invalid sale id."; }
    const response = await api.put(`/Sale/${id}`, saleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating sale with ID ${id}:`, error);
    throw error;
  }
};

// Delete sale
export const deleteSale = async (id) => {
  try {
    const isIdValid = idValidation(id);
    if (!isIdValid) { throw "Invalid sale id."; }
    const response = await api.delete(`/Sale/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting sale with ID ${id}:`, error);
    throw error;
  }
};
