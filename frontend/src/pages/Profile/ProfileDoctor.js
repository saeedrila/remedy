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
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          Name
          Email Address
          Phone Number
          Gender
          House No.
          Street
          City
          State
          Country
          PIN Code
          Registration document
          Specialty

          Save Changes
          Cancel
        </Container>
      </div>


      {/* Footer section */}
      <Footer />
    </>
  )
}

export default ProfileDoctor