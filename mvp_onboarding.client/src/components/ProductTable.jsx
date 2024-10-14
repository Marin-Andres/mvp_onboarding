import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, createProduct, updateProduct } from "../services/productService";
import {
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Input,
  Pagination,
  Dropdown
} from "semantic-ui-react";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createIsDisabled, setCreateIsDisabled] = useState(true);
  const [editIsDisabled, setEditIsDisabled] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedName, setSelectedName] = useState("");

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
      if (selectedProduct && selectedPrice?.id) {
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
        name: selectedName,
        price: selectedPrice
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
        name: selectedName,
        price: selectedPrice
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
    setSelectedName(product.name);
    setSelectedPrice(product.price);
    setEditOpen(true);
  };

  const confirmNewSubmit = () => {
    const product = { id: "0", name: "", price: "" };
    setSelectedName("");
    setSelectedPrice("");
    setSelectedProduct(product);
    setNewOpen(true);
  };


  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const invalidSelectedProduct = () => {
    if ((selectedName === "") || (selectedPrice === "")) {
      return true;
    }
    if (isNaN(selectedPrice)) {
      return true;
    }
    if (selectedPrice < 0) {
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
    setCreateIsDisabled(invalidSelectedProduct);
    setEditIsDisabled(invalidSelectedProduct);
  }, [selectedPrice, selectedName]);

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
      <Modal
        dimmer="blurring"
        size="tiny"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Modal.Header>Delete product</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setDeleteOpen(false)}>
            cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            delete
          </Button>
        </Modal.Actions>
      </Modal>

      {/* modal window for new product */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={newOpen}
        onClose={() => setNewOpen(false)}
      >
        <Modal.Header>Create product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleNewSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="productName"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </Form.Field>
            <Form.Field>
              <label>PRICE</label>
              <Input
                type="text"
                name="productPrice"
                placeholder="Price"
                onChange={handlePriceChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setNewOpen(false)}>
            cancel
          </Button>
          <Button positive onClick={handleNewSubmit} type="submit" disabled={createIsDisabled}>
            create &nbsp;
            <Icon name="checkmark" />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* modal window for edit product */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <Modal.Header>Edit product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleEditSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="productName"
                placeholder="Name"
                onChange={handleNameChange}
                value={selectedName}
              />
            </Form.Field>
            <Form.Field>
              <label>PRICE</label>
              <Input
                type="text"
                name="productPrice"
                placeholder="Price"
                onChange={handlePriceChange}
                value={selectedPrice}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setEditOpen(false)}>
            cancel
          </Button>
          <Button positive onClick={handleEditSubmit} type="submit" disabled={editIsDisabled}>
            edit &nbsp;
            <Icon name="checkmark" />
          </Button>

        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ProductTable;
