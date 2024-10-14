import api from './api';

// Get all products
export const getProducts = async (pageNumber, pageSize, sortColumn, sortDirection) => {
  try {
    const response = await api.get('/Product', {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDirection,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Get product 
export const getProduct = async (id) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
      throw "Invalid product id.";
    }
    else {
      const response = await api.get(`/Product/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error getting product with ID ${id}:`, error);
    throw error;
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/Product', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
      throw "Invalid product id.";
    }
    else {
      const response = await api.put(`/Product/${id}`, productData);
      return response.data;
    }
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    if (!(Number.isInteger(id) && id >0)) {
      throw "Invalid product id.";
    }
    else {
      const response = await api.delete(`/Product/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
