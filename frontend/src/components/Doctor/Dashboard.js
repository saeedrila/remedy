import React from 'react'
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

function Dashboard() {
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
                      120
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
                    <CardTitle>Amount earned in last 7 days</CardTitle>
                    <CardText>
                      $ 10,000
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
                      12*
                    </p>
                    </Col>
                    <Col sm={6} className='text-center fs-4'>
                      6/12*
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
                      value={50}
                      color="primary"
                      style={{ width: '100%' }}
                      animated
                    ></Progress>
                  </div>
                </li>
                <li className="list-group-item">
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
                  </li>
              </ul>
            </Card>
          </Col>
          <Col mg={6}>
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
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard