import React, { useState, useEffect } from "react";
import Pusher from 'pusher-js';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "../../api/axios";

import Header from "./Header";
import Footer from "./Footer";

// Message API endpoint
const MESSAGE_API = 'http://127.0.0.1:8000/api/chat'

function Chat() {
  const [myEmail, setMyEmail] = useState(localStorage.getItem('email'));
  const [recipientEmail, setRecipientEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  let allMessages = [];

  useEffect(()=>{
    var pusher = new Pusher('f9b8560bd1453f12aead', {
      cluster: 'ap2'
    });
    var channel = pusher.subscribe('Remedy-development');
    channel.bind('message', function(data) {
      allMessages.push(data);
      setMessages(allMessages)
    });
  }, [])

  const messageSubmit = async e =>{
    e.preventDefault();
    await fetch(MESSAGE_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        senderEmail: myEmail,
        recipientEmail,
        message
      })
    });
    setMessage('')
  }

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
                  <div>
                    <div className="chat-leftsidebar-nav">
                      <TabContent className="py-4">
                        <TabPane>
                          <div>
                            <ul
                              className="list-unstyled chat-list"
                              id="recent-list"
                            >
                                <li>
                                  <div className="d-flex">
                                    <div className="flex-grow-1 overflow-hidden">
                                      <h5 className="text-truncate font-size-14 mb-3">
                                        Enter recipient's email:
                                      </h5>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex">
                                    <div className="flex-grow-1 overflow-hidden">
                                      <h5 className="text-truncate font-size-14 mb-1">
                                      <input
                                        type="text"
                                        className="form-control chat-input"
                                        placeholder="Enter Recipient's email"
                                        value={recipientEmail}
                                        onChange={e => setRecipientEmail(e.target.value)}
                                      />
                                      </h5>
                                    </div>
                                  </div>
                                </li>
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
                            {recipientEmail}
                          </h5>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar style={{ height: "470px" }}>
                            {messages.map((message, index) => {
                              const isMyMessage = message.email === myEmail;
                              const messageClass = isMyMessage ? 'right' : '';
                              return (
                                <li key={index}className={`${messageClass}`}>
                                  <div className="conversation-list">
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.email}
                                      </div>
                                      <p>{message.message}</p>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <form onSubmit={messageSubmit}>
                          <Row>
                            <Col>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control chat-input"
                                  placeholder="Enter Message..."
                                  value={message}
                                  onChange={e => setMessage(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col className="col-auto">
                              <Button
                                type="submit"
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
                        </form>
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
  );
}

export default Chat;
