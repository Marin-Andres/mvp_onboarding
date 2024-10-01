import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getSales, deleteSale, createSale, updateSale } from "../services/saleService";
import { getSalesView } from "../services/salesViewService";
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
  const [createIsDisabled, setCreateIsDisabled] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    fetchSales();
    setCreateIsDisabled(invalidSelectedSale);
  }, [selectedName]);

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
  const handleDelete = async () => {
    if (selectedSale) {
      try {
        await deleteSale(selectedSale?.id);
        setSales(sales.filter((sale) => sale.id !== selectedSale?.id));
        setDeleteOpen(false);
      }
      catch (error) {
        console.error("Failed to delete sale", error);
      }
    }
  };

  const handleEditSubmit = async () => {
    let newSale = {
      id: selectedSale.id,
      name: selectedName
    };
    if (newSale) {
      try {
        await updateSale(selectedSale.id, newSale);
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
      name: selectedName
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

  const confirmDelete = (sale) => {
    setSelectedSale(sale);
    setDeleteOpen(true);
  };

  const confirmEdit = (sale) => {
    setSelectedSale(sale);
    setSelectedName(sale.name);
    setEditOpen(true);
  };

  const confirmNewSubmit = () => {
    const sale = { id: "0", name: "" };
    setSelectedName("");
    setSelectedSale(sale);
    setNewOpen(true);
  };


  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const invalidSelectedSale = () => {
    if (selectedName === "") {
      return true;
    }
    return false;
  }

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
                selected={startDate}
                onChange={setStartDate}
              />
            </Form.Field>
            <Form.Field>
              <label>Customer</label>
              <Input
                type="text"
              />
            </Form.Field>
            <Form.Field>
              <label>Product</label>
              <Input>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Store</label>
              <Input>
              </Input>
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
              <label>NAME</label>
              <Input
                type="text"
                name="saleName"
                placeholder="Name"
                onChange={handleNameChange}
                value={selectedName}
              />
            </Form.Field>
            <Form.Field>
              <label>Product</label>
              <Input
                type="text"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setEditOpen(false)}>
            cancel
          </Button>
          <Button positive onClick={handleEditSubmit} type="submit" >
            edit &nbsp;
            <Icon name="checkmark" />
          </Button>

        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SaleTable;