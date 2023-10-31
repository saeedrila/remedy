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
                      <th>Appointment ID</th>
                      <th>Doctor/Lab's Name</th>
                      <th>Day and time</th>
                      <th>Action</th>
                      <th>Share document</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>id*</td>
                      <td>Megan*</td>
                      <td>Time*</td>
                      <td>
                        <a href="#">Cancel</a>
                      </td>
                      <td>
                        <Button>
                          Upload
                        </Button>
                      </td>
                    </tr>
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