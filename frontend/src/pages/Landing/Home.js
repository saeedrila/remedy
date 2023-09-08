import React from 'react'
import { 
  Container, 
  Row, 
  Col 
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Footer from '../../components/Common/Footer'
import Header from '../../components/Common/Header'
import BigCard from '../../components/Common/BigCard'
import SmallCard from '../../components/Common/SmallCard'


import pic1 from '../../assets/images/medical/medical-prescription-logo.svg'
import pic2 from '../../assets/images/medical/blood-test-logo.svg'


function Home() {
  const BigCardData =[
    {title: "Book a consultation with Doctor", img: pic1},
    {title: "Book a Laboratory test", img: pic2}]

  const SpecialtiesSmallCardData =[
    {title: "General Medicine", img: pic1},
    {title: "Paediatrics", img: pic1},
    {title: "Gynaecology", img: pic1},
    {title: "Orthopedics", img: pic1},
  ]

  const LabSmallCardData =[
    {title: "Complete Blood Count", img: pic2},
    {title: "Lipid Profile", img: pic2},
    {title: "Thyroid Profile", img: pic2},
    {title: "Blood Sugar", img: pic2},
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
              <Link to="/doctor-specialties" className="card-title">All specialties &gt;</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <SmallCard SmallCardData={SpecialtiesSmallCardData} />
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