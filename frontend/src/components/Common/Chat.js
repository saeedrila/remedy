import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
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
import moment from 'moment';

import Header from "./Header";
import Footer from "./Footer";

// Message API endpoint
// const MESSAGE_API = 'http://127.0.0.1:8000/api/chat'
const GET_MY_MESSAGES_URL = '/my-messages/'
const SEND_MESSAGE_URL = '/send-messages'
const AWS_PUBLIC_URL = 'https://remedy-development.s3.ap-south-1.amazonaws.com'
const AWS_GENERIC_PROFILE = 'https://remedy-development.s3.ap-south-1.amazonaws.com/media/profile_pic/avatar-1.png'

function Chat() {
  const [myEmail, setMyEmail] = useState(localStorage.getItem('email'));
  const [recipientEmail, setRecipientEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  // Getting user_id from accessToken
  const accessToken = localStorage.getItem('accessToken');
  const decoded = jwtDecode(accessToken)
  const user_id = decoded.user_id


  const [chatBoxUsername, setChatBoxUsername] = useState("Steven Franklin");
  const [currentRoomId, setCurrentRoomId] = useState(0);

  const getMessages = async() => {
    try{
      const response = await axios.get(
        GET_MY_MESSAGES_URL + user_id,
        {headers:{'Content-Type': 'application/json'}},
        {withCredentials: true}
      );
      setMessages(response.data)
      console.log('Response.data: ', response.data)
    } catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getMessages();
  }, [])

  const sendMessages = async () =>{
    await fetch(SEND_MESSAGE_URL, {
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

  const getProfilePicUrl = (user) => (
    user.profile_pic_url !== null ? `${AWS_PUBLIC_URL}/${user.profile_pic_url}` : AWS_GENERIC_PROFILE
  );
  const getUsername = (user) => (user.username !== "" ? user.username : user.email);
  
  //Use For Chat Box
  const userChatOpen = (idx, messageId, messageSenderId, messageRecieverId, username) => {
    
    setChatBoxUsername(username);
    setCurrentRoomId(idx);
  };

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
                            <h5 className="font-size-14 mb-3">Recent Chats</h5>
                            <ul className="list-unstyled chat-list" id="recent-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {messages.map((message, idx) => (
                                  <li
                                    key={idx}
                                    className={
                                      currentRoomId === idx
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          idx,
                                          message.id,
                                          message.sender.id,
                                          message.reciever.id,
                                          getUsername(message.sender.id !== user_id ? message.sender : message.reciever)
                                        );
                                      }}
                                    >
                                      <div className="d-flex mb-1">
                                        <div className={message.sender.id !== user_id ? "avatar-xs align-self-center me-3" : "align-self-center me-3"}>
                                          <img
                                            src={getProfilePicUrl(message.sender.id !== user_id ? message.sender : message.reciever)}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                          />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {getUsername(message.sender.id !== user_id ? message.sender : message.reciever)}
                                          </h5>
                                          <p className="text-truncate mb-0">
                                            {message.message}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {moment.utc(message.date).local().startOf('seconds').fromNow()}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
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
                            {chatBoxUsername}
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
                        <form onSubmit={sendMessages}>
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
