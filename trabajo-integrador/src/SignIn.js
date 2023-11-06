import { Container, Row, Col, Navbar, Nav, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import Cookies from 'js-cookie';

const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    direcc: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const postUser = async () => {
    createRequestBody();
    try {
        const response = await fetch("http://localhost:8003/insertUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify that you're sending JSON data
            },
            body: JSON.stringify({ // Convert the request body to a JSON string
                name: formData.firstName,
                last_name: formData.lastName,
                address: formData.direcc,
                dni: formData.dni,
                email: formData.email,
                password: formData.password,
            }),
        });
        console.log(body.JSON);

        if (response.status === 200) {
            console.log("User uploaded successfully.");
            navigate('/');
        } else if (response.status === 400) {
          setErrorMessage('El correo electrónico ya está en uso');
          setShowError(true);
          return;
        } else {
          setErrorMessage('Error al registrar el usuario');
        }
    } catch (error) {
        console.error("Error while uploading user:", error);
    }
  };

  const createRequestBody = () => {
    const requestBody = {
      name: formData.firstName,
      last_name: formData.lastName,
      address: formData.direcc,
      dni: formData.dni,
      email: formData.email,
      password: formData.password,
    };
    console.log("Request Body:", requestBody);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    //event.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      // Las contraseñas no coinciden, muestra un mensaje de error
      setErrorMessage('Las contraseñas no coinciden');
      setShowError(true);
      return;
    }

    postUser();
     
    setFormData({
      firstName: '',
      lastName: '',
      direcc: '',
      dni: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    
    setShowError(false);
  };

  return (
    <Container className="mt-5">
      <h1>Registro</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            type="text"
            name="direcc"
            value={formData.direcc}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DNI</Form.Label>
          <Form.Control
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>
        {showError && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
}

export default SignIn;
