import React, { useState } from 'react'
import {
    Container,
    Row,
    Col,
  } from 'react-bootstrap'
  import {
    Card,
    CardBody,
    CardTitle,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
  } from 'reactstrap'

import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Appointments from './Appointments'

import classnames from "classnames";
import Payments from './Payments'

function DashboardPatient(props) {
  document.title = 'Doctors Dashboard'

  const [verticalActiveTab, setverticalActiveTab] = useState("1");
  const [appointmentsButtonPressed, setAppointmentsButtonPressed] = useState(0);
  const [paymentsButtonPressed, setPaymentsButtonPressed] = useState(0);


  const toggleVertical = tab => {
    if (verticalActiveTab !== tab) {
      setverticalActiveTab(tab);
    }
  };


  return (
    <>
      {/* Header section */}
      <Header />

      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>

                  <Row>
                    <Col md="3">
                    <CardTitle className="h4">Customer's Dashboard</CardTitle>
                    <p className="card-title-desc">
                      Customer's Dashboard
                    </p>
                      <Nav pills className="flex-column">
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTab === "1",
                            })}
                            onClick={() => {
                              toggleVertical("1");
                              setAppointmentsButtonPressed(appointmentsButtonPressed + 1);
                            }}
                          >
                            My Appointments
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTab === "2",
                            })}
                            onClick={() => {
                              toggleVertical("2");
                              setPaymentsButtonPressed(paymentsButtonPressed + 1);
                            }}
                          >
                            Payments
                          </NavLink>
                        </NavItem>
                        
                      </Nav>
                    </Col>
                    <Col md="9">
                      <TabContent
                        activeTab={verticalActiveTab}
                        className="text-muted mt-4 mt-md-0"
                      >

                        {/* My Appointments */}
                        <TabPane tabId="1">
                          <Appointments triggerFetch={appointmentsButtonPressed} />
                        </TabPane>

                        {/* Payments */}
                        <TabPane tabId="2">
                          <Payments triggerFetch={paymentsButtonPressed} />
                        </TabPane>

                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
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

export default DashboardPatient