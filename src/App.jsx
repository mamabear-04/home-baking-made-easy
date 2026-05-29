import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </main>
        <footer className="bg-slate-hearth text-warm-flour py-12 px-4 mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl mb-4 font-serif">The Local Crumb</h2>
            <p className="opacity-70">Hyper-local, artisanal micro-bakery. Small-batch, clean-ingredient baked goods made with care.</p>
            <div className="mt-8 pt-8 border-t border-warm-flour/10 text-sm opacity-50">
              © 2026 The Local Crumb. Home-based micro-bakery.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
