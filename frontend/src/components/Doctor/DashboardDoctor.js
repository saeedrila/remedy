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
import Dashboard from './Dashboard'

import classnames from "classnames";
import Availability from './Availability'
import Appointments from './Appointments'
import Payments from './Payments'
import AccountDoctor from './AccountDoctor'

function DashboardDoctor() {
  document.title = 'Doctors Dashboard'

  const [verticalActiveTab, setverticalActiveTab] = useState("1");
  const [dashboardButtonPressed, setDashboardButtonPressed] = useState(0);
  const [accountButtonPressed, setAccountButtonPressed] = useState(0);
  const [availabilityButtonPressed, setAvailabilityButtonPressed] = useState(0);
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
                    <CardTitle className="h4">Doctor's Dashboard</CardTitle>
                    <p className="card-title-desc">
                      Doctor's Dashboard
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
                              setDashboardButtonPressed(dashboardButtonPressed + 1);
                            }}
                          >
                            Dashboard
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
                              setAccountButtonPressed(accountButtonPressed + 1);
                            }}
                          >
                            Account
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTab === "3",
                            })}
                            onClick={() => {
                              toggleVertical("3");
                              setAvailabilityButtonPressed(availabilityButtonPressed + 1);
                            }}
                          >
                            Availability
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTab === "4",
                            })}
                            onClick={() => {
                              toggleVertical("4");
                              setAppointmentsButtonPressed(appointmentsButtonPressed + 1);
                            }}
                          >
                            Appointments
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTab === "5",
                            })}
                            onClick={() => {
                              toggleVertical("5");
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

                        {/* Dashboard */}
                        <TabPane tabId="1">
                          <Dashboard triggerFetch={dashboardButtonPressed} />
                        </TabPane>

                        {/* My Account */}
                        <TabPane tabId="2">
                        <AccountDoctor triggerFetch={accountButtonPressed} />
                        </TabPane>

                        {/* My availability */}
                        <TabPane tabId="3">
                          <Availability triggerFetch={availabilityButtonPressed} />
                        </TabPane>

                        {/* My prescription */}
                        <TabPane tabId="4">
                          <Appointments triggerFetch={appointmentsButtonPressed} />
                        </TabPane>

                        {/* Payments */}
                        <TabPane tabId="5">
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

export default DashboardDoctor