import React from 'react';
import { Container, Row, Col, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResultBusq from './ResultBusq';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Página</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/resultados">Búsqueda</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={
            <Container className="mt-5">
              <h1>Bienvenido a nuestra página</h1>
              <p>Encuentra tu hotel ideal en cualquier ciudad.</p>
              <Form>
                <Row>
                  <Col sm={12} md={4}>
                    <Form.Group>
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control type="text" placeholder="Ingresa la ciudad" />
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={4}>
                    <Form.Group>
                      <Form.Label>Desde</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={4}>
                    <Form.Group>
                      <Form.Label>Hasta</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Buscar Hoteles
                </Button>
              </Form>
            </Container>
          } />
          <Route path="/resultados" element={<ResultBusq />} />
        </Routes>

        <footer className="mt-5 p-3 bg-dark text-light">
          <Container>
            <p>&copy; 2023 Hotel</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
