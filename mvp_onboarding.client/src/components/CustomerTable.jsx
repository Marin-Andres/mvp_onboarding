import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer, createCustomer, updateCustomer } from "../services/customerService";
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

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({
    id: null,
    name: '',
    address: '',
  });
  const [createIsDisabled, setCreateIsDisabled] = useState(true);
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

  const fetchCustomers = async (currentPage, pageSize, sortColumn, sortDirection) => {
    try {
      const data = await getCustomers(currentPage, pageSize, sortColumn, sortDirection);
      if (data?.items?.length > 0) {
        setCustomers(data?.items);
        setTotalCount(data?.totalCount);
      }
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedCustomer && selectedCustomer?.id) {
        await deleteCustomer(selectedCustomer?.id);
        setCustomers(customers.filter((customer) => customer.id !== selectedCustomer?.id));
      }
    }
    catch (error) {
      console.error("Failed to delete customer", error);
    }
    finally {
      setDeleteOpen(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      let newCustomer = {
        id: selectedCustomer.id,
        name: selectedCustomer.name,
        address: selectedCustomer.address
      };

      if (newCustomer && newCustomer?.id) {
        await updateCustomer(selectedCustomer.id, newCustomer);
        fetchCustomers(currentPage, pageSize, sortColumn, sortDirection);
      }
    }
    catch (error) {
      console.error("Failed to update customer", error);
    }
    finally {
      setEditOpen(false);
    }
  };

  const handleNewSubmit = async () => {
    try {
      let newCustomer = {
        id: "0",
        name: selectedCustomer.name,
        address: selectedCustomer.address
      };
      setSelectedCustomer(newCustomer);
      
      if (newCustomer) {
        await createCustomer(newCustomer);
        fetchCustomers(currentPage, pageSize, sortColumn, sortDirection);
        }
    }
    catch (error) {
      console.error("Failed to add new customer", error);
    }
    finally {
      setNewOpen(false);
    }
  };

  const confirmDelete = (customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  const confirmEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditOpen(true);
  };

  const confirmNewSubmit = () => {
    const customer = { id: "0", name: "", address: "" };
    setSelectedCustomer(customer);
    setNewOpen(true);
  };


  const handleNameChange = (event) => {
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      name: event.target.value,
    }));
  };

  const handleAddressChange = (event) => {
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: event.target.value,
    }));
  };

  const invalidSelectedCustomer = () => {
    if ((selectedCustomer.name === "") || (selectedCustomer.address === "")) {
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
    fetchCustomers(currentPage, pageSize, sortColumn, sortDirection);
  }, [currentPage, pageSize, sortColumn, sortDirection]);

  useEffect(() => {
    setCreateIsDisabled(invalidSelectedCustomer);
    setEditIsDisabled(invalidSelectedCustomer);
  }, [selectedCustomer]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button onClick={confirmNewSubmit} primary floated="left">
        New Customer
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
            <Table.HeaderCell>Address
              &nbsp;
              <Icon
                name={'fitted caret down'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Address' && sortDirection === 'desc' ? 1 : 0.5 }}
                onClick={() => handleSort('Address', 'desc')}
              />
              <Icon
                name={'fitted caret up'}
                style={{ cursor: 'pointer', opacity: sortColumn === 'Address' && sortDirection === 'asc' ? 1 : 0.5 }}
                onClick={() => handleSort('Address', 'asc')}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{customer.address}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => confirmEdit(customer)}>
                  <Icon name="edit" /> EDIT
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => confirmDelete(customer)}>
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

      {/* modal window for delete customer */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Modal.Header>Delete customer</Modal.Header>
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

      {/* modal window for new customer */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={newOpen}
        onClose={() => setNewOpen(false)}
      >
        <Modal.Header>Create customer</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleNewSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="customerName"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </Form.Field>
            <Form.Field>
              <label>ADDRESS</label>
              <Input
                type="text"
                name="customerAddress"
                placeholder="Address"
                onChange={handleAddressChange}
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

      {/* modal window for edit customer */}
      <Modal
        dimmer="blurring"
        size="small"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <Modal.Header>Edit customer</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleEditSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="customerName"
                placeholder="Name"
                onChange={handleNameChange}
                value={selectedCustomer.name}
              />
            </Form.Field>
            <Form.Field>
              <label>ADDRESS</label>
              <Input
                type="text"
                name="customerAddress"
                placeholder="Address"
                onChange={handleAddressChange}
                value={selectedCustomer.address}
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

export default CustomerTable;
