import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Button,
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import Header from './Header'
import Footer from './Footer'
import useRefreshToken from '../../hooks/useRefreshToken'



function SiteMap() {
  const navigate = useNavigate();
  const refresh = useRefreshToken();


  const handleClick = () => {
    // window.alert('Clicked');
    toast.success('Clicked');
    toast.error('Clicked');
    toast.info('Clicked');
    toast('Wow so easy!');
  }

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
      {/* Header section */}
      <Header />
      <div className="mt-3">
        <Container>
          <h1>Sitemap</h1>
            <h2>Login</h2>
              <div className="intent">
                <h4 className='hand-cursor' onClick={() => navigate('/executive-login')}>Executive's login</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/doctor-login')}>Doctor's login</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/lab-login')}>Lab's login</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/login')}>Patient's login</h4>
              </div>
            <h2>Signup</h2>
              <div className="intent">
                <h4 className='hand-cursor' onClick={() => navigate('/executive-register')}>Executive's signup</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/doctor-register')}>Doctor's signup</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/lab-register')}>Lab's signup</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/register')}>Patient's signup</h4>
              </div>
            <h2>Patient specific</h2>
              <div className="intent">
                <h4 className='hand-cursor' onClick={() => navigate('/profile-patient')}>Profile</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/dashboard-patient')}>Dashboard</h4>
              </div>
            <h2>Doctor specific</h2>
              <div className="intent">
                <h4 className='hand-cursor' onClick={() => navigate('/profile-doctor')}>Profile</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/dashboard-doctor')}>Dashboard</h4>
              </div>
            <h2>Lab specific</h2>
              <div className="intent">
                <h4 className='hand-cursor' onClick={() => navigate('/profile-lab')}>Profile</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/dashboard-lab')}>Dashboard</h4>
              </div>
            <h2>Executive specific</h2>
              <div className="intent">
                <h4 className='hand-cursor' onClick={() => navigate('/profile-executive')}>Profile</h4>
                <h4 className='hand-cursor' onClick={() => navigate('/dashboard-executive')}>Dashboard</h4>
              </div>
            <Button onClick={handleClick}>Click for toast</Button>
            <br />
            <Button onClick={()=> refresh()}>Refresh Token</Button>
        </Container>
        
      </div>


      {/* Footer section */}
      <Footer />
    </>
  )
}

export default SiteMap