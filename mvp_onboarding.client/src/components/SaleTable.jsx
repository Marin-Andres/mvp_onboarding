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
  Pagination,
  Dropdown
} from "semantic-ui-react";
import DeleteModal from "./DeleteModal";
import SaleEditModal from "./SaleEditModal";

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

  const [sortColumn, setSortColumn] = useState('Customer');
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

  const fetchSales = async (currentPage, pageSize, sortColumn, sortDirection) => {
    try {
      const data = await getSalesView(currentPage, pageSize, sortColumn, sortDirection);
      if (data?.items?.length > 0) {
        setSales(data?.items);
        setTotalCount(data?.totalCount);
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
      const data = await getCustomers(1, 1000, "Name", "asc");
      if (data?.items?.length > 0) {
        setCustomers(data?.items);
      }
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  const fetchStores = async () => {
    try {
      const data = await getStores(1, 1000, "Name", "asc");
      if (data?.items?.length > 0) {
        setStores(data?.items);
      }
    } catch (error) {
      console.error("Failed to fetch stores", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts(1, 1000, "Name", "asc");
      if (data?.items?.length > 0) {
        setProducts(data?.items);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleDelete = async () => {
    if (selectedSaleView && selectedSaleView?.id) {
      try {
        await deleteSale(selectedSaleView?.id);
        setSales(sales.filter((sale) => sale.id !== selectedSaleView?.id));
      }
      catch (error) {
        console.error("Failed to delete sale", error);
      }
      finally {
        setDeleteOpen(false);
      }
    }
  };

  const handleEditSubmit = async () => {
    try {
      let dateOnly = soldDate.toISOString().slice(0, 10);
      let newSale = {
        id: selectedSaleView.id,
        customerId: selectedCustomer,
        productId: selectedProduct,
        storeId: selectedStore,
        dateSold: dateOnly
      };

      if (newSale && newSale?.id) {
        await updateSale(selectedSaleView.id, newSale);
        fetchSales(currentPage, pageSize, sortColumn, sortDirection);
      }
    }
    catch (error) {
      console.error("Failed to update sale", error);
    }
    finally {
      setEditOpen(false);
    }
  };

  const handleNewSubmit = async () => {
    try {
      let dateOnly = soldDate.toISOString().slice(0, 10);
      let newSale = {
        id: "0",
        customerId: selectedCustomer,
        productId: selectedProduct,
        storeId: selectedStore,
        dateSold: dateOnly
      };

      if (newSale) {
      await createSale(newSale);
      fetchSales(currentPage, pageSize, sortColumn, sortDirection);
      }
    }
    catch (error) {
      console.error("Failed to add new sale", error);
    }
    finally {
      setNewOpen(false);
    }
  };

  const confirmDelete = (saleView) => {
    setSelectedSaleView(saleView);
    setDeleteOpen(true);
  };

  const confirmEdit = (saleView) => {
    setSelectedSaleView(saleView);
    fetchSale(saleView.id)
      .then(sale => {
        setSelectedSale(sale);
        setSelectedCustomer(sale?.customerId);
        setSelectedProduct(sale?.productId);
        setSelectedStore(sale?.storeId);
        setSoldDate(new Date(sale?.dateSold));
        setEditOpen(true);
      })
      .catch(error => {
        console.error("Failed to fetch sale", error);
      });
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
    setSelectedCustomer(Number(e.target.value));
  };

  const handleProductChange = (e) => {
    setSelectedProduct(Number(e.target.value));
  };

  const handleStoreChange = (e) => {
    setSelectedStore(Number(e.target.value));
  };

  const invalidSelectedSale = () => {
    if (!selectedSale) {
      return true
    }
    let isCustomerIdPresent = customers.some(customer => customer.id === selectedCustomer);
    if (!isCustomerIdPresent) {
      return true;
    }
    let isProductIdPresent = products.some(product => product.id === selectedProduct);
    if (!isProductIdPresent) {
      return true;
    }
    let isStoreIdPresent = stores.some(store => store.id === selectedStore);
    if (!isStoreIdPresent) {
      return true;
    }
    // is a date check needed or is datepicker already validating input??
    return false;
  };

  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const handlePageSizeChange = (e, { value }) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page on page size change
  };

  useEffect(() => {
    fetchSales(currentPage, pageSize, sortColumn, sortDirection);
    fetchCustomers();
    fetchStores();
    fetchProducts();
  }, [currentPage, pageSize, sortColumn, sortDirection]); //fetch list on mount


  useEffect(() => {
    setCreateIsDisabled(invalidSelectedSale);
    setEditIsDisabled(invalidSelectedSale);
  }, [selectedCustomer, selectedStore, selectedProduct]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button onClick={confirmNewSubmit} primary floated="left">
        New Sale
      </Button>
      <Table className="ui celled table" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Customer
              &nbsp;
              <Icon
                name={'fitted caret down'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Customer' && sortDirection === 'desc' ? 1 : 0.5 }}
                onClick={() => handleSort('Customer', 'desc')}
              />
              <Icon
                name={'fitted caret up'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Customer' && sortDirection === 'asc' ? 1 : 0.5 }}
                onClick={() => handleSort('Customer', 'asc')}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Product
              &nbsp;
              <Icon
                name={'fitted caret down'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Product' && sortDirection === 'desc' ? 1 : 0.5 }}
                onClick={() => handleSort('Product', 'desc')}
              />
              <Icon
                name={'fitted caret up'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Product' && sortDirection === 'asc' ? 1 : 0.5 }}
                onClick={() => handleSort('Product', 'asc')}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Store
              &nbsp;
              <Icon
                name={'fitted caret down'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Store' && sortDirection === 'desc' ? 1 : 0.5 }}
                onClick={() => handleSort('Store', 'desc')}
              />
              <Icon
                name={'fitted caret up'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Store' && sortDirection === 'asc' ? 1 : 0.5 }}
                onClick={() => handleSort('Store', 'asc')}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Date Sold
              &nbsp;
              <Icon
                name={'fitted caret down'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'DateSold' && sortDirection === 'desc' ? 1 : 0.5 }}
                onClick={() => handleSort('DateSold', 'desc')}
              />
              <Icon
                name={'fitted caret up'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'DateSold' && sortDirection === 'asc' ? 1 : 0.5 }}
                onClick={() => handleSort('DateSold', 'asc')}
              />
            </Table.HeaderCell>
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

      {/* modal window for delete sale */}
      <DeleteModal
        itemName="sale"
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        handleDelete={handleDelete}      
      />

      {/* modal window for new sale */}
      <SaleEditModal
        modalAction="Create"
        editOpen={newOpen}
        setEditOpen={setNewOpen}
        handleEditSubmit={handleNewSubmit}
        editIsDisabled={createIsDisabled}
        soldDate={soldDate}
        setSoldDate={setSoldDate}
        selectedCustomer={selectedCustomer}
        handleCustomerChange={handleCustomerChange}
        customers={customers}
        selectedProduct={selectedProduct}
        handleProductChange={handleProductChange}
        products={products}
        selectedStore={selectedStore}
        handleStoreChange={handleStoreChange}
        stores={stores}
      />

      {/* modal window for edit sale */}
      <SaleEditModal
        modalAction="Edit"
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        handleEditSubmit={handleEditSubmit}
        editIsDisabled={editIsDisabled}
        soldDate={soldDate}
        setSoldDate={setSoldDate}
        selectedCustomer={selectedCustomer}
        handleCustomerChange={handleCustomerChange}
        customers={customers}
        selectedProduct={selectedProduct}
        handleProductChange={handleProductChange}
        products={products}
        selectedStore={selectedStore}
        handleStoreChange={handleStoreChange}
        stores={stores}
      />
    </div>
  );
};

export default SaleTable;
