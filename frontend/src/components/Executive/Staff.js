import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Card,
  Table,
  Modal,
  Button,
} from 'react-bootstrap'
import {
  CardBody,
  CardTitle,
} from 'reactstrap'
import axios from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'

// API Endpoint
const ACCOUNT_APPROVAL_URL = 'account-approval'



function Staff({ triggerFetch }) {
  document.title = 'Executive Dashboard || Staff approval'
  const [listOfAccounts, setListOfAccounts] = useState([])
  const [actionModal, setActionModal] = useState(false);
  const [approvalSate, setApprovalState] = useState('')
  const { auth } = useAuth();

  const getAccountForApproval = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(ACCOUNT_APPROVAL_URL, {
        headers: {
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
      const accessToken = auth.accessToken
      console.log('AccessToken from auth: ', auth.accessToken);
      const response = await axios.patch(ACCOUNT_APPROVAL_URL, {
        id: account_id,
        status: status,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
      });
      toast.success(response.data.detail);
      getAccountForApproval();
      console.log('AccessToken: ', accessToken);
    } catch (error) {
      console.log('Error submitting data', error);
      toast.error('Error submitting data');
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    getAccountForApproval();
  }, [triggerFetch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Modal */}
      <Modal 
        show={actionModal} 
        onHide={()=>setActionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Caution</Modal.Title>
        </Modal.Header>
        <Modal.Body>Blocking an active staff will result in cancellation of all upcoming appointments.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setActionModal(false)}>
            Close
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              setActionModal(false);
              accountApprove("False", approvalSate);
            }}
          >
            Block
          </Button>
        </Modal.Footer>
      </Modal>

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
                          <Button 
                            variant='danger' 
                            onClick={() => {
                              setApprovalState(account.id);
                              setActionModal(true);
                            }}
                          >
                          Block
                          </Button>
                          :<Button 
                          variant='success' 
                          onClick={() => accountApprove("True", account.id)}
                          >
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