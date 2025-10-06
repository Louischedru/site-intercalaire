import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevInterface from './pages/admin/DevInterface';
import Auth from './pages/Auth';
import Home from './pages/Home';

import MainLayout from './pages/layout';
import AdminLayout from './pages/admin/layout';
import CarouselModify from './pages/admin/CarouselModify';
import NosProjets from './pages/NosProjets';
import EditConcours from './pages/admin/EditConcours';
import Captations from './pages/Captations';
import AdminFIlmArticle from './pages/admin/AdminFilmArticle';
import ArticleEditor from './pages/admin/ArticleEditor';
import Projet from './pages/Projet';
import AVenir from './pages/AVenir';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nos-projets" element={<NosProjets />} />
          <Route path="/captations" element={<Captations />} />
          <Route path="/projet" element={<Projet />} />
          <Route path="/a-venir" element={<AVenir />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<AdminLayout />} path="/admin">
          <Route path="/admin/dev" element={<DevInterface />} />
          <Route path="/admin/carousel" element={<CarouselModify />} />
          <Route path="/admin/edit-concours" element={<EditConcours />} />
          <Route path="/admin/film-articles" element={<AdminFIlmArticle />} />
          <Route path="/admin/article-editor" element={<ArticleEditor />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
