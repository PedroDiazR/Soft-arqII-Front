import { Container, Row, Col, Navbar, Nav, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postUser } from './Api';
//import Cookies from 'js-cookie';

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      // Las contraseñas no coinciden, muestra un mensaje de error
      setErrorMessage('Las contraseñas no coinciden');
      setShowError(true);
      return;
    }
  
    try {
      
      const response = await postUser(
        formData.firstName,
        formData.lastName,
        formData.dni,
        formData.password,
        formData.email,
        
      ) ;

      if (response.status === 200) {
        console.log(response)
        /*
        const user = {
          email: response.data.email,
          name: response.data.name,
          lastName: response.data.lastName,
          dni: response.data.dni,
          id: response.data.id,
          token: response.data.token
          };
          
        Cookies.set('userData', JSON.stringify(user));
        onLogin(formData.firstName, formData); // Llama a la función onLogin pasando el nombre del usuario registrado y los datos del formulario
        */
        navigate('/'); // Redirige al usuario a la página principal después de registrar exitosamente
      } else if (response.status === 400) {
        setErrorMessage('El correo electrónico o DNI ya está en uso');
        setShowError(true);
        return;
      } else {
        setErrorMessage('Error al registrar el usuario');
      }
    } catch(error) {
      
    }
    
    // Restablece los valores y oculta el mensaje de error
    
    setFormData({
      firstName: '',
      lastName: '',
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
