import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Row, 
  Col 
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

import Footer from '../../components/Common/Footer'
import Header from '../../components/Common/Header'
import BigCard from '../../components/Common/BigCard'
import SmallCard from '../../components/Common/SmallCard'

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

  const BigCardData =[
    {title: "Book a consultation with Doctor now", img: pic1},
    {title: "Book a Laboratory appointment now", img: pic2}
  ]

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
      <BigCard BigCardData ={BigCardData} />
      
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