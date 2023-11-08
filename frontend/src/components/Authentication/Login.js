import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

// Login URL for backend
const LOGIN_URL = '/account-login'



function Login() {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  useEffect(() => {
    if (auth?.email) {
      navigate('/');
    }
  }, [auth, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
        LOGIN_URL,
        { email: email, password: pwd },
        {headers: 
          {'Content-Type': 'application/json'}},
            {withCredentials: true}
        );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const username = response?.data?.username
      const roles = response?.data?.roles;
      const profilePicURL = response?.data?.profilePicURL
      setAuth({email, roles, accessToken, refreshToken, username});
      console.log('Response: ',response?.data)
      
      localStorage.clear();
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username)
      localStorage.setItem('email', email)
      localStorage.setItem('roles', JSON.stringify(roles))
      localStorage.setItem('profilePicURL', profilePicURL)
      axios.defaults.headers.common['Authorization'] =`Bearer ${accessToken}`;

      navigate(from, {replace: true})
    } catch (error){
      if (error.response?.status === 400){
        toast.error('Email or Password missing');
      } else if (error.response?.status === 401){
        toast.error('Not authorized');
      }else{
        toast.error('Login Error');
      }
    }
  };

  return (
    <>
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
                        <h3 className="text-primary  text-center">Welcome !</h3>
                        <p className=' text-center'>Sign in to continue to Remedy.</p>
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

                      {/* <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div> */}

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
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
    </>
  );
};

export default Login