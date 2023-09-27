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

// Get doctor specializations data from backend
const SPECIALIZATION_DATA ='/doctor-specialization-data'

function DoctorSpecialties() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(SPECIALIZATION_DATA, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setSpecialties(response.data);
        console.log('Specialties data:', response.data)

      } catch (error){
        console.error('Error fetching data', error)
      }};
      fetchData();
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
                <Card className="border" onClick={() => navigate(`/doctor-specialties/${specialty.id}`)}>
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