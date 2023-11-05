import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';


import linkedin from '../../assets/images/medical/linkedin.png'
import github from '../../assets/images/medical/github.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <div id="page-footer" className="mt-3">
      <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <div className="mt-5 text-center">
              <h1 className="hand-cursor" onClick={() => navigate('/')}>Remedy</h1>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className="mt-5 text-center hand-cursor" onClick={() => navigate('/sitemap')}>
                Sitemap
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className="mt-5 text-center">
                <p>
                  Our Services
                </p>
                <p>
                  Know us
                </p>
                <br/>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <Row>
                <div className="mt-5 text-center">
                  <p>
                    Social Media
                  </p>
                </div>
              </Row>
              <Row>
              <div className="text-center">
              <a href='https://www.linkedin.com/in/saeedrila/' target="_blank" rel="noopener noreferrer">
                <img
                alt='linkedin'
                  className="header-profile-user"
                  src={linkedin}
                />
              </a>
              <a href='https://github.com/saeedrila/remedy' target="_blank" rel="noopener noreferrer">
                <img
                  alt='github'
                  className="header-profile-user"
                  src={github}
                />
              </a>

              </div>
              </Row>
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