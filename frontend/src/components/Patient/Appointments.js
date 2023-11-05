import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Modal,
  Container,
  Button,
} from 'react-bootstrap'
import {
  CardBody,
  CardTitle,
} from 'reactstrap'
import axios from "../../api/axios";

const FETCH_PATIENT_APPOINTMENTS = '/fetch-patient-appointments'
const FETCH_PATIENT_PRESCRIPTION = '/fetch-patient-prescription'

function Appointments({ triggerFetch }) {
  const [patientAppointmentList, setPatientAppointmentList] = useState([]);
  const [prescriptionModalShow, setPrescriptionModalShow] = useState(false);
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');

  const fetchPatientAppointmentDetails = async ()=> {
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(FETCH_PATIENT_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPatientAppointmentList(response.data)
    } catch (error){
      console.error('Error fetching data', error)
    }
  }

  const fetchPrescription = async (appointmentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(FETCH_PATIENT_PRESCRIPTION, {
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

  useEffect(()=> {
    fetchPatientAppointmentDetails();
  }, [triggerFetch])

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
                      <th>Doctor/Lab</th>
                      <th>Appointment ID</th>
                      <th>Status</th>
                      <th>Prescription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientAppointmentList.map((appointment, index)=>(
                      <tr key={appointment.appointment_id}>
                      <th scope="row">{index + 1}</th>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.slot_type}</td>
                      <td>{appointment.doctor_email}</td>
                      <td>{appointment.appointment_id}</td>
                      <td>{appointment.status}</td>
                      <td><Button 
                        disabled={appointment.status !== 'Completed'}
                        onClick={()=>{
                          fetchPrescription(appointment.appointment_id);
                          setSelectedAppointmentId(appointment.appointment_id)
                        }}>Open</Button>
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

export default Appointments