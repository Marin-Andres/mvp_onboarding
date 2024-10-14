import { 
    Modal,
    Button,
    Form,
    Icon
 } from "semantic-ui-react";
 import DatePicker from "react-datepicker";

const EditModal = ({
    modalAction,
    editOpen, 
    setEditOpen, 
    handleEditSubmit,
    editIsDisabled,
    soldDate,
    setSoldDate,
    selectedCustomer,
    handleCustomerChange,
    customers,
    selectedProduct,
    handleProductChange,
    products,
    selectedStore,
    handleStoreChange,
    stores
    }) => {

    return (
        <div>
        {/* general modal window for new items */}
        <Modal
        dimmer="blurring"
        size="tiny"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <Modal.Header>{modalAction} sale</Modal.Header>
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
          <Button 
            positive 
            onClick={handleEditSubmit} 
            type="submit" 
            disabled={editIsDisabled} >
            {modalAction.toLowerCase()} &nbsp;
            <Icon name="checkmark" />
          </Button>

        </Modal.Actions>
      </Modal>
        </div>
    );
};

export default EditModal;