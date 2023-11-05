import React from "react";
import {
  Row,
  Col,
  Card,
  Table,
} from 'react-bootstrap'
import {
  CardBody,
  CardTitle,
} from 'reactstrap'


function Documents() {
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
                      <th>Sharing Status</th>
                      <th>Action</th>
                      <th>Updated Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>id*</td>
                      <td>Megan*</td>
                      <td>Shared*</td>
                      <td>View Delete</td>
                      <td>Time*</td>
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

export default Documents