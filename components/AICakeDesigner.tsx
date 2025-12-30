import React, { useState } from 'react';
import { generateCakeDetails, generateCakeImage } from '../services/geminiService';
import { CakeDesignResult } from '../types';

const SketchIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/10 mb-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const AICakeDesigner: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CakeDesignResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const [details, imageUrl] = await Promise.all([
        generateCakeDetails(prompt),
        generateCakeImage(prompt)
      ]);

      setResult({
        details,
        imageUrl
      });
    } catch (err) {
      console.error(err);
      setError("We couldn't generate your dream cake at the moment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="designer" className="py-24 bg-bakery-950 text-bakery-50 relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Input Form */}
          <div className="sticky top-32">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[1px] bg-bakery-400"></div>
                    <span className="text-bakery-400 font-bold tracking-[0.2em] uppercase text-[9px]">Design Studio</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                    Custom <span className="italic font-light text-bakery-400">Design</span>
                </h2>
                <p className="mt-6 text-bakery-200/60 text-sm font-light leading-relaxed max-w-sm font-serif">
                Design the centerpiece of your celebration. Describe your wedding theme, color palette, or event style, and our AI will craft a custom cake visualization for you.
                </p>
            </div>

            <form onSubmit={handleDesign} className="space-y-8">
              <div className="relative group">
                <label htmlFor="prompt" className="text-[9px] uppercase tracking-widest text-bakery-400 mb-2 block font-bold">Your Vision</label>
                <textarea
                  id="prompt"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 p-4 text-xl font-serif text-white placeholder-white/20 focus:outline-none focus:border-bakery-400 transition-colors resize-none leading-relaxed font-light rounded-sm"
                  placeholder="e.g. 3-tier rustic wedding cake with white roses and gold drip..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`w-full py-4 border border-bakery-400 text-bakery-400 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-bakery-400 hover:text-bakery-950 ${
                  isLoading || !prompt.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isLoading ? 'Designing...' : 'Visualize Order'}
              </button>
            </form>
          </div>

          {/* Right Column: Result Display */}
          <div className="bg-white/[0.03] border border-white/10 p-1 min-h-[500px] rounded-sm backdrop-blur-sm relative">
                {/* Frame decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20"></div>

                <div className="h-full w-full bg-bakery-950/50 p-6 md:p-8 flex flex-col">
                    {/* Empty State */}
                    {!result && !isLoading && !error && (
                        <div className="flex-grow flex flex-col items-center justify-center text-center opacity-40">
                            <SketchIcon />
                            <p className="font-serif text-xl italic text-white font-light">Awaiting Event Details</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="flex-grow flex items-center justify-center text-center text-bakery-400 p-8">
                            <p className="font-serif italic">{error}</p>
                        </div>
                    )}

                    {/* Result State */}
                    {result && !isLoading && (
                    <div className="w-full animate-fade-in flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/10">
                             <div>
                                <span className="block text-[9px] uppercase tracking-widest text-bakery-400 font-bold">Event Ref</span>
                                <span className="font-serif text-white italic">#{Math.floor(Math.random() * 10000)}</span>
                             </div>
                             <div className="text-right">
                                <span className="block text-[9px] uppercase tracking-widest text-bakery-400 font-bold">Date</span>
                                <span className="font-serif text-white italic">{new Date().toLocaleDateString()}</span>
                             </div>
                        </div>

                        {/* Image */}
                        <div className="w-full bg-bakery-900 p-2 shadow-xl mb-6">
                            {result.imageUrl ? (
                                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-800">
                                    <img 
                                        src={result.imageUrl} 
                                        alt="AI Generated Cake" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-[4/3] w-full bg-gray-800 flex items-center justify-center">
                                    <span className="text-gray-500 uppercase tracking-widest text-[9px]">Rendering Failed</span>
                                </div>
                            )}
                        </div>

                        {/* Text Details - Condensed */}
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="text-[9px] uppercase tracking-widest text-bakery-400 font-bold mb-2">Design Notes</h3>
                                <p className="text-bakery-100 font-serif font-light leading-relaxed">
                                    {result.details?.description}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <h4 className="text-[9px] uppercase tracking-widest text-bakery-400 font-bold mb-1">Flavor</h4>
                                    <p className="text-white font-light font-serif">{result.details?.flavorProfile}</p>
                                </div>
                                <div>
                                    <h4 className="text-[9px] uppercase tracking-widest text-bakery-400 font-bold mb-1">Est. Quote</h4>
                                    <p className="text-white font-light font-serif">{result.details?.estimatedPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AICakeDesigner;