import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer, createCustomer, updateCustomer } from "../services/customerService";
import { 
    Table, 
    Button, 
    Icon,
    Modal,
    Form,
    Input
} from "semantic-ui-react";

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [newOpen, setNewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [createIsDisabled, setCreateIsDisabled] = useState(true);
    const [editIsDisabled, setEditIsDisabled] =useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

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
    const handleDelete = async () => {
        if (selectedCustomer) {
            try {
                await deleteCustomer(selectedCustomer?.id);
                setCustomers(customers.filter((customer) => customer.id !== selectedCustomer?.id));
                setDeleteOpen(false);
            } 
            catch (error) {
                console.error("Failed to delete customer", error);
            }
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

    const handleNewSubmit = async () => {
        if (selectedCustomer) {
            try {
                await createCustomer(selectedCustomer);
                setNewOpen(false);
                fetchCustomers();            }
            catch (error) {
                console.error("Failed to add new customer", error);
            }
        } 
    };

    const confirmNewSubmit = () => {
        const customer = { id: "0", name: "", address: "" };
        setSelectedCustomer(customer);
        setNewOpen(true);
    };
    
    const handleNameChange = (event) => {
        const changedName = event.target.value;
        const customer = selectedCustomer;
        customer.name = changedName;
        setSelectedCustomer(customer);
        setCreateIsDisabled(invalidSelectedCustomer);
        setEditIsDisabled(invalidSelectedCustomer);
    };

    const handleAddressChange = (event) => {
        const changedAddress = event.target.value;
        const customer = selectedCustomer;
        customer.address = changedAddress;
        setSelectedCustomer(customer);
        setCreateIsDisabled(invalidSelectedCustomer);
        setEditIsDisabled(invalidSelectedCustomer);
    };

    const invalidSelectedCustomer = () => {
        if (selectedCustomer.name === "") {
            return true;
        }
        if (selectedCustomer.address === "") {
            return true;
        }
        return false;
    }

    const handleEditSubmit = async () => {
        if (selectedCustomer) {
            try {
                await updateCustomer(selectedCustomer.id, selectedCustomer);
                setEditOpen(false);
                fetchCustomers();            }
            catch (error) {
                console.error("Failed to update customer", error);
            }
        }  
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
        <Button onClick= {confirmNewSubmit} primary floated="left">
            New Customer
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
                    <div class="field">
                        <label>NAME</label> 
                        <Input
                            type = "text"
                            name = "customerName"
                            placeholder = "Name"
                            onChange={handleNameChange}
                        />
                    </div>
                    <div class = "field">
                        <label>ADDRESS</label>
                        <Input
                            type = "text"
                            name = "customerAddress"
                            placeholder = "Address"
                            onChange={handleAddressChange}
                        />
                    </div>
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
            size="tiny"
            open={editOpen}
            onClose={() => setEditOpen(false)}
        >
            <Modal.Header>Edit customer</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleEditSubmit}>
                    <div class="field">
                        <label>NAME</label> 
                        <Input
                            type = "text"
                            name = "customerName"
                            placeholder = "Name"
                            onChange={handleNameChange}
                            value={selectedCustomer?.name}
                        />
                    </div>
                    <div class = "field">
                        <label>ADDRESS</label>
                        <Input
                            type = "text"
                            name = "customerAddress"
                            placeholder = "Address"
                            onChange={handleAddressChange}
                            value={selectedCustomer?.address}
                        />
                    </div>
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
