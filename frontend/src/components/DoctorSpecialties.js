import { React, useEffect, useState } from 'react'
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

// API Endpoints
const DOCTOR_SPECIALIZATION_GENERIC ='/doctor-specialization-generic-url'



function DoctorSpecialties() {
  const [specializationDetails, setSpecializationDetails] = useState([]);

  const fetchDoctorSpecializationData = async () => {
    try {
      const response = await axios.get(DOCTOR_SPECIALIZATION_GENERIC, {
      })
      const updatedSpecializations = response.data.map(item => ({
        ...item,
        img: pic1
      }));
      setSpecializationDetails(updatedSpecializations)
      console.log('Doctors specializations: ', updatedSpecializations)
    } catch(error) {
      console.error('Error fetching data', error)
    }
  }
  useEffect(() => {
    fetchDoctorSpecializationData();
  }, []);

  const navigate = useNavigate();


  return (
    <>
      {/* Header section */}
      <Header />
      <Container>
        <div className="big-card-container">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center mt-3">
            {specializationDetails.map((data, idx) => (
              <Col key={idx}>
                <Card className="border" 
                  onClick={() => {
                    const title = data.specialization_title.replace(/ /g, '-');
                    navigate(`/doctor-at-specialization/${title}`)
                  }}
                >
                  <Card.Img variant="top" src={data.img} />
                  <Card.Body>
                    <Card.Title className="justify-content-center" >{data.specialization_title}</Card.Title>
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