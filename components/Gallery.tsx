
import React, { useState, useEffect, useRef } from 'react';

// Mock Data Expansion
const initialGalleryItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d", category: "Wedding", color: "White", caption: "The Royal White. A timeless classic for a grand celebration. 🤍 #weddingcake #classic" },
  { id: 2, image: "https://images.unsplash.com/photo-1626803775151-61d756612fcd", category: "Birthday", color: "Pastel", caption: "Pastel Dream for a sweet 16! 🌸✨ #birthdaycake #pastel" },
  { id: 3, image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63", category: "Anniversary", color: "Gold", caption: "Golden Fifty. Celebrating 50 years of love. 💛 #anniversary #goldenjubilee" },
  { id: 4, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587", category: "Wedding", color: "Rustic", caption: "Rustic vibes with fresh flora. 🌿🌹 #rusticwedding #cakeart" },
  { id: 5, image: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8", category: "Corporate", color: "Dark", caption: "Grand Opening centerpiece. Bold and elegant. 🖤 #corporateevents #klfoodie" },
  { id: 6, image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e", category: "Wedding", color: "White", caption: "Minimalist elegance. Less is more. ✨ #minimalistcake #wedding" },
  { id: 7, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7", category: "Birthday", color: "Dark", caption: "Chocolate Indulgence. Pure rich cocoa goodness. 🍫 #chocoholic #birthday" },
  { id: 8, image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f", category: "Custom", color: "Colorful", caption: "Abstract Art on a cake. Edible masterpiece. 🎨 #cakedesign #art" },
  { id: 9, image: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8", category: "Wedding", color: "Pink", caption: "Floral Cascade. Handcrafted sugar flowers. 🌺 #sugarflowers #weddingcake" },
  { id: 10, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729", category: "Birthday", color: "Pink", caption: "Princess Tiara theme. Fit for royalty. 👑 #princesscake #birthdaygirl" },
  { id: 11, image: "https://images.unsplash.com/photo-1563729768640-481679f32387", category: "Corporate", color: "Colorful", caption: "Summer Vibes party box! ☀️🍓 #summer #fruittart" },
  { id: 12, image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a42", category: "Wedding", color: "White", caption: "Modern Tier. Sleek lines and sharp edges. 🏛️ #moderncake #weddinginspo" },
];

// Duplicate items to simulate infinite scroll data
const allGalleryItems = [...initialGalleryItems, ...initialGalleryItems.map(i => ({...i, id: i.id + 100})), ...initialGalleryItems.map(i => ({...i, id: i.id + 200}))];

const highlights = [
    { id: 'All', name: 'All', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200&auto=format&fit=crop' },
    { id: 'Wedding', name: 'Weddings', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=200&auto=format&fit=crop' },
    { id: 'Birthday', name: 'Birthdays', image: 'https://images.unsplash.com/photo-1626803775151-61d756612fcd?q=80&w=200&auto=format&fit=crop' },
    { id: 'Anniversary', name: 'Anniversary', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?q=80&w=200&auto=format&fit=crop' },
    { id: 'Corporate', name: 'Events', image: 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?q=80&w=200&auto=format&fit=crop' },
    { id: 'Custom', name: 'Custom', image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=200&auto=format&fit=crop' },
];

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="w-full h-full relative bg-gray-100 overflow-hidden">
            {!isLoaded && (
                <div className="absolute inset-0 z-10 bg-gray-200">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </div>
            )}
            <img 
                src={src} 
                alt={alt} 
                className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
        </div>
    );
};

const Gallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const ITEMS_PER_PAGE = 12;

    const getFilteredItems = (filter: string) => {
        return filter === 'All' 
            ? allGalleryItems 
            : allGalleryItems.filter(item => item.category === filter);
    };

    const [displayItems, setDisplayItems] = useState<typeof allGalleryItems>(() => {
        return getFilteredItems('All').slice(0, ITEMS_PER_PAGE);
    });
    
    const [page, setPage] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const activeItem = selectedIndex !== null ? displayItems[selectedIndex] : null;

    const observerTarget = useRef(null);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        
        const filtered = getFilteredItems(activeFilter);
        setDisplayItems(filtered.slice(0, ITEMS_PER_PAGE));
        setPage(1);
        setSelectedIndex(null);
        window.scrollTo(0, 0);
    }, [activeFilter]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    const filtered = getFilteredItems(activeFilter);
                    if (displayItems.length < filtered.length) {
                        setPage(prev => {
                            const newPage = prev + 1;
                            const nextItems = filtered.slice(0, newPage * ITEMS_PER_PAGE);
                            setDisplayItems(nextItems);
                            return newPage;
                        });
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [displayItems.length, activeFilter]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            
            if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            } else if (e.key === 'Escape') {
                setSelectedIndex(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, displayItems.length]);

    const navigate = (direction: number) => {
        if (selectedIndex === null) return;
        const newIndex = selectedIndex + direction;
        
        if (newIndex >= 0 && newIndex < displayItems.length) {
            setSelectedIndex(newIndex);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24 font-sans">
             <div className="max-w-[935px] mx-auto px-5 pt-6 pb-6 border-b border-gray-200">
                <div className="flex gap-8 md:gap-12 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
                    {highlights.map((highlight) => (
                        <button 
                            key={highlight.id} 
                            onClick={() => setActiveFilter(highlight.id)}
                            className="flex flex-col items-center gap-2 flex-shrink-0 group"
                        >
                            <div className={`w-16 h-16 rounded-full p-[2px] ${activeFilter === highlight.id ? 'bg-gradient-to-tr from-bakery-300 to-bakery-500' : 'bg-gray-200 group-hover:bg-gradient-to-tr from-bakery-200 to-bakery-300 transition-all'}`}>
                                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
                                    <img src={highlight.image} alt={highlight.name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <span className={`text-xs font-semibold tracking-tight ${activeFilter === highlight.id ? 'text-bakery-900' : 'text-gray-900'}`}>{highlight.name}</span>
                        </button>
                    ))}
                </div>
             </div>

             <div className="max-w-[935px] mx-auto pt-1">
                 <div className="grid grid-cols-3 gap-1 md:gap-7">
                     {displayItems.map((item, idx) => (
                         <div 
                            key={`${item.id}-${idx}`} 
                            className="aspect-square relative group cursor-pointer bg-gray-100 overflow-hidden"
                            onClick={() => setSelectedIndex(idx)}
                         >
                             <ImageWithSkeleton src={item.image} alt={item.caption} />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                                 <span className="text-white font-bold text-sm uppercase tracking-widest border border-white px-4 py-2">{item.category}</span>
                             </div>
                         </div>
                     ))}
                 </div>
                 <div ref={observerTarget} className="h-10 mt-4"></div>
             </div>

             {activeItem && (
                 <div 
                    className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center animate-fade-in" 
                    onClick={() => setSelectedIndex(null)}
                 >
                     <button className="absolute top-6 right-6 text-white z-50 hover:opacity-70 transition-opacity p-2">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>

                     {selectedIndex !== null && selectedIndex > 0 && (
                        <button 
                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                            aria-label="Previous image"
                        >
                             <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                     )}

                     {selectedIndex !== null && selectedIndex < displayItems.length - 1 && (
                        <button 
                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={(e) => { e.stopPropagation(); navigate(1); }}
                            aria-label="Next image"
                        >
                             <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                        </button>
                     )}
                     
                     <div 
                        className="relative w-full h-full flex items-center justify-center p-4 md:p-8" 
                        onClick={e => e.stopPropagation()}
                     >
                         <img 
                            key={activeItem.id} 
                            src={activeItem.image} 
                            alt="Post" 
                            className="max-h-[90vh] max-w-full object-contain shadow-2xl animate-fade-in" 
                         />
                     </div>
                 </div>
             )}
        </div>
    );
};

export default Gallery;
