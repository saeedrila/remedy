import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExecutiveLogin from "./components/Authentication/ExecutiveLogin";

// Import scss
import "./assets/scss/theme.scss";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ExecutiveLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
