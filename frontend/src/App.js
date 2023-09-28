import './App.css';
import { Routes, Route } from "react-router-dom";
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import "./assets/scss/theme.scss";

import ExecutiveLoginPage from './pages/Authentication/ExecutiveLoginPage';
import DoctorLoginPage from './pages/Authentication/DoctorLoginPage';
import LabLoginPage from './pages/Authentication/LabLoginPage';
import PatientLoginPage from './pages/Authentication/PatientLoginPage';
import ProfileDoctor from './pages/Profile/ProfileDoctor';

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

//Dashboards
import DashboardDoctor from './pages/Dashboard/DashboardDoctor';
import DashboardLab from './pages/Dashboard/DashboardLab';
import DashboardPatient from './pages/Dashboard/DashboardPatient';
import DashboardExecutive from './pages/Dashboard/DashboardExecutive';

//Error 404
import Error404 from './pages/Error404';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public pages */}
          {/* Logins */}
          <Route path="/executive-login" element={<ExecutiveLoginPage />} />
          <Route path="/doctor-login" element={<DoctorLoginPage />} />
          <Route path="/lab-login" element={<LabLoginPage />} />
          <Route path="/login" element={<PatientLoginPage />} />

          {/* Account registration */}
          <Route path='/executive-register' element={<ExecutiveRegisterPage />} />
          <Route path='/doctor-register' element={<DoctorRegisterPage />} />
          <Route path='/lab-register' element={<LabRegisterPage />} />
          <Route path='/register' element={<PatientRegisterPage />} />

          {/* Landing page */}
          <Route path='/' element={<Home />} />

          {/* Patient specific pages */}
          {/* Appointment selection */}
          <Route element={<RequireAuth />}>
            <Route path='doctor-specialties' element={<DoctorSpecialties/>} />
            <Route path='doctor-specialties/:specialtyId' element={<SelectDoctor/>} />
            <Route path='doctor-specialties/1/select-doctor/doctor-appointment-confirmation' element={<DoctorAppointmentConfirmation/>} />
            <Route path='doctor-specialties/1/select-doctor/doctor-appointment-confirmation/payment-confirmation' element={<DoctorAppointmentPaymentConfirmation/>} />
            {/* Dashboard */}
            <Route path='dashboard-patient' element={<DashboardPatient/>} />
          </Route>

          {/* Profile section */}
          <Route path='profile-doctor' element={<ProfileDoctor/>} />

          {/* Dashboard section */}
          <Route path='dashboard-doctor' element={<DashboardDoctor/>} />
          <Route path='dashboard-lab' element={<DashboardLab/>} />
          
          <Route path='dashboard-executive' element={<DashboardExecutive/>} />

          <Route path='lab-tests' element={<LabTests/>} />

          {/* Error 404 */}
          <Route path='*' element={<Error404/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
