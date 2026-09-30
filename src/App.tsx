import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Home from './pages/home';
import About from './pages/About';
import ExperiencePage from './pages/ExperiencePage';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

// Start each newly opened page at the top; leave back/forward to the browser.
function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="text-ink mx-auto flex min-h-screen max-w-[90%] flex-col md:max-w-[80%]">
      <ScrollToTop />
      <Header onToggleSidebar={() => setSidebarOpen((o) => !o)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 px-0 py-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <Layout />;
}
