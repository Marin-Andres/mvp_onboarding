import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, createProduct, updateProduct } from "../services/productService";
import {
  Table,
  Button,
  Icon,
  Pagination,
  Dropdown
} from "semantic-ui-react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: '',
    price: '',
  });
  const [editIsDisabled, setEditIsDisabled] = useState(true);

  const [sortColumn, setSortColumn] = useState('Name');
  const [sortDirection, setSortDirection] = useState('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [
    { key: 10, text: '10', value: 10 },
    { key: 20, text: '20', value: 20 },
    { key: 50, text: '50', value: 50 },
  ];

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  }

  const fetchProducts = async (currentPage, pageSize, sortColumn, sortDirection) => {
    try {
      const data = await getProducts(currentPage, pageSize, sortColumn, sortDirection);
      if (data?.items?.length > 0) {
        setProducts(data?.items);
        setTotalCount(data?.totalCount);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedProduct && selectedProduct?.id) {
        await deleteProduct(selectedProduct?.id);
        setProducts(products.filter((product) => product.id !== selectedProduct?.id));
      }
    }
    catch (error) {
      console.error("Failed to delete product", error);
    }
    finally {
      setDeleteOpen(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      let newProduct = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price
      };

      if (newProduct && newProduct?.id) {
        await updateProduct(selectedProduct.id, newProduct);
        fetchProducts();
      }
    }
    catch (error) {
      console.error("Failed to update product", error);
    }
    finally {
      setEditOpen(false);
    }
  };

  const handleNewSubmit = async () => {
    try {
      let newProduct = {
        id: "0",
        name: selectedProduct.name,
        price: selectedProduct.price
      };
      setSelectedProduct(newProduct);

      if (newProduct) {
        await createProduct(newProduct);
        fetchProducts();
      }
    }
    catch (error) {
      console.error("Failed to add new product", error);
    }
    finally {
      setNewOpen(false);
    }
  };

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const confirmEdit = (product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const confirmNewSubmit = () => {
    const product = { id: "0", name: "", price: "" };
    setSelectedProduct(product);
    setNewOpen(true);
  };


  const handleNameChange = (event) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      name: event.target.value,
    }));
  };

  const handlePriceChange = (event) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      price: event.target.value,
    }));
  };

  const invalidSelectedProduct = () => {
    if ((selectedProduct.name === "") || (selectedProduct.price === "")) {
      return true;
    }
    if (isNaN(selectedProduct.price)) {
      return true;
    }
    if (selectedProduct.price < 0) {
      return true;
    }
    return false;
  }


  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const handlePageSizeChange = (e, { value }) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page on page size change
  };

  useEffect(() => {
    fetchProducts(currentPage, pageSize, sortColumn, sortDirection);
  }, [currentPage, pageSize, sortColumn, sortDirection]);

  useEffect(() => {
    setEditIsDisabled(invalidSelectedProduct);
  }, [selectedProduct]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button onClick={confirmNewSubmit} primary floated="left">
        New Product
      </Button>
      <Table className="ui celled table" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
              &nbsp;
              <Icon
                name={'fitted caret down'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Name' && sortDirection === 'desc' ? 1 : 0.5 }}
                onClick={() => handleSort('Name', 'desc')}
              />
              <Icon
                name={'fitted caret up'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Name' && sortDirection === 'asc' ? 1 : 0.5 }}
                onClick={() => handleSort('Name', 'asc')}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Price
              &nbsp;
              <Icon
                name={'fitted caret down'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Price' && sortDirection === 'desc' ? 1 : 0.5 }}
                onClick={() => handleSort('Price', 'desc')}
              />
              <Icon
                name={'fitted caret up'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Price' && sortDirection === 'asc' ? 1 : 0.5 }}
                onClick={() => handleSort('Price', 'asc')}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => confirmEdit(product)}>
                  <Icon name="edit" /> EDIT
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => confirmDelete(product)}>
                  <Icon name="trash" /> DELETE
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Dropdown
          compact
          selection
          options={pageSizeOptions}
          value={pageSize}
          onChange={handlePageSizeChange}
        />
        <Pagination
          activePage={currentPage}
          totalPages={Math.ceil(totalCount / pageSize)}
          onPageChange={handlePageChange}
          ellipsisItem={null}
          prevItem={null}
          nextItem={null}
          firstItem={null}
          lastItem={null}
        />
      </div>

      {/* modal window for delete product */}
      <DeleteModal
        itemName="product"
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        handleDelete={handleDelete}
      />

      {/* modal window for new product */}
      <EditModal
        modalAction="Create"
        itemName="product"
        fieldName="Price"
        editOpen={newOpen}
        setEditOpen={setNewOpen}
        handleEditSubmit={handleNewSubmit}
        handleNameChange={handleNameChange}
        handleFieldChange={handlePriceChange}
        editIsDisabled={editIsDisabled}
      />

      {/* modal window for edit product */}
      <EditModal
        modalAction="Edit"
        itemName="product"
        fieldName="Price"
        nameValue={selectedProduct.name}
        fieldValue={selectedProduct.price}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        handleEditSubmit={handleEditSubmit}
        handleNameChange={handleNameChange}
        handleFieldChange={handlePriceChange}
        editIsDisabled={editIsDisabled}
      />
    </div>
  );
};

export default ProductTable;
