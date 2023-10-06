import { React, useState, useEffect } from 'react'
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
import axios from '../../api/axios'

import user1 from '../../assets/images/users/avatar-5.jpg'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'

const GET_PROFILE_DETAILS = '/get-patient-profile-details'

function ProfilePatient() {
  const [profileDetails, setProfileDetails] = useState([]);

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