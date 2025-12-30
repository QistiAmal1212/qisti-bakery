
import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  onNavigate: (view: 'home' | 'menu' | 'gallery', sectionId?: string) => void;
  currentView: 'home' | 'menu' | 'checkout' | 'gallery' | 'receipt';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Always show solid bg on Menu, Gallery, Checkout page, or on Home page when scrolled
      setIsScrolled(window.scrollY > 50 || currentView === 'menu' || currentView === 'checkout' || currentView === 'gallery');
    };
    
    // Trigger once on mount to set initial state correctly
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled
          ? 'bg-white py-4 shadow-sm'
          : 'bg-transparent border-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 z-50 flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img 
                src="https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/bakerylogo.jpeg" 
                alt="Qisti Bakery Logo" 
                className={`rounded-full object-cover transition-all duration-700 border-2 ${isScrolled || isMobileMenuOpen ? 'w-10 h-10 border-bakery-900/10' : 'w-12 h-12 border-white/20'}`}
            />
            <span className={`text-xl sm:text-2xl font-serif font-bold italic transition-colors duration-700 group-hover:opacity-80 ${isScrolled || isMobileMenuOpen ? 'text-bakery-900' : 'text-white'}`}>
                Qisti Bakery
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-8 md:space-x-12">
            <div className="hidden md:flex items-center space-x-12">
              <button
                  onClick={() => onNavigate('gallery')}
                  className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group font-sans bg-transparent border-none cursor-pointer ${
                    isScrolled 
                      ? 'text-bakery-900 hover:text-bakery-500' 
                      : 'text-white/90 hover:text-white'
                  } ${currentView === 'gallery' ? 'text-bakery-500' : ''}`}
              >
                  Collection
              </button>
              <button
                  onClick={() => onNavigate('home', 'about')}
                  className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group font-sans bg-transparent border-none cursor-pointer ${
                    isScrolled 
                      ? 'text-bakery-900 hover:text-bakery-500' 
                      : 'text-white/90 hover:text-white'
                  }`}
              >
                  About
              </button>
              <button 
                  onClick={() => onNavigate('home', 'booking')}
                  className={`hidden md:block px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                      isScrolled
                      ? 'bg-bakery-900 text-white hover:bg-bakery-600'
                      : 'bg-white text-bakery-900 hover:bg-bakery-100'
                  }`}
              >
                Order
              </button>
            </div>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-bakery-900' : 'text-white'}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-bakery-400 text-bakery-950 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`focus:outline-none transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-bakery-900' : 'text-white'}`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-36 px-6 items-start`}>
          <div className="flex flex-col space-y-8 text-left w-full pl-4">
            <button
                onClick={() => { onNavigate('gallery'); setIsMobileMenuOpen(false); }}
                className="text-4xl font-serif italic text-bakery-900 hover:text-bakery-500 transition-colors text-left"
            >
                Collection
            </button>
            <button
                onClick={() => { onNavigate('home', 'about'); setIsMobileMenuOpen(false); }}
                className="text-4xl font-serif italic text-bakery-900 hover:text-bakery-500 transition-colors text-left"
            >
                About
            </button>
            <button 
                onClick={() => { onNavigate('home', 'booking'); setIsMobileMenuOpen(false); }}
                className="mt-8 px-10 py-4 bg-bakery-900 text-white text-xs font-bold uppercase tracking-widest rounded-full self-start"
            >
                Start Order
            </button>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
