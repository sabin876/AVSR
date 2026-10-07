import { useState } from 'react';
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

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedPackageData, setSelectedPackageData] = useState(null);

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

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#e6b980]/30 selection:text-white">
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Cinematic Videography & Photo Shoot Background (Bokeh, Anamorphic flares, Camera Viewfinder HUD) */}
      <CinematicBackground />

      {/* 35mm Film Sprockets Margin Rails */}
      <div className="film-sprockets-left hidden xl:block" />
      <div className="film-sprockets-right hidden xl:block" />

      {/* Custom Lerp Cursor (Desktop) */}
      <CustomCursor />

      {/* Top Scroll Progress Line */}
      <ScrollProgress />

      {/* Fixed Glassmorphic Navigation */}
      <Navbar onBookClick={handleBookFromHeroOrModal} />

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
      <Footer />

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
