import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Row, 
  Col,
  Card, 
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

import Footer from './Footer'
import Header from './Header'
import SmallCard from './SmallCard'

import pic1 from '../../assets/images/medical/medical-prescription-logo.svg'
import pic2 from '../../assets/images/medical/blood-test-logo.svg'

// API Endpoints
const DOCTOR_SPECIALIZATION_GENERIC ='/doctor-specialization-generic-url'

function Home() {
  document.title = 'Remedy Home'
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
    } catch(error) {
      console.error('Error fetching data', error)
    }
  }
  useEffect(() => {
    fetchDoctorSpecializationData();
  }, []);


  const LabSmallCardData =[
    {specialization_title: "Complete Blood Count", img: pic2},
    {specialization_title: "Lipid Profile", img: pic2},
    {specialization_title: "Thyroid Profile", img: pic2},
    {specialization_title: "Blood Sugar", img: pic2},
  ]

  return (
    <>
      {/* Header section */}
      <Header />

      {/* Top big cards */}
      <Container>
        <div className="big-card-container">
          <Row xs={1} md={3} lg={4} className="g-4 justify-content-center mt-3">
            <Col>
              <Link to="/doctor-at-specialization">
                <Card>
                  <Card.Img variant="top" src={pic1} />
                  <Card.Body>
                    <Card.Title className="justify-content-center hand-cursor" >Book a consultation with Doctor now</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="/link-here">
                <Card>
                  <Card.Img variant="top" src={pic2} />
                  <Card.Body>
                    <Card.Title className="justify-content-center hand-cursor" >Book a Laboratory appointment now</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
      
      {/* Doctor specialties selection */}
      <div className="small-cards mt-3">
        <Container>
          <Row>
            <Col className='mt-3'>
              <div className="card-title">Quick selection: </div>
            </Col>
            <Col className='text-end mt-3'>
              <Link to="/doctor-at-specialization" className="card-title">All specialties &gt;</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <SmallCard SmallCardData={specializationDetails} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Lab tests selection */}
      <div className="small-cards mt-3">
        <Container>
          <Row>
            <Col className='mt-3'>
              <div className="card-title">Quick selection: </div>
            </Col>
            <Col className='text-end mt-3'>
              <Link to="/lab-tests" className="card-title">All lab tests &gt;</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <SmallCard SmallCardData={LabSmallCardData} />
            </Col>
          </Row>
        </Container>
      </div>
      {/* Footer section */}
      <Footer />
    </>
  )
}

export default Home