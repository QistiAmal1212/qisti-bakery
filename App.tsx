
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMenu from './components/FeaturedMenu';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import ReceiptPage from './components/ReceiptPage';
import TeamSection from './components/TeamSection';
import Gallery from './components/Gallery';
import { CartProvider } from './contexts/CartContext';
import { Order } from './types';

// Update View Type
type ViewType = 'home' | 'menu' | 'checkout' | 'receipt' | 'gallery';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: ViewType, sectionId?: string) => {
    setCurrentView(view);
    if (sectionId && view === 'home') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleCheckoutSuccess = (order: Order) => {
    setLastOrder(order);
    setCurrentView('receipt');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-bakery-400 selection:text-white">
        
        {/* Hide Navbar on Receipt Page for cleaner look, or keep it but minimal. Keeping it for navigation. */}
        {currentView !== 'receipt' && (
           <Navbar 
             onNavigate={(v, s) => handleNavigate(v as ViewType, s)} 
             currentView={currentView} 
           />
        )}
        
        <main className="flex-grow">
          {currentView === 'home' && (
            <>
              <Hero onNavigate={(v) => handleNavigate(v as ViewType)} />
              <FeaturedMenu isHomeView={true} onSeeAll={() => handleNavigate('menu')} />
              <BookingForm />
              <TeamSection />
            </>
          )}

          {currentView === 'menu' && (
            <div className="pt-28">
               <FeaturedMenu isHomeView={false} />
            </div>
          )}
          
          {currentView === 'gallery' && (
            <div className="pt-20">
               <Gallery />
            </div>
          )}

          {currentView === 'checkout' && (
            <CheckoutPage 
              onSuccess={handleCheckoutSuccess} 
              onCancel={() => handleNavigate('menu')} 
            />
          )}

          {currentView === 'receipt' && lastOrder && (
            <ReceiptPage 
              order={lastOrder} 
              onHome={() => handleNavigate('home')} 
            />
          )}
        </main>
        
        {/* Overlays */}
        {currentView !== 'checkout' && currentView !== 'receipt' && (
          <CartDrawer onCheckout={() => setCurrentView('checkout')} />
        )}
        
        <AIChatWidget />

        {/* Floating WhatsApp Button - Show on Home/Menu/Gallery */}
        {(currentView === 'home' || currentView === 'menu' || currentView === 'gallery') && (
            <a 
              href="https://wa.me/60139927122?text=Hi%20Qisti%20Bakery,%20I%20would%20like%20to%20know%20more%20about%20your%20cakes." 
              target="_blank" 
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-40 group flex items-center justify-end"
              aria-label="Contact us on WhatsApp"
            >
              <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-bakery-900 px-4 py-2 rounded-lg shadow-xl border border-bakery-100 text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 hidden sm:block whitespace-nowrap">
                  Chat on WhatsApp
                   <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-t border-r border-bakery-100"></div>
              </span>
              
              <div className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform duration-300 flex items-center justify-center border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
              </div>
            </a>
        )}

        {/* Footer - Only show on main pages or receipt (not checkout to minimize distraction) */}
        {currentView !== 'checkout' && currentView !== 'gallery' && (
          <Footer />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
