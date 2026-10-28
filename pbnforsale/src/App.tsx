import Header from './sections/Header';
import Footer from './sections/Footer';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './lib/ScrollToTop';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import PageSpeedChecker from './pages/PageSpeedChecker';
import Chatbot from './components/Chatbot';
import SEOHead from './components/SEOHead';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-dark-900">
          <SEOHead />
          <Header />
          <ScrollToTop />
          <main>
            <Routes>
              {/* Global / English Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/tools/pagespeed-checker" element={<PageSpeedChecker />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

              {/* Dedicated Indonesian Regional Routes (Targeting Google Indonesia / google.co.id) */}
              <Route path="/id" element={<Home />} />
              <Route path="/id/portfolio" element={<Portfolio />} />
              <Route path="/id/blog" element={<BlogList />} />
              <Route path="/id/blog/:slug" element={<BlogPost />} />
              <Route path="/id/tools/pagespeed-checker" element={<PageSpeedChecker />} />
              <Route path="/id/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/id/terms-and-conditions" element={<TermsAndConditions />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
