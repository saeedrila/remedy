import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withRouter from '../Common/withRouter';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';


const Footer = () => {

  return (
    <React.Fragment>
      <div id="page-footer">
      <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <div className="mt-5 text-center">
                <h1>
                  Remedy
                </h1>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className="mt-5 text-center">
                <p>
                  Know Us
                </p>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className="mt-5 text-center">
                <p>
                  Our Services
                </p>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className="mt-5 text-center">
                <p>
                  Social Media
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-3 text-center">
                <p>
                  © {new Date().getFullYear()}. Crafted with 
                  <i className="mdi mdi-heart text-danger" /> by Remedy
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Footer;
