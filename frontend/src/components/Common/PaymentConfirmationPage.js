import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

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
                  {/* <Card.Title className="justify-content-center" >Doctor: Dr.{doctor_email}</Card.Title>
                  <Card.Title className="justify-content-center" >Fee: ₹{fee}</Card.Title>
                  <Card.Title className="justify-content-center" >Date: {date}</Card.Title>
                  <Card.Title className="justify-content-center" >Time: {time_slot}</Card.Title>
                  <Card.Title className="justify-content-center" >Patient Email: {patient_email}</Card.Title>
                  <Card.Title className="justify-content-center" >Mode: {line}</Card.Title> */}
                  <Card.Title className="justify-content-center" >Order has been placed successfully</Card.Title>
                  <Card.Title className="justify-content-center" >Order ID: ₹{orderId}</Card.Title>
                  <div className="d-flex justify-content-center">
                    <Button variant="success" className="m-3" onClick={() => navigate('/')}>
                      Home
                    </Button>
                    <Button variant="success" className="m-3" onClick={()=>{navigate('/dashboard-patient')}}>
                      My Appintments
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