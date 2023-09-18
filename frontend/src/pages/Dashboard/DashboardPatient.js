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
import Appointments from '../../components/Patient/Appointments'

import classnames from "classnames";
import Payments from '../../components/Patient/Payments'
import Documents from '../../components/Patient/Documents'

function DashboardPatient(props) {
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
                            }}
                          >
                            My Documents
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
                          <Appointments />
                        </TabPane>

                        {/* My Documents */}
                        <TabPane tabId="2">
                          <Documents />
                        </TabPane>

                        {/* Payments */}
                        <TabPane tabId="3">
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

export default DashboardPatient