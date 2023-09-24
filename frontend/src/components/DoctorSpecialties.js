import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import axios from '../api/axios'

// Components
import Header from './Common/Header'
import Footer from './Common/Footer'
// Picture
import pic1 from '../assets/images/medical/doctor-specialty.svg'


function DoctorSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  useEffect(() => {
    axios.get('/doctor-specialization-data')
    .then(response => {
      setSpecialties(response.data);
    })
    .catch(error => {
      console.error('Error fetching data', error)
    })
  }, []);

  const navigate = useNavigate();


  return (
    <>
      {/* Header section */}
      <Header />
      <Container>
        <div className="big-card-container">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center mt-3">
            {specialties.map((specialty) => (
              <Col key={specialty.id}>
                <Card className="border" onClick={() => navigate(`/doctor-specialties/${specialty.id}/select-doctor`)}>
                  <Card.Img variant="top" src={pic1} />
                  <Card.Body>
                    <Card.Title className="justify-content-center" >{specialty.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* Footer section */}
      <Footer />
    </>
  )
}

export default DoctorSpecialties