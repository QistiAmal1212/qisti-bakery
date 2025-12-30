import React, { useState } from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-bakery-900 text-bakery-100 py-16 font-sans">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        
        {/* Logo Section - Alone on its row, Centered */}
        <div className="flex flex-col items-center gap-4 mb-12 border-b border-white/10 pb-12">
            <div className="flex items-center gap-3">
                <img 
                    src="https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/bakerylogo.jpeg" 
                    alt="Qisti Bakery Logo" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-bakery-400/20"
                />
                <span className="text-2xl font-serif font-medium text-white tracking-wide italic">
                    Qisti Bakery
                </span>
            </div>
            <p className="text-bakery-400/60 text-[10px] uppercase tracking-[0.3em]">est. 2024 • Kuala Lumpur</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          
          {/* Column 1: Brand Description */}
          <div className="space-y-6">
            <p className="text-xs text-bakery-300 leading-relaxed font-light max-w-xs">
              Crafting bespoke wedding and event cakes in the heart of Kuala Lumpur. Where artistry meets exceptional flavor.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="text-right">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bakery-400 mb-6">Contact</h3>
            <div className="space-y-4 text-xs font-light text-bakery-300">
              <p>
                123 Jalan Ampang<br/>
                50450 Kuala Lumpur<br/>
                Malaysia
              </p>
              <p>
                <a href="tel:+60139927122" className="hover:text-white transition-colors">+60 13-992 7122</a><br/>
                <a href="mailto:hello@qistibakery.com" className="hover:text-white transition-colors">hello@qistibakery.com</a>
              </p>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="text-[10px] text-bakery-500 uppercase tracking-widest text-center">
                &copy; {new Date().getFullYear()} Qisti Bakery. All rights reserved.
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;