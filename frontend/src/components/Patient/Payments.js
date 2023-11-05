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

const FETCH_PAYMENTS = '/fetch-patient-payments'

function Payments({ triggerFetch }) {
  const [patientPaymentList, setPatientPaymentList] = useState([])
  // Fetch payments list
  const fetchPatientPaymentList = async ()=>{
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(FETCH_PAYMENTS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPatientPaymentList(response.data)
    } catch (error){
      console.error('Error fetching data', error)
    }
  }
  useEffect(()=> {
    fetchPatientPaymentList();
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
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientPaymentList.map((payment, index)=>(
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{payment.appointment}</td>
                      <td>{payment.date}</td>
                      <td>₹{payment.amount}</td>
                      <td>{payment.status === 'Refused' ? 'Refunded' : payment.status}</td>
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