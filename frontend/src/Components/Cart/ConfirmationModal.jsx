import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'
function ConfirmationModal({ coffeeName, addOns, onRepeatOrder, onCustomize, show, setShowModal }) {

  return (
    <div
      className="modal "
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} >
        <Modal.Header closeButton onClick={()=>{setShowModal(false)}}>
          <Modal.Title>{coffeeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{addOns}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCustomize}>
            Ill choose again
          </Button>
          <Button variant="secondary" onClick={onRepeatOrder}>
           Repeat order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;