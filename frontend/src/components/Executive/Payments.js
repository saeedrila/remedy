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

function Payments({ triggerFetch }) {
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
      console.log('Payments tab pressed')
    } catch (error){
      console.error('Error fetching data', error)
    }
  }
  useEffect(()=> {
    fetchExecutivePaymentList();
  }, [triggerFetch])


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
                    {executivePaymentList.map((payment, index)=>(
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{payment.appointment}</td>
                      <td>{payment.date}</td>
                      <td>₹{payment.staff_payment}</td>
                      <td>₹{payment.platform_fee}</td>
                      <td>₹{payment.amount}</td>
                    </tr>
                    ))}
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