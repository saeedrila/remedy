import React from 'react'
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

function Payments() {
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
                      <th>Payment status</th>
                      <th>Payment Date</th>
                      <th>Doctor/Lab</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>id*</td>
                      <td>Payment processed*</td>
                      <td>10-Jul-2023*</td>
                      <td>Doctor*</td>
                      <td>₹5000*</td>
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

export default Payments