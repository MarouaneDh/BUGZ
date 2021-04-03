import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import UseContacts from "./contexts/ContactsProdiver";

const NewContactModal = ({ closeModal }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const createContact = UseContacts();
  const handleSubmit = (e) => {
    e.preventDefault();
    // createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };
  return (
    <div>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type="submit">create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

export default NewContactModal;
