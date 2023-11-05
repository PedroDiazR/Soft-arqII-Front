import React from 'react';
import { Container, Row, Col, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import LogIn from './LogIn';
import SearchResult from './SearchResult';
import HotelDetail from './HotelDetail';
import Confirmation from './Confirmation';
import HotelCreation from './HotelCreation';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg" style={{ marginBottom: '20px' }}>
          <Navbar.Brand style={{ marginLeft: '20px' }}>
            Página
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/resultados">Búsqueda</Nav.Link>
              <Nav.Link href="/detalle">Hotel</Nav.Link>
            </Nav>
          </Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="/login">
                Log In
              </Nav.Link>
              <Nav.Link href="/signin" style={{ marginRight: '20px' }}>
                Sign In
              </Nav.Link>
            </Nav>
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
                <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
                    Buscar Hoteles
                </Button>
              </Form>
            </Container>
          } />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resultados" element={<SearchResult />} />
          <Route path="/detalle" element={<HotelDetail />} />
          <Route path="/creacion" element={<HotelCreation />} />
          <Route path="/confirmacion/exito" element={<Confirmation isSuccessful={true} />} />
          <Route path="/confirmacion/rechazo" element={<Confirmation isSuccessful={false} />} />
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
