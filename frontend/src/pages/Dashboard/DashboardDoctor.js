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
import Dashboard from '../../components/Doctor/Dashboard'
import Appointments from '../../components/Doctor/Appointments'

import classnames from "classnames";
import Availability from '../../components/Doctor/Availability'
import Prescription from '../../components/Doctor/Prescription'
import Payments from '../../components/Doctor/Payments'

function DashboardDoctor() {
  document.title = 'Doctors Dashboard'

  const [verticalActiveTab, setverticalActiveTab] = useState("1");
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
                            }}
                          >
                            My Appointmets
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
                            }}
                          >
                            My Availability
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
                            }}
                          >
                            My Prescription
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
                          <Dashboard />
                        </TabPane>

                        {/* My appointments */}
                        <TabPane tabId="2">
                          <Appointments />
                        </TabPane>

                        {/* My availability */}
                        <TabPane tabId="3">
                          <Availability />
                        </TabPane>

                        {/* My prescription */}
                        <TabPane tabId="4">
                          <Prescription />
                        </TabPane>

                        {/* Payments */}
                        <TabPane tabId="5">
                          <Payments />
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