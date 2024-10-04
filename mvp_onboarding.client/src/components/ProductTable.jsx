import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, createProduct, updateProduct } from "../services/productService";
import {
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Input
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

  useEffect(() => {
    fetchProducts();
  }, []); //fetch list on mount

  useEffect(() => {
    setCreateIsDisabled(invalidSelectedProduct);
    setEditIsDisabled(invalidSelectedProduct);
  }, [selectedPrice, selectedName]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      if (data?.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct?.id);
        setProducts(products.filter((product) => product.id !== selectedProduct?.id));
        setDeleteOpen(false);
      }
      catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const handleEditSubmit = async () => {
    let newProduct = {
      id: selectedProduct.id,
      name: selectedName,
      price: selectedPrice
    };
    if (newProduct) {
      try {
        await updateProduct(selectedProduct.id, newProduct);
        fetchProducts();
      }
      catch (error) {
        console.error("Failed to update product", error);
      }
      setEditOpen(false);
    }

  }
  const handleNewSubmit = async () => {
    let newProduct = {
      id: "0",
      name: selectedName,
      price: selectedPrice
    };
    setSelectedProduct(newProduct);
    if (newProduct) {
      try {
        await createProduct(newProduct);
        fetchProducts();
      }
      catch (error) {
        console.error("Failed to add new product", error);
      }
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
    if (selectedName === "") {
      return true;
    }
    if (selectedPrice === "") {
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button onClick={confirmNewSubmit} primary floated="left">
        New Product
      </Button>
      <Table className="ui celled table" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
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
