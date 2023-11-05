import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap'
import {
  CardBody,
  CardTitle,
  CardText,
  Progress
} from 'reactstrap'
import axios from '../../api/axios'

const FETCH_DASHBOARD_DATA = '/fetch-doctor-dashboard-data'

function Dashboard({ triggerFetch }) {
  const [doctorDashboardData, setDoctorDashboardData] = useState({})

  const fetchDoctorDashboardData = async ()=>{
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(FETCH_DASHBOARD_DATA, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDoctorDashboardData(response.data)
      console.log('Dashboard API called')
    } catch (error){
      console.error('Error fetching data', error)
    }
  }
  useEffect(()=> {
    fetchDoctorDashboardData();
  }, [triggerFetch])

  return (
    <>
      <Container>
        <Row>
          <Col lg={6}>
            <Card>
              <Row className="no-gutters align-items-center">
                <Col md={10}>
                  <CardBody>
                    <CardTitle>Total appointments attended</CardTitle>
                    <CardText>
                      {doctorDashboardData.total_appointments_catered}
                    </CardText>
                  </CardBody>
                </Col>
                <Col md={2}>
                <i className="bx bx-notepad fa-4x"></i>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <Row className="no-gutters align-items-center">
                <Col md={10}>
                  <CardBody>
                    <CardTitle>Amount earned in last week</CardTitle>
                    <CardText>
                    ₹ {doctorDashboardData.total_staff_payment_last_week}
                    </CardText>
                  </CardBody>
                </Col>
                <Col md={2}>
                <i className="bx bx-wallet fa-4x"></i>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col mg={6}>
            <Card>
              <CardBody>
                <CardTitle className="mt-0">Today's Appointments</CardTitle>
                <Row className='justify-content-center align-items-center'>
                  <Col sm={3} className='text-center'>
                    <i className="bx bx-notepad fa-4x"></i>
                  </Col>
                </Row>
                <CardText>
                  <Container>
                  <Row>
                    <Col sm={6} className='text-center'>
                    <p>
                      Total:
                    </p>
                    </Col>
                    <Col sm={6} className='text-center'>
                      Completion:
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6} className='text-center fs-4'>
                    <p>
                    {doctorDashboardData.total_appointments_today}
                    </p>
                    </Col>
                    <Col sm={6} className='text-center fs-4'>
                    {doctorDashboardData.total_appointments_today_completed}/
                    {doctorDashboardData.total_appointments_today}
                    </Col>
                  </Row>
                  </Container>

                </CardText>
              </CardBody>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p>Overall</p>
                  <div >
                    <Progress
                      value={doctorDashboardData.total_appointment_today_completed_perc}
                      color="primary"
                      style={{ width: '100%' }}
                      animated
                    ></Progress>
                  </div>
                </li>
                {/* <li className="list-group-item">
                  <p>In-Person</p>
                  <div >
                    <Progress
                      value={50}
                      color="primary"
                      style={{ width: '100%' }}
                      animated
                    ></Progress>
                  </div>
                  </li>
                  <li className="list-group-item">
                  <p>Online</p>
                  <div >
                    <Progress
                      value={50}
                      color="primary"
                      style={{ width: '100%' }}
                      animated
                    ></Progress>
                  </div>
                  </li> */}
              </ul>
            </Card>
          </Col>
          {/* <Col mg={6}>
            <Card>
              <CardBody>
                <CardTitle className="mt-0">Confirmed Appointments</CardTitle>
                <Row className='justify-content-center align-items-center'>
                  <Col sm={3} className='text-center'>
                    <i className="bx bx-calendar-check fa-4x"></i>
                  </Col>
                </Row>
                <CardText>
                  <Container>
                  <Row>
                    <Col sm={12} className='text-center'>
                    <p>
                      Total:
                    </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className='text-center fs-4'>
                    <p>
                      12*
                    </p>
                    </Col>
                  </Row>
                  </Container>
                </CardText>
              </CardBody>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <p>Today</p>
                  <p className='text-right'>12*</p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Tomorrow
                  <p className='text-right'>12*</p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Day after tomorrow
                  <p className='text-right'>12*</p>
                </li>
              </ul>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  )
}

export default Dashboard