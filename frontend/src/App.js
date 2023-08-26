import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExecutiveLoginPage from './pages/Authentication/ExecutiveLoginPage';
import DoctorLoginPage from './pages/Authentication/DoctorLoginPage';
import LabLoginPage from './pages/Authentication/LabLoginPage';
import PatientLoginPage from './pages/Authentication/PatientLoginPage';


// Import scss
import "./assets/scss/theme.scss";
import ExecutiveRegisterPage from './pages/Authentication/ExecutiveRegisterPage';
import DoctorRegisterPage from './pages/Authentication/DoctorRegisterPage';
import LabRegisterPage from './pages/Authentication/LabRegisterPage';
import PatientRegisterPage from './pages/Authentication/PatientRegisterPage';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Logins */}
          <Route path="/executive-login" element={<ExecutiveLoginPage />} />
          <Route path="/doctor-login" element={<DoctorLoginPage />} />
          <Route path="/lab-login" element={<LabLoginPage />} />
          <Route path="/" element={<PatientLoginPage />} />

          <Route path='/executive-register' element={<ExecutiveRegisterPage />} />
          <Route path='/doctor-register' element={<DoctorRegisterPage />} />
          <Route path='/lab-register' element={<LabRegisterPage />} />
          <Route path='/register' element={<PatientRegisterPage />} />

          <Route path='' element />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
