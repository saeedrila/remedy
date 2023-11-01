import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
} from 'react-bootstrap'
import {
  Button,
  CardBody,
  CardTitle,
} from 'reactstrap'
import axios from "../../api/axios";

const FETCH_PATIENT_APPOINTMENTS = '/fetch-patient-appointments'

function Appointments() {
  const [patientAppointmentList, setPatientAppointmentList] = useState([])
  const fetchPatientAppointmentDetails = async ()=> {
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(FETCH_PATIENT_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPatientAppointmentList(response.data)
      console.log('Patient appointment data: ', response.data)
    } catch (error){
      console.error('Error fetching data', error)
    }
  }

  useEffect(()=> {
    fetchPatientAppointmentDetails();
  }, [])

  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h2">Documents </CardTitle>
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