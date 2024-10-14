import React, { useEffect, useState } from "react";
import { getStores, deleteStore, createStore, updateStore } from "../services/storeService";
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

const StoreTable = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [createIsDisabled, setCreateIsDisabled] = useState(true);
  const [editIsDisabled, setEditIsDisabled] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");
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

  const fetchStores = async (currentPage, pageSize, sortColumn, sortDirection) => {
    try {
      const data = await getStores(currentPage, pageSize, sortColumn, sortDirection);
      if (data?.items?.length > 0) {
        setStores(data?.items);
        setTotalCount(data?.totalCount);
      }
    } catch (error) {
      console.error("Failed to fetch stores", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedStore && selectedStore?.id) {
        await deleteStore(selectedStore?.id);
        setStores(stores.filter((store) => store.id !== selectedStore?.id));
      }
    }
    catch (error) {
      console.error("Failed to delete store", error);
    }
    finally {
      setDeleteOpen(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      let newStore = {
        id: selectedStore.id,
        name: selectedName,
        address: selectedAddress
      };

      if (newStore && newStore?.id) {
        await updateStore(selectedStore.id, newStore);
        fetchStores();
      }
    }
    catch (error) {
      console.error("Failed to update store", error);
    }
    finally {
      setEditOpen(false);
    }
  };

  const handleNewSubmit = async () => {
    try {
      let newStore = {
        id: "0",
        name: selectedName,
        address: selectedAddress
      };
      setSelectedStore(newStore);
      
      if (newStore) {
        await createStore(newStore);
      fetchStores();
      }
    }
    catch (error) {
      console.error("Failed to add new store", error);
    }
    finally {
      setNewOpen(false);
    }
  };

  const confirmDelete = (store) => {
    setSelectedStore(store);
    setDeleteOpen(true);
  };

  const confirmEdit = (store) => {
    setSelectedStore(store);
    setSelectedName(store.name);
    setSelectedAddress(store.address);
    setEditOpen(true);
  };

  const confirmNewSubmit = () => {
    const store = { id: "0", name: "", address: "" };
    setSelectedName("");
    setSelectedAddress("");
    setSelectedStore(store);
    setNewOpen(true);
  };


  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const invalidSelectedStore = () => {
    if ((selectedName === "") || (selectedAddress === "")) {
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
    fetchStores(currentPage, pageSize, sortColumn, sortDirection);
  }, [currentPage, pageSize, sortColumn, sortDirection]);


  useEffect(() => {
    setCreateIsDisabled(invalidSelectedStore);
    setEditIsDisabled(invalidSelectedStore);
  }, [selectedAddress, selectedName]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button onClick={confirmNewSubmit} primary floated="left">
        New Store
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
              Address
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
          {stores.map((store) => (
            <Table.Row key={store.id}>
              <Table.Cell>{store.name}</Table.Cell>
              <Table.Cell>{store.address}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => confirmEdit(store)}>
                  <Icon name="edit" /> EDIT
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => confirmDelete(store)}>
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

      {/* modal window for delete store */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Modal.Header>Delete store</Modal.Header>
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

      {/* modal window for new store */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={newOpen}
        onClose={() => setNewOpen(false)}
      >
        <Modal.Header>Create store</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleNewSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="storeName"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </Form.Field>
            <Form.Field>
              <label>ADDRESS</label>
              <Input
                type="text"
                name="storeAddress"
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

      {/* modal window for edit store */}
      <Modal
        dimmer="blurring"
        size="tiny"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <Modal.Header>Edit store</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleEditSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="storeName"
                placeholder="Name"
                onChange={handleNameChange}
                value={selectedName}
              />
            </Form.Field>
            <Form.Field>
              <label>ADDRESS</label>
              <Input
                type="text"
                name="storeAddress"
                placeholder="Address"
                onChange={handleAddressChange}
                value={selectedAddress}
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

export default StoreTable;
