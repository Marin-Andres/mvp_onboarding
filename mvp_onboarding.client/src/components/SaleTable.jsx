import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getSale, deleteSale, createSale, updateSale } from "../services/saleService";
import { getSalesView } from "../services/salesViewService";
import { getCustomers } from "../services/customerService";
import { getStores } from "../services/storeService";
import { getProducts } from "../services/productService";
import {
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Input
} from "semantic-ui-react";

const SaleTable = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedSaleView, setSelectedSaleView] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [createIsDisabled, setCreateIsDisabled] = useState(true);
  const [editIsDisabled, setEditIsDisabled] = useState(true);
  const [soldDate, setSoldDate] = useState(new Date());
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchSales();
    setCreateIsDisabled(invalidSelectedSale);
    setEditIsDisabled(invalidSelectedSale);
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSalesView();
      if (data?.length > 0) {
        setSales(data);
      }
    } catch (error) {
      console.error("Failed to fetch sales", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSale = async (id) => {
    let sale = null;
    try {
      sale = await getSale(id);
    } catch (error) {
      console.error("Failed to fetch sale", error);
      sale = null;
    } finally {
      return sale;
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      if (data?.length > 0) {
        setCustomers(data);
      }
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  const fetchStores = async () => {
    try {
      const data = await getStores();
      if (data?.length > 0) {
        setStores(data);
      }
    } catch (error) {
      console.error("Failed to fetch stores", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      if (data?.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleDelete = async () => {
    if (selectedSaleView) {
      try {
        await deleteSale(selectedSaleView?.id);
        setSales(sales.filter((sale) => sale.id !== selectedSaleView?.id));
        setDeleteOpen(false);
      }
      catch (error) {
        console.error("Failed to delete sale", error);
      }
    }
  };

  const handleEditSubmit = async () => {
    let newSale = {
      id: selectedSaleView.id,
      customerId: selectedCustomer,
      productId: selectedProduct,
      storeId: selectedStore,
      dateSold: soldDate
    };
    if (newSale) {
      try {
        await updateSale(selectedSaleView.id, newSale);
        fetchSales();
      }
      catch (error) {
        console.error("Failed to update sale", error);
      }
      setEditOpen(false);
    }

  }
  const handleNewSubmit = async () => {
    let newSale = {
      id: "0",
      customerId: selectedCustomer,
      productId: selectedProduct,
      storeId: selectedStore,
      dateSold: soldDate
    };
    setSelectedSale(newSale);
    if (newSale) {
      try {
        await createSale(newSale);
        fetchSales();
      }
      catch (error) {
        console.error("Failed to add new sale", error);
      }
      setNewOpen(false);
    }
  };

  const confirmDelete = (saleView) => {
    setSelectedSaleView(saleView);
    setDeleteOpen(true);
  };

  const confirmEdit = (saleView) => {
    setSelectedSaleView(saleView);
    let sale = fetchSale(saleView.id);
    setSelectedCustomer(sale?.customerId);
    setSelectedProduct(sale?.productId);
    setSelectedStore(sale?.storeId);
    setSoldDate(sale?.dateSold);
    setEditOpen(true);
    fetchCustomers();
    fetchStores();
    fetchProducts();
    console.log("saleView:", saleView)
    console.log("customer selected:", selectedCustomer);
    console.log("selectedSale:", selectedSale);
    setEditOpen(true);
  };

  const confirmNewSubmit = () => {
    const sale = { id: "0", };
    setSelectedSale(sale);
    setSelectedCustomer("");
    setSelectedStore("");
    setSelectedProduct("");
    setSoldDate(new Date());
    fetchCustomers();
    fetchStores();
    fetchProducts();
    setNewOpen(true);
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const invalidSelectedSale = () => {
    if (!selectedSale) {
      return true
    }
    let isCustomerIdPresent = customers.some(customer => customer.id === selectedSale.customerId);
    if (!isCustomerIdPresent) {
      return true;
    }
    let isProductIdPresent = products.some(product => product.id === selectedSale.productId);
    if (!isProductIdPresent) {
      return true;
    }
    let isStoreIdPresent = stores.some(store => store.id === selectedSale.storeId);
    if (!isStoreIdPresent) {
      return true;
    }
    // is a date check needed or is datepicker already validating input??
    return false;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button onClick={confirmNewSubmit} primary floated="left">
        New Sale
      </Button>
      <Table className="ui celled table" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sales.map((sale) => (
            <Table.Row key={sale.id}>
              <Table.Cell>{sale.customer}</Table.Cell>
              <Table.Cell>{sale.product}</Table.Cell>
              <Table.Cell>{sale.store}</Table.Cell>
              <Table.Cell>{sale.dateSold}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => confirmEdit(sale)}>
                  <Icon name="edit" /> EDIT
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => confirmDelete(sale)}>
                  <Icon name="trash" /> DELETE
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* modal window for delete sale */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Modal.Header>Delete sale</Modal.Header>
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

      {/* modal window for new sale */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={newOpen}
        onClose={() => setNewOpen(false)}
      >
        <Modal.Header>Create sale</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleNewSubmit}>
            <Form.Field>
              <label>Date sold</label>
              <DatePicker
                selected={soldDate}
                onChange={setSoldDate}
              />
            </Form.Field>
            <Form.Field>
              <label>Customer</label>
              <select
                class="ui search dropdown"
                value={selectedCustomer}
                onChange={handleCustomerChange}
              >
                {[{ id: "", name: "" }, ...customers].map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label>Product</label>
              <select
                class="ui search dropdown"
                value={selectedProduct}
                onChange={handleProductChange}
              >
                {[{ id: "", name: "" }, ...products].map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label>Store</label>
              <select
                class="ui search dropdown"
                value={selectedStore}
                onChange={handleStoreChange}
              >
                {[{ id: "", name: "" }, ...stores].map((store) => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
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

      {/* modal window for edit sale */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <Modal.Header>Edit sale</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleEditSubmit}>
            <Form.Field>
              <label>Date sold</label>
              <DatePicker
                selected={soldDate}
                onChange={setSoldDate}
              />
            </Form.Field>
            <Form.Field>
              <label>Customer</label>
              <select
                class="ui search dropdown"
                value={selectedCustomer}
                onChange={handleCustomerChange}
              >
                {[{ id: "", name: "" }, ...customers].map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label>Product</label>
              <select
                class="ui search dropdown"
                value={selectedProduct}
                onChange={handleProductChange}
              >
                {[{ id: "", name: "" }, ...products].map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label>Store</label>
              <select
                class="ui search dropdown"
                value={selectedStore}
                onChange={handleStoreChange}
              >
                {[{ id: "", name: "" }, ...stores].map((store) => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setEditOpen(false)}>
            cancel
          </Button>
          <Button positive onClick={handleEditSubmit} type="submit" disabled={editIsDisabled} >
            edit &nbsp;
            <Icon name="checkmark" />
          </Button>

        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SaleTable;
