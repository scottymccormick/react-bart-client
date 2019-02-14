import React from 'react';
import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap';

const RegistrationForm = (props) => {
  return (
    <div>
      <Modal isOpen={props.showRegistration} toggle={props.toggleRegistrationModal}>
        <ModalHeader >Register</ModalHeader>
        <ModalBody>
        <Form onSubmit={props.handleSubmit}>
          <FormGroup>
            <Label for="emailInput">Email:</Label>
            <Input type="email" name="email" id="emailInput" onChange={props.handleChange} value={props.user.email}/>
          </FormGroup>
          <FormGroup>
            <Label for="nameInput">Name:</Label>
            <Input type="text" name="name" id="nameInput" onChange={props.handleChange} value={props.user.name}/>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" id="passwordInput" onChange={props.handleChange} value={props.user.password}/>
          </FormGroup>
          <Button color="success" className="ml-2 float-right">Submit</Button>
        </Form>
        <Button color="secondary" className="mx-2 float-right" onClick={props.toggleRegistrationModal}>Cancel</Button>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RegistrationForm;