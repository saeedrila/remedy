import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap'
import {
  CardBody,
  Table,
} from 'reactstrap'
import axios from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify'

// API Endpoints
const GET_ACCOUNT_DETAILS = '/get-doctor-account-details'
const UPDATE_ACCOUNT_DETAILS = '/get-doctor-account-details'
const DOCTOR_SPECIALIZATION_SPECIFIC ='/doctor-specialization-specific'
const DOCTOR_SPECIALIZATION_GENERIC ='/doctor-specialization-generic-url'

function AccountDoctor({ triggerFetch }) {
  const [accountDetails, setAccountDetails] = useState([]);
  const [specializationDetails, setSpecializationDetails] = useState([]);
  const [doctorSpecificSpecialization, setDoctorSpecificSpecialization] = useState([]);
  const [new_specialization, setNewSpecialization] = useState('');

  const [changeSpecializationModalShow, setChangeSpecializationModalShow] = useState(false)
  const [uploadDocumentModalShow, setUploadDocumentModalShow] = useState(false)
  const [accountEditModalShow, setAccountEditModalShow] = useState(false)
  
  const fetchAccountData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(GET_ACCOUNT_DETAILS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setAccountDetails(response.data)
      console.log('Account details: ', response.data)
    } catch(error) {
      console.error('Error fetching data', error)
    }
  }
  const fetchDoctorSpecializationData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(DOCTOR_SPECIALIZATION_GENERIC, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setSpecializationDetails(response.data)
      // console.log('Doctors specializations: ', response.data)
    } catch(error) {
      console.error('Error fetching data', error)
    }
  }
  const fetchDoctorSpecificSpecialization = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(DOCTOR_SPECIALIZATION_SPECIFIC, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setDoctorSpecificSpecialization(response.data)
      // console.log('Doctors specializations: ', response.data)
    } catch(error) {
      console.error('Error fetching data', error)
    }
  }
  useEffect(() => {
    fetchAccountData();
    fetchDoctorSpecializationData();
    fetchDoctorSpecificSpecialization();
  }, [triggerFetch]);

  // Form data storage
  const [formData, setFormData] = useState({
    fee_per_session: accountDetails.fee_per_session || '',
    experience: accountDetails.experience || '',
    description: accountDetails.description || '',
  })
  // Handle form input data
  const handleInputChangeAccountEdit = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountEditSubmit = async () => {
    const updatedData = {};
    for (const[key, value] of Object.entries(formData)) {
      if (value !== '') {
        updatedData[key] = value;
      }
    }
    try {
      await axios.patch(UPDATE_ACCOUNT_DETAILS, updatedData);
      fetchAccountData();
      toast.success('Successfully updated');
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
        toast.error('Error');
      }
    }
    console.log('Updated data:', updatedData)
    setAccountEditModalShow(false)
  }

  // Specialization edit modal
  const handleInputChangeSpecializationEdit = (e) => {
    setNewSpecialization(e.target.value);
  };

  const handleSpecializationEditSubmit = async () => {
    try {
      const response = await axios.post(DOCTOR_SPECIALIZATION_GENERIC, {
        new_title: new_specialization,
      });
      fetchDoctorSpecializationData();
      fetchDoctorSpecificSpecialization();
      if (response.status === 201) {
        setNewSpecialization('');
        setChangeSpecializationModalShow(false);
        toast.success('Successfully created a new specialization');
      } else if (response.status === 200) {
        setNewSpecialization('');
        setChangeSpecializationModalShow(false);
        toast.success('Specialization already present');
      } else {
        toast.error('Error creating a new specialization');
      }
    } catch (error) {
      // Handle network or request-related errors
      console.error('Error:', error);
      // Display an error message to the user
      toast.error('Error creating a new specialization');
    }
  };

  const handleDocumentUpload = async () => {

  }


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
      {/* Upload document Modal */}
      <Modal
        show={uploadDocumentModalShow}
        onHide={() => setUploadDocumentModalShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Specialization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>Document</Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUploadDocumentModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDocumentUpload()}>*Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Specialization Edit Modal */}
      <Modal
        show={changeSpecializationModalShow}
        onHide={() => setChangeSpecializationModalShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Specialization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>Common Specialization</Col>
              <Col>
                {specializationDetails.length > 0 ? (
                  <ul>
                    {specializationDetails.map((specialization, index) => (
                      <li key={index}>{specialization.specialization_title}</li>
                    ))}
                  </ul>
                ) : (
                  'No information uploaded'
                )}
              </Col>
            </Row>
            <Row>
              <Col>Add specialization to account</Col>
              <Col>
                <Form.Control 
                  type="text" 
                  placeholder={"Enter specialization"} 
                  value={new_specialization}
                  name="new_specialization"
                  onChange={handleInputChangeSpecializationEdit}
                />
              </Col>
            </Row>

          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setChangeSpecializationModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSpecializationEditSubmit}>*Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Account Edit Modal */}
      <Modal
        show={accountEditModalShow}
        onHide={() => setAccountEditModalShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row>
            <Col>Fee Per Session</Col>
            <Col>
              <Form.Control 
                type="text" 
                placeholder={accountDetails.fee_per_session || "Enter fee per session"} 
                value={formData.fee_per_session}
                name="fee_per_session"
                onChange={handleInputChangeAccountEdit}
              />
            </Col>
          </Row>
          <Row>
            <Col>Experience</Col>
            <Col>
              <Form.Control 
                type="number" 
                placeholder={accountDetails.experience || "Enter years of experience"}
                pattern="^[0-9]{1,2}$"
                value={formData.experience}
                name="experience"
                onChange={handleInputChangeAccountEdit}
              />
            </Col>
          </Row>
          <Row>
            <Col>Description</Col>
            <Col>
              <Form.Control 
                as="textarea" 
                rows={3}
                placeholder={accountDetails.description || "Description"}
                value={formData.description}
                name="description"
                onChange={handleInputChangeAccountEdit}
              />
            </Col>
          </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAccountEditModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAccountEditSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>


      <div className='small-cards mt-3'>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="table-responsive mt-3">
                    <Table className="table mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Specialization</th>
                          <td>{doctorSpecificSpecialization.length > 0 ? (
                            <ul>
                              {doctorSpecificSpecialization.map((specialization, index) => (
                                <li key={index}>{specialization.specialization_title}</li>
                              ))}
                            </ul>
                          ) : (
                            'No information uploaded and '
                          )}
                          <Button className='m-2' onClick={() => setChangeSpecializationModalShow(true)}>Edit specialization</Button></td>
                        </tr>
                        <tr>
                          <th scope="row">Document</th>
                          <td>{accountDetails.document || 'No document uploaded'} <br/>
                          <Button className='m-2' onClick={() => setUploadDocumentModalShow(true)}>Upload Document</Button></td>
                        </tr>
                        <tr>
                          <th scope="row">Fee per session (₹)</th>
                          <td>{accountDetails.fee_per_session || 'No information uploaded'}</td>
                        </tr>
                        <tr>
                          <th scope="row">Experience in years</th>
                          <td>{accountDetails.experience || 'No information uploaded'}</td>
                        </tr>
                        <tr>
                          <th scope="row">Description</th>
                          <td>{accountDetails.description || 'No information uploaded'}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <Button className='m-4'onClick={() => setAccountEditModalShow(true)}>
                  Edit
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AccountDoctor