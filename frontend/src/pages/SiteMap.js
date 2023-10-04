import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
} from 'react-bootstrap'
import { toast } from 'react-toastify'

import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'



function SiteMap() {
  const navigate = useNavigate()
  const handleClick = () => {
    // window.alert('Clicked');
    toast.success('Clicked', {
      position: 'top-right',
      autoClose: 3000, // Display for 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
    toast('Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <>
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
            <button onClick={handleClick}>Click</button>
        </Container>
        
      </div>


      {/* Footer section */}
      <Footer />
    </>
  )
}

export default SiteMap