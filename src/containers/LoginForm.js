import React from 'react';
import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap';

const LoginForm = (props) => {
  return (
    <div>
      <Modal isOpen={props.showLogin} toggle={props.toggleLoginModal}>
        <ModalHeader >Login</ModalHeader>
        <ModalBody>
        <Form onSubmit={props.handleSubmit}>
          <FormGroup>
            <Label for="emailInput">Email:</Label>
            <Input type="email" name="email" id="emailInput" onChange={props.handleInput} value={props.email}/>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" id="passwordInput" onChange={props.handleInput} value={props.password}/>
          </FormGroup>
          <Button color="success" className="ml-2 float-right">Submit</Button>
          <Button color="secondary" className="mx-2 float-right">Cancel</Button>
        </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default LoginForm;