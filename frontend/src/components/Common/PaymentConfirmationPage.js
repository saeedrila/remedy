import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Col,
  Row,
  Button,
} from 'react-bootstrap';

import Header from './Header'
import Footer from './Footer'

import success_tick from '../../assets/images/medical/correct.png'
import { Container } from 'reactstrap';

function PaymentConfirmationPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header section */}
      <Header />

      <Container>
        <div className="big-card-container">
          <Row xs={1} sm={2} md={3} className="g-4 justify-content-center mt-3">
            <Col>
              <Card className="border">
                <div className="d-flex justify-content-center mt-3">
                  <Card.Img variant="top" src={success_tick} style={{ width: '200px', height: '200px' }} />
                </div>
                <Card.Body>
                  <Card.Title className="justify-content-center" >Doctor: Dr.</Card.Title>
                  <Card.Title className="justify-content-center" >₹ fee here</Card.Title>
                  <Card.Title className="justify-content-center" >Date: date</Card.Title>
                  <Card.Title className="justify-content-center" >Time: </Card.Title>
                  <Card.Title className="justify-content-center" >Patient Name: patient_name</Card.Title>
                  <Card.Title className="justify-content-center" >Payment ID:</Card.Title>
                  <Card.Title className="justify-content-center" >Order ID:</Card.Title>
                  <div className="d-flex justify-content-center">
                    <Button variant="success" className="m-3" onClick={() => navigate('/home')}>
                      Home
                    </Button>
                    <Button variant="success" className="m-3">
                      My Orders
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Footer section */}
      <Footer />
    </>
    
  )
}

export default PaymentConfirmationPage