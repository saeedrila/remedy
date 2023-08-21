import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExecutiveLoginPage from './pages/ExecutiveLoginPage';
import DoctorLoginPage from './pages/DoctorLoginPage';
import LabLoginPage from './pages/LabLoginPage';
import PatientLoginPage from './pages/PatientLoginPage';


// Import scss
import "./assets/scss/theme.scss";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/executive-login" element={<ExecutiveLoginPage />} />
          <Route path="/doctor-login" element={<DoctorLoginPage />} />
          <Route path="/lab-login" element={<LabLoginPage />} />
          <Route path="/patient-login" element={<PatientLoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
