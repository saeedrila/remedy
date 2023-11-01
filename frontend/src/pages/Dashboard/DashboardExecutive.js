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
                            Appointmets
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

                        {/* Appointments */}
                        <TabPane tabId="2">
                          <Appointments />
                        </TabPane>

                        {/* Staff */}
                        <TabPane tabId="3">
                          <Staff />
                        </TabPane>

                        {/* Payments */}
                        <TabPane tabId="4">
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

export default DashboardExecutive