import { 
    Modal,
    Button,
    Form,
    Input,
    Icon
 } from "semantic-ui-react";

const EditModal = ({
    itemName, 
    fieldName,
    nameValue,
    fieldValue,
    editOpen, 
    setEditOpen, 
    handleEditSubmit,
    handleNameChange, 
    handleFieldChange,
    editIsDisabled
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
        <Modal.Header>Edit {itemName}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleEditSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="Name"
                placeholder="Name"
                onChange={handleNameChange}
                value={nameValue}
              />
            </Form.Field>
            <Form.Field>
              <label>{fieldName.toUpperCase()}</label>
              <Input
                type="text"
                name={fieldName}
                placeholder={fieldName}
                onChange={handleFieldChange}
                value={fieldValue}
              />
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
            type="submit" disabled={editIsDisabled}
            >
            create &nbsp;
            <Icon name="checkmark" />
          </Button>

        </Modal.Actions>
      </Modal>
        </div>
    );
};

export default EditModal;