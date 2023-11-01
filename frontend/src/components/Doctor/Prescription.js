import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from 'react-bootstrap'
import {
  CardBody,
  CardTitle,
} from 'reactstrap'

const FETCH_DOCTOR_APPOINTMENTS = '/fetch-doctor-appointments'

function Prescription() {
  const [doctorAppointmentList, setDoctorAppointmentList] = useState([]);
  const [prescriptionOpenButton, setPrescriptionOpenButton] = useState(false)
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


  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h2">Prescriptions </CardTitle>
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
                          <Button onClick={()=>setPrescriptionOpenButton(true)}>
                            Prescription
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