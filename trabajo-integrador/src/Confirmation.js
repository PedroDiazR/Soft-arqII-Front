import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { BsXCircle, BsCheckCircle } from 'react-icons/bs';

function Confirmation({ isSuccessful }) {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          {isSuccessful ? (
            <BsCheckCircle style={{ color: 'green', fontSize: '2rem' }} />
          ) : (
            <BsXCircle style={{ color: 'red', fontSize: '2rem' }} />
          )}
          <Card.Text className="mt-3">
            {isSuccessful ? '¡Reserva exitosa!' : 'Reserva rechazada.'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Confirmation;