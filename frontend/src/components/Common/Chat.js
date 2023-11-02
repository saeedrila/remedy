import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import avatar1 from "../../assets/images/users/avatar-1.png";

import Header from './Header'
import Footer from './Footer'

function Chat() {
  return (
    <>
      {/* Header section */}
      <Header />


      <div className="page-content">
        <Container>

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div >
                    <div className="chat-leftsidebar-nav">
                      <TabContent className="py-4">
                        <TabPane>
                          <div>
                            <ul className="list-unstyled chat-list" id="recent-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                  <li>
                                      <div className="d-flex">
                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            *Person-name
                                          </h5>
                                        </div>
                                      </div>
                                  </li>
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            *Chat-box-user-name
                          </h5>
                        </Col>
                        
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{ height: "470px" }}
                          >
                                <li>
                                  <div className="conversation-list">
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        *Message sender
                                      </div>
                                      <p>*Message</p>
                                    </div>
                                  </div>
                                </li>
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                              />
                              
                            </div>
                          </Col>
                          <Col className="col-auto">
                            <Button
                              type="button"
                              color="primary"
                              className="btn btn-primary btn-rounded chat-send w-md "
                            >
                              <span className="d-none d-sm-inline-block me-2">
                                Send
                              </span>{" "}
                              <i className="mdi mdi-send" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>


      {/* Footer section */}
      <Footer />
    </>
  )
}

export default Chat