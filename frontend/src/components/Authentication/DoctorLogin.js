import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withRouter from '../Common/withRouter';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


const ExecutiveLogin = ({ history }) => {
  const [validation, setValidation] = useState({
    values: {},
    touched: {},
    errors: {},
  });

  const handleValidationChange = (e) => {
    const { name, value } = e.target;
    setValidation((prevValidation) => ({
      ...prevValidation,
      values: {
        ...prevValidation.values,
        [name]: value,
      },
    }));
  };

  const handleValidationBlur = (e) => {
    const { name } = e.target;
    setValidation((prevValidation) => ({
      ...prevValidation,
      touched: {
        ...prevValidation.touched,
        [name]: true,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your validation and login logic here
    // For simplicity, this example just redirects after submission
    history.push('/dashboard'); // Replace with your desired route
  };

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
                        <h3 className="text-primary  text-center">Welcome Doctor !</h3>
                        <p className=' text-center'>Sign in as an Doctor to continue to Remedy.</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          value={ExecutiveLogin.email}
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          value={ExecutiveLogin.email}
                        />
                      </div>

                      <div className="form-check">
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
                      </div>

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
    </React.Fragment>
  );
};

export default withRouter(ExecutiveLogin);

ExecutiveLogin.propTypes = {
  history: PropTypes.object,
};
