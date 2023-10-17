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
import { toast } from 'react-toastify'

import user1 from '../../assets/images/users/avatar-5.jpg'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'

// Password validation
const PWD_REGEX = /^.{4,23}$/;

// API endpoints
const GET_PROFILE_DETAILS = '/get-patient-profile-details'
const UPDATE_PROFILE_DETAILS = '/get-patient-profile-details'
const CHANGE_PASSWORD = '/change-password'


function ProfilePatient() {
  // Profile details recieved from backend
  const [profileDetails, setProfileDetails] = useState([]);

  // Password
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');

  // Profile edit modal show/hide state
  const [ProfileEditModalShow, setProfileEditModalShow] = useState(false);
  const [ChangePasswordModalShow, setChangePasswordModalShow] = useState(false);

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!pwd || !matchPwd || !newPwd) {
      toast.error('Please enter details', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return;
    }
    if (newPwd !== matchPwd){
      toast.error('Password does not match', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      })
      return;
    }
    try {
      const response = await axios.post(CHANGE_PASSWORD, {
        current_password: pwd,
        new_password: newPwd
      })
      console.log(response.data)
      setChangePasswordModalShow(false);
      // Reset form
      setPwd('');
      setMatchPwd('');
      setNewPwd('');

      toast.success('Password changed successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
  
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('An error occurred while changing the password', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  const fetchProfileData = async () => {
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

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Form data storage
  const [formData, setFormData] = useState({
    username: profileDetails.username || '',
    mobile: profileDetails.mobile || '',
    gender: profileDetails.gender || '',
    age: profileDetails.age || '',
    blood_group: profileDetails.blood_group || '',
    address: profileDetails.address || '',
  })

  // Handle form input data
  const handleInputChangeProfileEdit = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit of input data
  const handleProfileEditSubmit = async () => {
    const updatedData = {};
    for (const[key, value] of Object.entries(formData)) {
      if (value !== '') {
        updatedData[key] = value;
      }
    }
    try {
      const response = await axios.patch(UPDATE_PROFILE_DETAILS, updatedData);
      fetchProfileData();
      toast.success('Successfully updated', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      setFormData({
        username: '',
        mobile: '',
        gender: '',
        age: '',
        blood_group: '',
        address: '',
      });
    } catch (error) {
      if (error.response){
        toast.error('Error', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
      }
    }
    console.log('Updated data:', updatedData)
    setProfileEditModalShow(false)
  }

    return (
        <>
          {/* Change Password Modal */}
          <Modal
            show={ChangePasswordModalShow}
            onHide={() => setChangePasswordModalShow(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
              <Row>
                <Col>Old Password</Col>
                <Col>
                  <Form.Control 
                    type="password" 
                    placeholder={"Enter old password"} 
                    name="pwd"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>New Password</Col>
                <Col>
                  <Form.Control 
                    type="password" 
                    placeholder={"New Password"}
                    name="newPwd"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    
                  />
                </Col>
              </Row>
              <Row>
                <Col>New Password again</Col>
                <Col>
                  <Form.Control 
                    type="password" 
                    placeholder={"Enter new password again"}
                    name="matchPwd"
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                  />
                </Col>
              </Row>
            </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setChangePasswordModalShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleChangePasswordSubmit}>Save</Button>
            </Modal.Footer>
          </Modal>

          {/* Profile Edit Modal */}
          <Modal
            show={ProfileEditModalShow}
            onHide={() => setProfileEditModalShow(false)}
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
                    value={formData.username}
                    name="username"
                    onChange={handleInputChangeProfileEdit}
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
                    value={formData.mobile}
                    name="mobile"
                    onChange={handleInputChangeProfileEdit}
                  />
                </Col>
              </Row>
              <Row>
                <Col>Gender</Col>
                <Col>
                  <Form.Control 
                    as="select"
                    value={formData.gender}
                    name="gender"
                    onChange={handleInputChangeProfileEdit}
                    >
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
                    value={formData.age}
                    name="age"
                    onChange={handleInputChangeProfileEdit}
                  />
                </Col>
              </Row>
              <Row>
                <Col>Blood Group</Col>
                <Col>
                  <Form.Control 
                    type="text" 
                    placeholder={profileDetails.blood_group || "Enter your Blood Group"}
                    value={formData.blood_group}
                    name="blood_group"
                    onChange={handleInputChangeProfileEdit}
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
                    value={formData.address}
                    name="address"
                    onChange={handleInputChangeProfileEdit}
                  />
                </Col>
              </Row>
            </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setProfileEditModalShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleProfileEditSubmit}>*Save</Button>
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
                              <td><Button className='m-2' onClick={() => setChangePasswordModalShow(true)}>Change Password</Button></td>
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
                    <Button className='m-4'onClick={() => setProfileEditModalShow(true)}>
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