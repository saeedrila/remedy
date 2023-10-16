import React, { useState, useEffect } from 'react'
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
import axios from '../../api/axios'
import { toast } from 'react-toastify'

//API Endpoint
const ACCOUNT_APPROVAL_URL = 'account-approval'



function Staff() {
  document.title = 'Executive Dashboard || Staff approval'
  const [listOfAccounts, setListOfAccounts] = useState([])

  const getAccountForApproval = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(ACCOUNT_APPROVAL_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setListOfAccounts(response.data);
      console.log('List of accounts', response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const accountApprove = async (status, account_id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.patch(ACCOUNT_APPROVAL_URL, {
        id: account_id,
        status: status,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success(response.data.detail, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      getAccountForApproval();
    } catch (error) {
      console.log('Error submitting data', error);
      toast.error('Error submitting data', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    getAccountForApproval();
  }, []);

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
                    {listOfAccounts.map((account, index) => (
                      <tr key={account.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{account.id}</td>
                        <td>{account.is_doctor ? 'Doctor' : account.is_lab ? 'Lab' : account.is_executive ? 'Executive' : 'Other'}</td>
                        <td>{account.email}</td>
                        <td>{account.is_active ? 'Approved' : 'Not Approved'}</td>
                        <td>
                          {account.is_active ?
                          <Button color='danger' onClick={() => accountApprove("False", account.id)}>
                          Block
                          </Button>
                          :<Button color='success' onClick={() => accountApprove("True", account.id)}>
                          Approve Now
                          </Button>
                          }
                        </td>
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

export default Staff