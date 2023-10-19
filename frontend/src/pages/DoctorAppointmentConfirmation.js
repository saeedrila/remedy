import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {
  Card,
  Col,
  Row,
  Button,
} from 'react-bootstrap';

import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

import pic1 from '../assets/images/medical/online-doctor.svg'
import { Container } from 'reactstrap';

function DoctorAppointmentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor_email = 'doctor5@g.com'
  const patient_email = 'patient5@g.com'
  const line = 'offline'
  const time_slot = '9:00 AM'
  const fee = 400
  const date = '2023-10-19'

  const handleProceedToPaymentClick = () => {
    navigate('payment-confirmation', {
      state: {
        doctor_email,
        patient_email,
        line,
        time_slot,
        fee,
        date,
      }
    })
  }

  return (
    <>
      {/* Header section */}
      <Header />
      <Container>
        <div className="big-card-container">
          <Row xs={1} sm={2} md={3} className="g-4 justify-content-center mt-3">
            <Col>
              <Card className="border">
                <Card.Img variant="top" src={pic1} />
                <Card.Body>
                  <Card.Title className="justify-content-center" >Doctor: Dr.{doctor_email}</Card.Title>
                  <Card.Title className="justify-content-center" >₹ {fee}</Card.Title>
                  <Card.Title className="justify-content-center" >Date: {date}</Card.Title>
                  <Card.Title className="justify-content-center" >Mode: {line}</Card.Title>
                  <Card.Title className="justify-content-center" >Time: {time_slot}</Card.Title>
                  <Card.Title className="justify-content-center" >Patient Name: {patient_email}</Card.Title>                  
                  <Button variant="success" 
                    className="mt-3" 
                    onClick={() => 
                    handleProceedToPaymentClick()}>
                      Proceed to payment
                  </Button>
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

export default DoctorAppointmentConfirmation