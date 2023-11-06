import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import "./assets/scss/theme.scss";
import useAuth from './hooks/useAuth';

// Login page
import Login from './components/Authentication/Login';

// Profile Page
import Profile from '../src/components/Common/Profile'

// Registration Pages
import ExecutiveRegisterPage from './pages/Authentication/ExecutiveRegisterPage';
import DoctorRegisterPage from './pages/Authentication/DoctorRegisterPage';
import LabRegisterPage from './pages/Authentication/LabRegisterPage';
import PatientRegisterPage from './pages/Authentication/PatientRegisterPage';

import Home from './pages/Landing/Home';
import DoctorSpecialties from './components/DoctorSpecialties';
import SelectDoctor from './components/SelectDoctor';

import LabTests from './components/LabTests';
import DoctorAppointmentConfirmation from './pages/DoctorAppointmentConfirmation';
import DoctorAppointmentPaymentConfirmation from './pages/DoctorAppointmentPaymentConfirmation';

// Dashboards
import DashboardDoctor from './pages/Dashboard/DashboardDoctor';
import DashboardLab from './pages/Dashboard/DashboardLab';
import DashboardPatient from './pages/Dashboard/DashboardPatient';
import DashboardExecutive from './pages/Dashboard/DashboardExecutive';

// Error 404,401
import Error404 from './pages/Error404';
import Error401 from './pages/Error401';

//Chat
import Chat from '../src/components/Common/Chat'

// Sitemap
import SiteMap from './pages/SiteMap';


function App() {
  const { setAuth } = useAuth();
  useEffect(() => {
    try{
      // This has to be changed before Production
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const email = localStorage.getItem('email');
      const rolesJSON = localStorage.getItem('roles');
      const username = localStorage.getItem('username');

      if (accessToken && refreshToken && email && rolesJSON) {
        const roles = JSON.parse(rolesJSON);
        setAuth({
          accessToken: accessToken,
          refreshToken: refreshToken,
          email: email,
          roles: roles,
          username: username,
        });
      }
    } catch (error){
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public pages */}
          {/* Login */}
          <Route path="login" element={<Login />} />

          {/* Account registration */}
          <Route path='executive-register' element={<ExecutiveRegisterPage />} />
          <Route path='doctor-register' element={<DoctorRegisterPage />} />
          <Route path='lab-register' element={<LabRegisterPage />} />
          <Route path='register' element={<PatientRegisterPage />} />

          {/* Landing page */}
          <Route path='/' element={<Home />} />

          {/* Profile Page */}
          <Route element={<RequireAuth allowedRoles={['is_patient', 'is_doctor', 'is_lab', 'is_executive']}/>}>
            <Route path='profile' element={<Profile/>} />
          </Route>
          
          <Route path='chat' element={<Chat/>} />

          {/* Patient specific pages */}
          <Route element={<RequireAuth allowedRoles={['is_patient']}/>}>
            <Route path='dashboard-patient' element={<DashboardPatient/>} />
            <Route path='doctor-at-specialization' element={<DoctorSpecialties/>} />
             
            <Route path='doctor-at-specialization/:specialization_title' element={<SelectDoctor/>} />
            <Route path='doctor-at-specialization/doctor-appointment-confirmation' element={<DoctorAppointmentConfirmation/>} />
            <Route path='payment-confirmation/' element={<DoctorAppointmentPaymentConfirmation/>} />
          </Route>

          {/* Doctor specific pages */}
          <Route element={<RequireAuth allowedRoles={['is_doctor']}/>}>
            <Route path='dashboard-doctor' element={<DashboardDoctor/>} />
          </Route>
          
          {/* Lab specific pages */}
          <Route element={<RequireAuth allowedRoles={['is_lab']}/>}>
            <Route path='dashboard-lab' element={<DashboardLab/>} />
          </Route>

          {/* Executive specific pages */}
          <Route element={<RequireAuth allowedRoles={['is_executive']}/>}>
            <Route path='dashboard-executive' element={<DashboardExecutive/>} />
          </Route>


          <Route path='lab-tests' element={<LabTests/>} />

          {/* Error 404,401 */}
          <Route path='*' element={<Error404/>} />
          <Route path='unauthorized' element={<Error401/>} />

          {/* Sitemap */}
          <Route path='sitemap' element={<SiteMap />} />

          {/* used while testing*/}
          
          <Route path='doctor-specialties/1/select-doctor/doctor-appointment-confirmation' element={<DoctorAppointmentConfirmation/>} />
          <Route path='doctor-specialties/1/select-doctor/doctor-appointment-confirmation/payment-confirmation' element={<DoctorAppointmentPaymentConfirmation/>} />


        </Route>
      </Routes>
    </>
  );
}

export default App;