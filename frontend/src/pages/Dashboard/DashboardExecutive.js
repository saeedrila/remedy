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

import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'
import Dashboard from '../../components/Executive/Dashboard'

import classnames from "classnames";
import Payments from '../../components/Executive/Payments'
import Appointments from '../../components/Executive/Appointments'
import Staff from '../../components/Executive/Staff'



function DashboardExecutive() {
  document.title = 'Executive Dashboard'

  const [verticalActiveTab, setverticalActiveTab] = useState("1");
  const [dashboardButtonPressed, setDashboardButtonPressed] = useState(false);
  const [appointmentsButtonPressed, setAppointmentsButtonPressed] = useState(false);
  const [staffButtonPressed, setStaffButtonPressed] = useState(false);
  const [paymentsButtonPressed, setPaymentsButtonPressed] = useState(false);

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
                    <CardTitle className="h4">Executive's Dashboard</CardTitle>
                    <p className="card-title-desc">
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
                              setDashboardButtonPressed(true);
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
                              setAppointmentsButtonPressed(true);
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
                              active: verticalActiveTab === "3",
                            })}
                            onClick={() => {
                              toggleVertical("3");
                              setStaffButtonPressed(true);
                            }}
                          >
                            Staff
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
                              setPaymentsButtonPressed(true);
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
                          <Dashboard 
                            triggerFetch={dashboardButtonPressed} 
                            setDashboardButtonPressed={setDashboardButtonPressed} 
                          />
                        </TabPane>
                        {/* Appointments */}
                        <TabPane tabId="2">
                          <Appointments 
                            triggerFetch={appointmentsButtonPressed} 
                            setAppointmentsButtonPressed={setAppointmentsButtonPressed} 
                            />
                        </TabPane>
                        {/* Staff */}
                        <TabPane tabId="3">
                          <Staff 
                            triggerFetch={staffButtonPressed} 
                            setStaffButtonPressed={setStaffButtonPressed} 
                          />
                        </TabPane>
                        {/* Payments */}
                        <TabPane tabId="4">
                          <Payments 
                            triggerFetch={paymentsButtonPressed} 
                            setPaymentsButtonPressed={setPaymentsButtonPressed} 
                          />
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

export default DashboardExecutive