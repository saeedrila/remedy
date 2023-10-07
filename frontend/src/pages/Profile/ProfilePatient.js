import { React, useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from 'react-bootstrap'
import {
  Card,
  CardBody,
  Table,
} from 'reactstrap'
import axios from '../../api/axios'

import user1 from '../../assets/images/users/avatar-5.jpg'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'

const GET_PROFILE_DETAILS = '/get-patient-profile-details'

function ProfilePatient() {
  // Profile details got from backend
  const [profileDetails, setProfileDetails] = useState([]);

  // Profile edit modal show/hide state
  const [profileEditShow, setProfileEditShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(GET_PROFILE_DETAILS, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setProfileDetails(response.data)
        console.log('Profile data: ', response.data)
      } catch(error){

        console.error('Error fetching data', error)
      }};
    fetchData();
  }, []);

    return (
        <>
          {/* Profile Edit Modal */}
          <Modal
            show={profileEditShow}
            onHide={() => setProfileEditShow(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
              <Row>
                <Col>User Name</Col>
                <Col>
                  <Form.Control 
                    type="text" 
                    placeholder={profileDetails.username || "Enter your user name"} 
                  />
                </Col>
              </Row>
              <Row>
                <Col>Phone Number</Col>
                <Col>
                  <Form.Control 
                    type="text" 
                    placeholder={profileDetails.mobile || "Enter your phone number"}
                    pattern="[0-9]{10}|"
                  />
                </Col>
              </Row>
              <Row>
                <Col>Gender</Col>
                <Col>
                  <Form.Control 
                    as="select"defaultValue={profileDetails.gender || ""}>
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>Age</Col>
                <Col>
                  <Form.Control 
                    type="number" 
                    placeholder={profileDetails.age || "Enter your age"}
                    min={0} 
                    max={99}
                  />
                </Col>
              </Row>
              <Row>
                <Col>Blood Group</Col>
                <Col>
                  <Form.Control 
                    type="text" 
                    placeholder={profileDetails.blood_group || "Enter your Blood Group"}
                  />
                </Col>
              </Row>
              <Row>
                <Col>Address</Col>
                <Col>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    placeholder={profileDetails.address || "Enter your Address"}
                  />
                </Col>
              </Row>
            </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setProfileEditShow(false)}>
                Close
              </Button>
              <Button variant="primary">*Save</Button>
            </Modal.Footer>
          </Modal>

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
                              <th scope="row">Email Address</th>
                              <td>{profileDetails.email}</td>
                            </tr>
                            <tr>
                              <th scope="row">Password</th>
                              <td><Button className='m-2'>Change Password</Button></td>
                            </tr>
                            <tr>
                              <th scope="row">User Name</th>
                              <td>{profileDetails.username || 'No information uploaded'}</td>
                            </tr>
                            <tr>
                              <th scope="row">Phone Number</th>
                              <td>{profileDetails.mobile || 'No information uploaded'}</td>
                            </tr>
                            <tr>
                              <th scope="row">Gender</th>
                              <td>{profileDetails.gender || 'No information uploaded'}</td>
                            </tr>
                            <tr>
                              <th scope="row">Age</th>
                              <td>{profileDetails.age || 'No information uploaded'}</td>
                            </tr>
                            <tr>
                              <th scope="row">Blood Group</th>
                              <td>{profileDetails.blood_group || 'No information uploaded'}</td>
                            </tr>
                            <tr>
                              <th scope="row">Address</th>
                              <td>{profileDetails.address || 'No information uploaded'}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                    <Button className='m-4'onClick={() => setProfileEditShow(true)}>
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