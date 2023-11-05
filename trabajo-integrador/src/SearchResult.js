import React from 'react';
import { Container, Navbar, Card, Row, Col } from 'react-bootstrap';
import { FaSearch, FaCalendar, FaCalendarAlt } from 'react-icons/fa';

function SearchResult() {
  const hotelData = [
    {
      nombre: 'Hotel 1',
      descripcion: 'Descripción del Hotel 1',
      thumbnail: 'https://mcaleer-rushe.co.uk/site/wp-content/uploads/2019/05/Maldron-Hotel-Belfast-IntAirport-I.jpg',
      precio: '$100 por noche',
      amenities: 'Piscina, Wifi gratuito, Estacionamiento',
    },
    {
      nombre: 'Hotel 2',
      descripcion: 'Descripción del Hotel 2',
      thumbnail: 'https://www.mac-group.com/wp-content/uploads/2018/03/800x400-2.jpg',
      precio: '$120 por noche',
      amenities: 'Desayuno incluido, Gimnasio, Spa',
    },
  ];

  // Datos de búsqueda seleccionados en la página anterior
  const ciudad = 'Córdoba';
  const fechaInicio = '11/11/11';
  const fechaFinal = '12/12/12';

  return (
    <div>
      <Container className="mt-5">
        <Card style={{ marginBottom: '20px' }}>
          <Card.Body>
            <Card.Title>Información de Búsqueda</Card.Title>
            <Row>
              <Col md={4}>
                <Row className="align-items-center">
                  <Col sm={2}><FaSearch /></Col>
                  <Col sm={10}>Destino: {ciudad}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="align-items-center">
                  <Col sm={2}><FaCalendar /></Col>
                  <Col sm={10}>Llegada: {fechaInicio}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="align-items-center">
                  <Col sm={2}><FaCalendarAlt /></Col>
                  <Col sm={10}>Salida: {fechaFinal}</Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {hotelData.map((hotel, index) => (
          <Row key={index} className="mt-3">
            <Col md={3}>
              <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={hotel.thumbnail} style={{ height: '100%' }} />
              </Card>
            </Col>
            <Col md={9}>
              <Card>
                <Card.Body>
                  <Card.Title>{hotel.nombre}</Card.Title>
                  <Card.Text>{hotel.descripcion}</Card.Text>
                  <Card.Text>{hotel.precio}</Card.Text>
                  <Card.Text>{hotel.amenities}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default SearchResult;
