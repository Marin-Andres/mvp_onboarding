import { 
    Modal,
    Button,
 } from "semantic-ui-react";

const DeleteModal = ({itemName, deleteOpen, setDeleteOpen, handleDelete}) => {


    return (
        <div>
        {/* general modal window for delete items */}
            <Modal
            dimmer="blurring"
            size="tiny"
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            >
            <Modal.Header>Delete {itemName}</Modal.Header>
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
        </div>
    );
};

export default DeleteModal;