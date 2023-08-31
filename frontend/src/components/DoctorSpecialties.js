import React from 'react'
import { 
  Card,
  Col,
  Row,
} from 'react-bootstrap';

import Header from './Common/Header'
import Footer from './Common/Footer'

import pic1 from '../assets/images/medical/doctor-specialty.svg'
import { useNavigate } from 'react-router-dom';

function DoctorSpecialties() {
  const DoctorSpecialtiesData =[
    {id: 1, title: 'General Medicine', img: pic1},
    {id: 2, title: 'Paediatrics', img: pic1},
    {id: 3, title: 'Gynaecology', img: pic1},
    {id: 4, title: 'Orthopedics', img: pic1},
    {id: 5, title: 'Dermatology', img: pic1},
    {id: 6, title: 'Radiology', img: pic1},
    {id: 7, title: 'Ophthalmology', img: pic1},
  ]

  const navigate = useNavigate();


  return (
    <>
      {/* Header section */}
      <Header />

      <div className="big-card-container">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center mt-3">
          {DoctorSpecialtiesData.map((data) => (
            <Col key={data.id}>
              <Card className="border" onClick={() => navigate(`/doctor-specialties/${data.id}/select-doctor`)}>
                <Card.Img variant="top" src={data.img} />
                <Card.Body>
                  <Card.Title className="justify-content-center" >{data.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  )
}

export default DoctorSpecialties