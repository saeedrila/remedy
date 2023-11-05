import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
const REGISTER_URL = '/account-signup'

const PatientRegister = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      toast.error("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        email,
        pwd,
        account_type: 'doctor'
      });
      console.log(response.data);
      console.log(response.accessToken);
      setEmail('');
      setPwd('');
      setMatchPwd('');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Email already exists');
        } else {
          toast.error('Registration Failed');
        }
      } else {
        toast.error('No Server Response');
      }
    }
  }


  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="account-pages my-5 pt-sm-5">
      <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-4">
                        <h3 className="text-primary  text-center">Register as Doctor</h3>
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
                <div className='d-flex justify-content-center'>
                  <p className="hand-cursor mx-2" onClick={() => navigate('/register')}>Patient's Register{" "}</p>
                  <p className="hand-cursor mx-2" onClick={() => navigate('/doctor-register')}>Doctor's Register{" "}</p>
                  <p className="hand-cursor mx-2" onClick={() => navigate('/lab-register')}>Lab's Register{" "}</p>
                  <p className="hand-cursor mx-2" onClick={() => navigate('/executive-register')}>Executive's Register{" "}</p>
                </div>
                <p>
                  Have an account ?{" "}
                  <Link to="/login" className="fw-medium text-primary">
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
