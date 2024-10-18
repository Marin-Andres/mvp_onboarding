import { 
    Modal,
    Button,
    Form,
    Input,
    Icon
 } from "semantic-ui-react";

const NewModal = ({
    itemName, 
    fieldName,
    newOpen, 
    setNewOpen, 
    handleNewSubmit,
    handleNameChange, 
    handleFieldChange,
    createIsDisabled
    }) => {

    return (
        <div>
        {/* general modal window for new items */}
        <Modal
        dimmer="blurring"
        size="tiny"
        open={newOpen}
        onClose={() => setNewOpen(false)}
      >
        <Modal.Header>Create {itemName}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleNewSubmit}>
            <Form.Field>
              <label>NAME</label>
              <Input
                type="text"
                name="Name"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </Form.Field>
            <Form.Field>
              <label>{fieldName.toUpperCase()}</label>
              <Input
                type="text"
                name={fieldName}
                placeholder={fieldName}
                onChange={handleFieldChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setNewOpen(false)}>
            cancel
          </Button>
          <Button 
            positive 
            onClick={handleNewSubmit} 
            type="submit" disabled={createIsDisabled}
            >
            create &nbsp;
            <Icon name="checkmark" />
          </Button>

        </Modal.Actions>
      </Modal>
        </div>
    );
};

export default NewModal;