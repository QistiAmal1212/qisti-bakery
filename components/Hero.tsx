
import React from 'react';

interface HeroProps {
    onNavigate: (view: 'home' | 'menu' | 'gallery', sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-bakery-900">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/cake2.jpg"
          alt="Wedding and Event Cakes"
          className="w-full h-full object-cover object-center animate-zoom-slow opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bakery-900/60 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Main Heading */}
        <div className="animate-fade-in-up delay-100">
            <span className="block font-sans font-bold uppercase tracking-[0.25em] text-bakery-400 text-xs sm:text-sm mb-6">Weddings & Special Events</span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white mb-10 leading-none">
              Premium <br/> <span className="italic">Custom Cakes</span>
            </h1>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200 mt-4">
          <button
            onClick={() => onNavigate('home', 'booking')}
            className="px-10 py-4 bg-bakery-400 text-bakery-950 text-[11px] font-sans font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors duration-300 min-w-[160px] rounded-sm"
          >
             Order Now
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            className="px-10 py-4 border border-white/40 backdrop-blur-sm text-white text-[11px] font-sans font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-bakery-950 hover:border-white transition-colors duration-300 min-w-[160px] rounded-sm"
          >
             Collection
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700 opacity-60">
        <span className="text-[9px] text-white uppercase tracking-[0.2em] font-sans">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
            <div className="w-full h-1/3 bg-white animate-slide-up"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
