import React from 'react'
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

function Staff() {
  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h2">Prescriptions </CardTitle>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>ID</th>
                      <th>Account type</th>
                      <th>Document</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>id*</td>
                      <td>Doctor*</td>
                      <td>Document*</td>
                      <td>To be approved*</td>
                      <td>
                        <Button>
                          Edit*
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

export default Staff