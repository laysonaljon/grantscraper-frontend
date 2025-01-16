import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scholarships from './modules/scholarships';
import ScholarshipDetails from './modules/scholarships/scholarshipDetails';
import { About, Disclaimer, Privacy, Terms } from './modules/miscPages';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Full height of the viewport */}
      <Router>
        <Header />
        <main className="flex-1 flex flex-col"> {/* Flexible main content area */}
          <Routes>
            <Route path="/" element={<Scholarships />} />
            <Route path="/:scholarshipId" element={<ScholarshipDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-of-use" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
