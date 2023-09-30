import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import {
  Button,
  Card,
  CardBody,
  Table,
} from 'reactstrap'
import user1 from '../../assets/images/users/avatar-5.jpg'

import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'


function ProfilePatient() {
    return (
        <>
          {/* Header section */}
          <Header />
    
          <div className='small-cards mt-3'>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Col>
                          <img
                            className="rounded-circle profile-image"
                            src={user1}
                            alt="Header Avatar"
                          />
                          <Button className='m-2'>
                            Edit profile image
                          </Button>
                      </Col>
                      <div className="table-responsive mt-3">
                        <Table className="table mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Name</th>
                              <td>Mark</td>
                            </tr>
                            <tr>
                              <th scope="row">Email Address</th>
                              <td>Jacob</td>
                            </tr>
                            <tr>
                              <th scope="row">Phone Number</th>
                              <td>Larry</td>
                            </tr>
                            <tr>
                              <th scope="row">Gender</th>
                              <td>Larry</td>
                            </tr>
                            <tr>
                              <th scope="row">Address</th>
                              <td>Larry</td>
                            </tr>
                            <tr>
                              <th scope="row">State</th>
                              <td>Larry</td>
                            </tr>
                            <tr>
                              <th scope="row">Country</th>
                              <td>Larry</td>
                            </tr>
                            <tr>
                              <th scope="row">PIN Code</th>
                              <td>Larry</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                    <Button className='m-4'>
                      Edit
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
    
    
          {/* Footer section */}
          <Footer />
        </>
      )
}

export default ProfilePatient