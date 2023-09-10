import React from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormLabel,
  Input,
} from 'react-bootstrap'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Table,
} from 'reactstrap'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'


function ProfileDoctor() {
  return (
    <>
      {/* Header section */}
      <Header />

      <div className='big-card-container'>
        <Container>
          <Row className='justify-content-center'>
            <Col>
              Welcome (name)
              Update image
              Save Changes
              Cancel
            </Col>
          </Row>
        </Container>
      </div>
      <div>Profile Picture</div>
      <div className='small-cards'>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Basic example</CardTitle>
                  <p className="card-title-desc">
                    For basic styling—light padding and only horizontal
                    dividers—add the base className <code>.table</code> to any
                    <code>&lt;table&gt;</code>.
                  </p>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Name</th>
                          <td>Mark</td>
                        </tr>
                        <tr>
                          <th scope="row">Email Address</th>
                          <td>Jacob</td>
                        </tr>
                        <tr>
                          <th scope="row">Phone Number</th>
                          <td>Larry</td>
                        </tr>
                        <tr>
                          <th scope="row">Gender</th>
                          <td>Larry</td>
                        </tr>
                        <tr>
                          <th scope="row">Address</th>
                          <td>Larry</td>
                        </tr>
                        <tr>
                          <th scope="row">State</th>
                          <td>Larry</td>
                        </tr>
                        <tr>
                          <th scope="row">Country</th>
                          <td>Larry</td>
                        </tr>
                        <tr>
                          <th scope="row">PIN Code</th>
                          <td>Larry</td>
                        </tr>
                        <tr>
                          <th scope="row">Registration document</th>
                          <td>Larry</td>
                        </tr>
                        <tr>
                          <th scope="row">Specialty</th>
                          <td>Larry</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <Button className='m-4'>
                  Edit
                </Button>
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

export default ProfileDoctor