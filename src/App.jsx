import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import ProjectModal from './components/ProjectModal';
import ServicesPricing from './components/ServicesPricing';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import WhatsAppButton from './components/WhatsAppButton';
import CinematicBackground from './components/CinematicBackground';
import SocialMediaPage from './components/SocialMediaPage';

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedPackageData, setSelectedPackageData] = useState(null);

  const checkIsSocialRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      path === '/social-media' ||
      path === '/social-media/' ||
      path === '/social' ||
      path === '/social/' ||
      hash === '#social-media' ||
      hash === '#social'
    );
  };

  const [isSocialPage, setIsSocialPage] = useState(checkIsSocialRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsSocialPage(checkIsSocialRoute());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const handleOpenSocialPage = () => {
    window.history.pushState({}, '', '/social-media');
    setIsSocialPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    setIsSocialPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (packageData) => {
    setSelectedPackageData(packageData);
  };

  const handleBookFromHeroOrModal = (category) => {
    if (activeProject) {
      setActiveProject(null);
    }
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    const portfolioElem = document.querySelector('#portfolio');
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If viewing Social Media biolink & digital contact card
  if (isSocialPage) {
    return (
      <>
        <CustomCursor />
        <SocialMediaPage onBackToHome={handleBackToHome} />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#e6b980]/30 selection:text-white">
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Cinematic Videography & Photo Shoot Background */}
      <CinematicBackground />

      {/* 35mm Film Sprockets Margin Rails */}
      <div className="film-sprockets-left hidden xl:block" />
      <div className="film-sprockets-right hidden xl:block" />

      {/* Custom Lerp Cursor (Desktop) */}
      <CustomCursor />

      {/* Top Scroll Progress Line */}
      <ScrollProgress />

      {/* Fixed Glassmorphic Navigation */}
      <Navbar
        onBookClick={handleBookFromHeroOrModal}
        onSocialClick={handleOpenSocialPage}
      />

      {/* Main Content */}
      <main>
        {/* Fullscreen Video Hero */}
        <Hero
          onExploreWork={handleExploreWork}
          onBookShoot={handleBookFromHeroOrModal}
        />

        {/* Featured Filterable Masonry / Grid Portfolio */}
        <PortfolioGrid onSelectProject={(project) => setActiveProject(project)} />

        {/* Services & Live Interactive Pricing Packages */}
        <ServicesPricing onSelectPackage={handleSelectPackage} />

        {/* About, Philosophy, The Crew & BTS Gallery */}
        <AboutSection />

        {/* Brand Partners & Client Testimonials */}
        <Testimonials />

        {/* Interactive Multi-Step Guided Booking Form */}
        <ContactForm initialPackageData={selectedPackageData} />
      </main>

      {/* Studio Footer */}
      <Footer onSocialClick={handleOpenSocialPage} />

      {/* Floating Direct WhatsApp Connect */}
      <WhatsAppButton />

      {/* Interactive Project Lightbox Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onBookShoot={handleBookFromHeroOrModal}
        />
      )}
    </div>
  );
}
