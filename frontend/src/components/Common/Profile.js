import { React, useState, useEffect } from 'react'
import { useFormik } from 'formik'
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
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../api/axios'
import Dropzone from "react-dropzone";

import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'

// API endpoints
const GET_PROFILE_DETAILS = '/get-patient-profile-details'
const UPDATE_PROFILE_DETAILS = '/patch-profile-details'
const UPLOAD_PROFILE_IMAGE = '/upload-profile-image'
const CHANGE_PASSWORD = '/change-password'


function Profile() {
  // Profile details recieved from backend
  const [profileDetails, setProfileDetails] = useState([]);

  // Password
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');

  // Profile edit, Profile image, Password modal show/hide state
  const [profileEditModalShow, setProfileEditModalShow] = useState(false);
  const [profileImageEditModalShow, setProfileImageEditModalShow] = useState(false);
  const [selectedFiles, setselectedFiles] = useState([]);
  const [ChangePasswordModalShow, setChangePasswordModalShow] = useState(false);

  const [profilePicURL, setProfilePicURL] = useState('');

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!pwd || !matchPwd || !newPwd) {
      toast.error('Please enter details');
      return;
    }
    if (newPwd !== matchPwd){
      toast.error('Password does not match')
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

      toast.success('Password changed successfully');
  
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('An error occurred while changing the password');
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
    } catch(error){
      console.error('Error fetching data', error)
    }};

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    try{
      const url = localStorage.getItem('profilePicURL');
      setProfilePicURL(url)
    } catch (error){
      const url = 'example.com'
      setProfilePicURL(url)
    }
  }, [profilePicURL]);

  const formik = useFormik({
    initialValues: {
      username: '',
      mobile: '',
      gender: '',
      age: '',
      blood_group: '',
      address: '',
    },
    onSubmit: async(values) => {
      try {
        await axios.patch(UPDATE_PROFILE_DETAILS, values);
        fetchProfileData();
        toast.success('Successfully updated');
      } catch (error) {
        if (error.response){
          toast.error('Error');
        }
      }
      setProfileEditModalShow(false)
    },
    validate: (values) => {
      let errors = {};
      if (values.username && values.username.trim() === '') {
        errors.username = 'Username cannot be blank';
      }
    
      if (values.mobile) {
        if (values.mobile.trim() === '') {
          errors.mobile = 'Mobile number cannot be blank';
        } else if (!/^\d{10}$/.test(values.mobile)) {
          errors.mobile = 'Mobile number must be exactly 10 digits';
        }
      }
      if (values.gender && !['Male', 'Female'].includes(values.gender)) {
        errors.gender = 'Gender must be either Male or Female';
      }
      if (values.age !== '' && (values.age < 0 || values.age > 100)) {
        errors.age = 'Age must be between 0 and 100';
      }
      if (values.blood_group) {
        if (!/^(A|B|AB|O)[+-]$/.test(values.blood_group)) {
          errors.blood_group = 'Invalid blood group';
        }
      }
      if (values.address && values.address.length > 200) {
        errors.address = 'Address should be at most 200 characters';
      }
      return errors;
    },
  })

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const handleProfileImageSubmit = async () => {
    try {
      if (selectedFiles.length === 0) {
        return;
      }
      const formData = new FormData();
      formData.append('profileImage', selectedFiles[0]);
  
      const response = await axios.post(UPLOAD_PROFILE_IMAGE, formData, {
      });
  
      console.log('Response data: ', response.data)
      const returnUrl = response.data?.profilePublicUrl
      localStorage.setItem('profilePicURL', returnUrl)
      setProfilePicURL(returnUrl)
      setProfileImageEditModalShow(false);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('An error occurred while uploading file');
    }
  };


 
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Profile Image Modal */}
      <Modal
        show={profileImageEditModalShow}
        onHide={() => setProfileImageEditModalShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Dropzone
                onDrop={acceptedFiles => {
                  handleAcceptedFiles(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone">
                    <div
                      className="dz-message needsclick mt-2"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <div className="mb-3">
                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                      </div>
                      <h4>Drop files here or click to upload.</h4>
                    </div>
                  </div>
                )}
              </Dropzone>
            </Col>
          </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setProfileImageEditModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProfileImageSubmit}>Upload</Button>
        </Modal.Footer>
      </Modal>

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
        show={profileEditModalShow}
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
                value={formik.values.username}
                name="username"
                onChange={formik.handleChange}
                isInvalid={formik.touched.username && formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row>
            <Col>Phone Number</Col>
            <Col>
              <Form.Control 
                type="text" 
                placeholder={profileDetails.mobile || "Enter your phone number"}
                pattern="[0-9]{10}|"
                value={formik.values.mobile}
                name="mobile"
                onChange={formik.handleChange}
                isInvalid={formik.touched.mobile && formik.errors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.mobile}
              </Form.Control.Feedback>

            </Col>
          </Row>
          <Row>
            <Col>Gender</Col>
            <Col>
              <Form.Control 
                as="select"
                value={formik.values.gender}
                name="gender"
                onChange={formik.handleChange}
                isInvalid={formik.touched.gender && formik.errors.gender}
                >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.gender}
              </Form.Control.Feedback>

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
                value={formik.values.age}
                name="age"
                onChange={formik.handleChange}
                isInvalid={formik.touched.age && formik.errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.age}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row>
            <Col>Blood Group</Col>
            <Col>
              <Form.Control 
                type="text" 
                placeholder={profileDetails.blood_group || "Enter your Blood Group"}
                value={formik.values.blood_group}
                name="blood_group"
                onChange={formik.handleChange}
                isInvalid={formik.touched.blood_group && formik.errors.blood_group}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.blood_group}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row>
            <Col>Address</Col>
            <Col>
              <Form.Control 
                as="textarea" 
                rows={3}
                placeholder={profileDetails.address || "Enter your Address"}
                value={formik.values.address}
                name="address"
                onChange={formik.handleChange}
                isInvalid={formik.touched.address && formik.errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setProfileEditModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>Save</Button>
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
                        src={profilePicURL}
                        alt="Header Avatar"
                      />
                      <Button className='m-2' onClick={() => setProfileImageEditModalShow(true)}>
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

export default Profile