import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scholarships from './modules/scholarships';
import ScholarshipDetails from './modules/scholarships/scholarshipDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scholarships />} />
        <Route path="/:scholarshipId" element={<ScholarshipDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
