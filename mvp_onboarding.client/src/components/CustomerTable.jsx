import React, { useEffect, useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { getCustomers, deleteCustomer } from "../services/customerService";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        if (data?.length > 0)
        {
            setCustomers(data);
        }
      } catch (error) {
        console.error("Failed to fetch customers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        setCustomers(customers.filter((customer) => customer.id !== id));
      } catch (error) {
        console.error("Failed to delete customer", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Button primary floated="left">New Customer</Button>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
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
                <Button color="yellow" onClick={() => console.log("Edit", customer)}>
                  <Icon name="edit" /> Edit
                </Button>
                </Table.Cell>
                <Table.Cell>
                <Button color="red" onClick={() => handleDelete(customer.id)}>
                  <Icon name="trash" /> Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CustomerTable;
