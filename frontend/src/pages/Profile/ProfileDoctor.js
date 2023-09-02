import React from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormLabel,
  Input,
} from 'react-bootstrap'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'


function ProfileDoctor() {
  return (
    <>
      {/* Header section */}
      <Header />

      <div className='big-card-container'>
        <Container>
          <Row className='justify-content-center'>
            <Col>
              Welcome (name)
              Update image
              Save Changes
              Cancel
            </Col>
          </Row>
        </Container>
      </div>


      <div>Profile Picture</div>



      Name
      Email Address
      Phone Number
      Gender
      House No.
      Street
      City
      State
      Country
      PIN Code
      Registration document
      Specialty

      Save Changes
      Cancel

      {/* Footer section */}
      <Footer />
    </>
  )
}

export default ProfileDoctor