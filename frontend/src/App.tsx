import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevInterface from './pages/admin/DevInterface';
import Auth from './pages/Auth';
import Home from './pages/Home';

import MainLayout from './pages/layout';
import AdminLayout from './pages/admin/layout';
import CarouselModify from './pages/admin/CarouselModify';
import NosProjets from './pages/NosProjets';
import EditConcours from './pages/admin/EditConcours';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nos-projets" element={<NosProjets />} />
        </Route>
        <Route element={<AdminLayout />} path="/admin">
          <Route path="/admin/dev" element={<DevInterface />} />
          <Route path="/admin/carousel" element={<CarouselModify />} />
          <Route path="/admin/edit-concours" element={<EditConcours />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
