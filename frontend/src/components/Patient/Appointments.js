import React from "react";
import {
  Row,
  Col,
  Card,
  Table,
} from 'react-bootstrap'
import {
  Button,
  CardBody,
  CardTitle,
} from 'reactstrap'


function Appointments() {
  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h2">Documents </CardTitle>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>ID</th>
                      <th>Doctor/Lab's Name</th>
                      <th>Day and time</th>
                      <th>Action</th>
                      <th>Share document</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>id*</td>
                      <td>Megan*</td>
                      <td>Time*</td>
                      <td>
                        <a href="#">Cancel</a>
                      </td>
                      <td>
                        <Button>
                          Upload
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Appointments