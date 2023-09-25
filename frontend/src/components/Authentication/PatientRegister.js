import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
} from 'reactstrap';

import axios from '../../api/axios';



const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^.{4,23}$/;
const REGISTER_URL = '/patient-signup'

const PatientRegister = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        { email: email, password: pwd }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      setSuccess(true);
      setEmail('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
          setErrMsg('Email already exist');
      } else {
          setErrMsg('Registration Failed')
      }
    }
  }


  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
      <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-4">
                        <h3 className="text-primary  text-center">Register as a Patient</h3>
                        <p className=' text-center'>Register now!</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          ref={emailRef}
                          autoComplete="off"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Confirm Password </Label>
                        <Input
                          name="password1"
                          type="password"
                          placeholder="Confirm Password"
                          onChange={(e) => setMatchPwd(e.target.value)}
                          value={matchPwd}
                          required
                        />
                      </div>

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Have an account ?{" "}
                  <Link to="/" className="fw-medium text-primary">
                    {" "}
                    Login now{" "}
                  </Link>{" "}
                </p>
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

export default PatientRegister;
