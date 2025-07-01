import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevInterface from './pages/DevInterface';
import Auth from './pages/Auth';
import Home from './pages/Home';

import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dev" element={<DevInterface />} />
      </Routes>
    </Router>
  );
}

export default App;
