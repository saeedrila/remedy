import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Container,
} from 'react-bootstrap'
import {
  CardBody,
  CardTitle,
} from 'reactstrap'
import { toast } from 'react-toastify';


const FETCH_DOCTOR_APPOINTMENTS = '/fetch-doctor-appointments'
const FETCH_PRESCRIPTOIN = '/fetch-prescription'
const PATCH_PRESCRIPTION = '/patch-prescription'

function Prescription() {
  const [doctorAppointmentList, setDoctorAppointmentList] = useState([]);

  // Prescription modal
  const [prescriptionModalShow, setPrescriptionModalShow] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const [prescriptionDetails, setPrescriptionDetails] = useState('');

  const fetchDoctorAppointmentList = async ()=>{
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(FETCH_DOCTOR_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDoctorAppointmentList(response.data)
    } catch (error){
      console.error('Error fetching data', error)
    }
  }

  useEffect(()=> {
    fetchDoctorAppointmentList();
  }, [])

  const handlePrescriptionModalSubmit = async () =>{
    try{
      const accessToken = localStorage.getItem('accessToken');
      const data = {
        appointment_id: selectedAppointmentId,
        prescription: prescriptionDetails,
      }
      const response = await axios.patch(PATCH_PRESCRIPTION, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log('Prescription submission successful', response.data);
      setPrescriptionModalShow(false);
      fetchDoctorAppointmentList();
      setPrescriptionDetails('')
      toast.success('Prescription submitted', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    } catch (error){
      toast.error('Error while submitting', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      console.error('Error:', error.data);
    }
  }

  const fetchPrescription = async (appointmentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(PATCH_PRESCRIPTION, {
        params: { appointment_id: appointmentId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        if (response.data.prescription === null) {
          setPrescriptionDetails('');
        } else {
          setPrescriptionDetails(response.data.prescription);
        }
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setPrescriptionModalShow(true);
  };


  return (
    <>
      {/* Profile Edit Modal */}
      <Modal
        show={prescriptionModalShow}
        onHide={() => setPrescriptionModalShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div>
              <p>Appointment ID: {selectedAppointmentId}</p>
            </div>
            <textarea 
              className="container-fluid full-width" 
              rows="10" 
              placeholder="Enter your text here..."
              value={prescriptionDetails}
              onChange={(e) => setPrescriptionDetails(e.target.value)}
            >
            </textarea>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPrescriptionModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlePrescriptionModalSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h2">Appointments </CardTitle>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Patient email</th>
                      <th>Appointment ID</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorAppointmentList.map((appointment, index)=>(
                      <tr key={appointment.appointment_id}>
                        <th scope="row">{index + 1}</th>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.slot_type}</td>
                        <td>{appointment.patient_email}</td>
                        <td>{appointment.appointment_id}</td>
                        <td>{appointment.status}</td>
                        <td>
                          <Button onClick={()=>{
                            console.log('Appointment ID: ',appointment.appointment_id)
                            setSelectedAppointmentId(appointment.appointment_id);
                            fetchPrescription(appointment.appointment_id);
                            }}>
                            Prescribe
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Prescription