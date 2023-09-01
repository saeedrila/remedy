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

function DoctorAppointmentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { doctor, timing } = location.state;

  const handleProceedToPaymentClick = () => {
    navigate('payment-confirmation')
  }

  return (
    <>
      {/* Header section */}
      <Header />

      <div className="big-card-container">
        <Row xs={1} sm={2} md={3} className="g-4 justify-content-center mt-3">
          <Col>
            <Card className="border">
              <Card.Img variant="top" src={pic1} />
              <Card.Body>
                <Card.Title className="justify-content-center" >Doctor: Dr.{doctor}</Card.Title>
                <Card.Title className="justify-content-center" >₹ fee here</Card.Title>
                <Card.Title className="justify-content-center" >Date: date</Card.Title>
                <Card.Title className="justify-content-center" >Time: {timing}</Card.Title>
                <Card.Title className="justify-content-center" >Patient Name: patient_name</Card.Title>
                <Card.Title className="justify-content-center" >Any other details you want to share: details</Card.Title>
                
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

      {/* Footer section */}
      <Footer />
    </>
  )
}

export default DoctorAppointmentConfirmation