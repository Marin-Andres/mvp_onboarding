import React, { useEffect, useState } from "react";
import { getStores, deleteStore, createStore, updateStore } from "../services/storeService";
import {
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Input
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

  useEffect(() => {
    fetchStores();
  }, []); //fetch list on mount


  useEffect(() => {
    setCreateIsDisabled(invalidSelectedStore);
    setEditIsDisabled(invalidSelectedStore);
  }, [selectedAddress, selectedName]);

  const fetchStores = async () => {
    try {
      const data = await getStores();
      if (data?.length > 0) {
        setStores(data);
      }
    } catch (error) {
      console.error("Failed to fetch stores", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (selectedStore) {
      try {
        await deleteStore(selectedStore?.id);
        setStores(stores.filter((store) => store.id !== selectedStore?.id));
        setDeleteOpen(false);
      }
      catch (error) {
        console.error("Failed to delete store", error);
      }
    }
  };

  const handleEditSubmit = async () => {
    let newStore = {
      id: selectedStore.id,
      name: selectedName,
      address: selectedAddress
    };
    if (newStore) {
      try {
        await updateStore(selectedStore.id, newStore);
        fetchStores();
      }
      catch (error) {
        console.error("Failed to update store", error);
      }
      setEditOpen(false);
    }

  }
  const handleNewSubmit = async () => {
    let newStore = {
      id: "0",
      name: selectedName,
      address: selectedAddress
    };
    setSelectedStore(newStore);
    if (newStore) {
      try {
        await createStore(newStore);
        fetchStores();
      }
      catch (error) {
        console.error("Failed to add new store", error);
      }
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
    if (selectedName === "") {
      return true;
    }
    if (selectedAddress === "") {
      return true;
    }
    return false;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button onClick={confirmNewSubmit} primary floated="left">
        New Store
      </Button>
      <Table className="ui celled table" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
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
