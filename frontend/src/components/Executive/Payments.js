import React, { useState, useEffect } from 'react'
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
import axios from '../../api/axios'

const FETCH_PAYMENTS = '/fetch-executive-payments'

function Payments() {
  const [executivePaymentList, setExecutivePaymentList] = useState([])

  // Fetch payments list
  const fetchExecutivePaymentList = async ()=>{
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(FETCH_PAYMENTS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setExecutivePaymentList(response.data)
    } catch (error){
      console.error('Error fetching data', error)
    }
  }
  useEffect(()=> {
    fetchExecutivePaymentList();
  }, [])


  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h2">Payment </CardTitle>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Appointment ID</th>
                      <th>Date</th>
                      <th>Staff Payment</th>
                      <th>Platform fee</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>id*</td>
                      <td>Payment processed*</td>
                      <td>10-Jul-2023*</td>
                      <td>1-Jul-2023 to 10-Jul-2023*</td>
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