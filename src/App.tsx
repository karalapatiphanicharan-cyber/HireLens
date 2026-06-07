import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UploadResume from './pages/UploadResume';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadResume />} />
      </Routes>
    </Router>
  );
}

export default App;
