import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Row, Col } from "react-bootstrap";
import validator from "validator";


export const Register = () => {
  const [status, setStatus] = useState({ input: {}, errors: {} });

  const handleChange = (event) => {
    let input = status.input;
    input[event.target.name] = event.target.value;
    setStatus((status) => ({ ...status, input }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const result = status;
      console.log(result.input);
      setStatus({ input: {}, errors: {} });
    }
  }

  const validate = () => {
    let input = status.input;
    let errors = {};
    let isValid = true;

    if (input["phone"] && !validator.isMobilePhone(input["phone"])) {
      isValid = false;
      errors["phone"] = "Please enter valid phone number.";
    }

    if (input["NPI"] && input["NPI"].length !== 10) {
      isValid = false;
      errors["NPI"] = "Please enter valid NPI number.";
    }

    setStatus((status) => ({ ...status, errors }));
    return isValid;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control required type="text" placeholder="Enter First Name" name="first_name" value={status.input.first_name || ""} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required type="text" placeholder="Enter Last Name" name="last_name" value={status.input.last_name || ""} onChange={handleChange} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formNPI">
        <Form.Label>NPI Number</Form.Label>
        <Form.Control required type="number" placeholder="Enter NPI Number" name="NPI" value={status.input.NPI || ""} onChange={handleChange} />
        <Form.Label className="text-danger">{status.errors.NPI}</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Business Address</Form.Label>
        <Form.Control required type="text" placeholder="Enter Business Address" name="address" value={status.input.address || ""} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Telephone Number</Form.Label>
        <Form.Control required type="tel" placeholder="Enter Telephone Number" name="phone" value={status.input.phone || ""} onChange={handleChange} />
        <Form.Label className="text-danger">{status.errors.phone}</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" name="email" value={status.input.email || ""} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>)
}

export default Register;